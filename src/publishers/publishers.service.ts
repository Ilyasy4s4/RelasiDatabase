import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { definedOnly } from '../common/utils/defined-only.js';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly repository: Repository<Publisher>,
  ) {}

  async findAll(): Promise<Publisher[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Publisher> {
    const item = await this.repository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Penerbit dengan id ${id} tidak ditemukan`);
    }

    return item;
  }

  async create(dto: CreatePublisherDto): Promise<Publisher> {
    const item = this.repository.create(dto);
    return this.repository.save(item);
  }

  async update(id: string, dto: UpdatePublisherDto): Promise<Publisher> {
    const item = await this.findOne(id);

    Object.assign(item, definedOnly(dto));
    return this.repository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}
