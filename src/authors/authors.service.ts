import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { definedOnly } from '../common/utils/defined-only.js';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Author> {
    const item = await this.repository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Penulis dengan id ${id} tidak ditemukan`);
    }

    return item;
  }

  async create(dto: CreateAuthorDto): Promise<Author> {
    const item = this.repository.create(dto);
    return this.repository.save(item);
  }

  async update(id: string, dto: UpdateAuthorDto): Promise<Author> {
    const item = await this.findOne(id);

    Object.assign(item, definedOnly(dto));
    return this.repository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}
