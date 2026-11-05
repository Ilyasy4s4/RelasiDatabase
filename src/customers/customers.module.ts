import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity.js';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { CustomersController } from './customers.controller.js';
import { CustomersService } from './customers.service.js';
import { CustomerAddressesController } from './customer-addresses.controller.js';
import { CustomerAddressesService } from './customer-addresses.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerAddress])],
  controllers: [CustomersController, CustomerAddressesController],
  providers: [CustomersService, CustomerAddressesService],
  exports: [CustomersService],
})
export class CustomersModule {}
