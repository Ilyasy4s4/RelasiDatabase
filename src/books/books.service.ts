import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { definedOnly } from '../common/utils/defined-only.js';
import { Book } from './entites/book-entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';
import { Author } from '../authors/entities/author.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';

// Relasi yang ikut ditampilkan di setiap response buku
const BOOK_RELATIONS = {
  category: true,
  publisher: true,
  authors: true,
} as const;

@Injectable()
export class BooksService {
  // Constructor untuk mengakses repository
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // Menampilkan semua buku
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: BOOK_RELATIONS,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Menyimpan buku baru
  async simpanData(createBookDto: CreateBookDto): Promise<Book> {
    const { categoryId, publisherId, authorIds, ...fields } = createBookDto;
    void categoryId;
    void publisherId;
    void authorIds;

    await this.ensureIsbnAvailable(fields.isbn);
    const relations = await this.resolveRelations(createBookDto);

    const newBook = this.bookRepository.create({
      ...fields,
      isAvailable: fields.isAvailable ?? true,
      ...relations,
    });

    const saved = await this.bookRepository.save(newBook);
    return this.findOne(saved.id);
  }

  // Menampilkan buku berdasarkan ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: BOOK_RELATIONS,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // Memperbarui data buku (boleh sebagian field saja)
  async updateData(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    const { categoryId, publisherId, authorIds, ...fields } = updateBookDto;
    void categoryId;
    void publisherId;
    void authorIds;

    if (fields.isbn && fields.isbn !== book.isbn) {
      await this.ensureIsbnAvailable(fields.isbn);
    }

    const relations = await this.resolveRelations(updateBookDto);

    Object.assign(book, definedOnly(fields), relations);
    await this.bookRepository.save(book);

    return this.findOne(id);
  }

  // Menghapus buku dengan soft delete
  async remove(
    id: string,
  ): Promise<{ message: string; deletedId: string }> {
    const book = await this.findOne(id);

    await this.bookRepository.softDelete(book.id);

    return {
      message: `Data buku dengan ID ${id} berhasil dihapus`,
      deletedId: book.id,
    };
  }

  // ISBN harus unik (termasuk buku yang sudah di-soft delete)
  private async ensureIsbnAvailable(isbn: string): Promise<void> {
    const exists = await this.bookRepository.exists({
      where: { isbn },
      withDeleted: true,
    });

    if (exists) {
      throw new ConflictException('ISBN sudah terdaftar');
    }
  }

  // Mengubah categoryId / publisherId / authorIds menjadi data relasinya.
  // Hanya field yang dikirim yang diproses.
  private async resolveRelations(dto: {
    categoryId?: string | null;
    publisherId?: string | null;
    authorIds?: string[];
  }): Promise<{
    category?: Category | null;
    publisher?: Publisher | null;
    authors?: Author[];
  }> {
    const result: {
      category?: Category | null;
      publisher?: Publisher | null;
      authors?: Author[];
    } = {};

    if (dto.categoryId === null) {
      result.category = null;
    } else if (dto.categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({
        id: dto.categoryId,
      });
      if (!category) {
        throw new NotFoundException(
          `Kategori dengan id ${dto.categoryId} tidak ditemukan`,
        );
      }
      result.category = category;
    }

    if (dto.publisherId === null) {
      result.publisher = null;
    } else if (dto.publisherId !== undefined) {
      const publisher = await this.publisherRepository.findOneBy({
        id: dto.publisherId,
      });
      if (!publisher) {
        throw new NotFoundException(
          `Penerbit dengan id ${dto.publisherId} tidak ditemukan`,
        );
      }
      result.publisher = publisher;
    }

    if (dto.authorIds !== undefined) {
      const authors = dto.authorIds.length
        ? await this.authorRepository.findBy({ id: In(dto.authorIds) })
        : [];
      if (authors.length !== dto.authorIds.length) {
        throw new NotFoundException('Sebagian penulis tidak ditemukan');
      }
      result.authors = authors;
    }

    return result;
  }
}
