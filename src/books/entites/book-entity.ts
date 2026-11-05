import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
  type Relation,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity.js';
import { Publisher } from '../../publishers/entities/publisher.entity.js';
import { Author } from '../../authors/entities/author.entity.js';
import { OrderItem } from '../../orders/entities/order-item.entity.js';
import { decimalTransformer } from '../../common/transformers/decimal.transformer.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  // ISBN tidak boleh sama
  @Column({ type: 'varchar', length: 45, unique: true })
  isbn: string;

  @Column({ type: 'int', default: 0 })
  publishedYear: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  // DECIMAL (bukan FLOAT) agar harga tidak kena masalah presisi
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: decimalTransformer,
  })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  // Satu buku memiliki satu kategori utama
  @ManyToOne(() => Category, (category) => category.books, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category> | null;

  // Satu penerbit dapat menerbitkan banyak buku
  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Relation<Publisher> | null;

  // Many-to-many: tabel penghubung book_authors (book_id, author_id)
  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'book_authors',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'author_id', referencedColumnName: 'id' },
  })
  authors: Author[];

  @OneToMany(() => OrderItem, (item) => item.book)
  orderItems: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
