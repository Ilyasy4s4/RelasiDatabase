import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { definedOnly } from '../common/utils/defined-only.js';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { CustomersService } from './customers.service.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
    private readonly customersService: CustomersService,
  ) {}

  async findAll(customerId: string): Promise<CustomerAddress[]> {
    // Pastikan pelanggannya ada
    await this.customersService.findOne(customerId);

    return this.addressRepository.find({
      where: { customer: { id: customerId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(customerId: string, id: string): Promise<CustomerAddress> {
    const address = await this.addressRepository.findOne({
      where: { id, customer: { id: customerId } },
    });

    if (!address) {
      throw new NotFoundException(`Alamat dengan id ${id} tidak ditemukan`);
    }

    return address;
  }

  async create(
    customerId: string,
    dto: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const customer = await this.customersService.findOne(customerId);

    const address = this.addressRepository.create({ ...dto, customer });
    const saved = await this.addressRepository.save(address);

    // Jangan kirim balik seluruh data pelanggan di response
    const { customer: _customer, ...result } = saved;
    return result as CustomerAddress;
  }

  async update(
    customerId: string,
    id: string,
    dto: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const address = await this.findOne(customerId, id);

    Object.assign(address, definedOnly(dto));
    return this.addressRepository.save(address);
  }

  async remove(customerId: string, id: string): Promise<void> {
    const address = await this.findOne(customerId, id);
    await this.addressRepository.remove(address);
  }
}
