import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CustomerAddressesService } from './customer-addresses.service.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Controller('customers/:customerId/addresses')
export class CustomerAddressesController {
  constructor(private readonly addressesService: CustomerAddressesService) {}

  @Get()
  findAll(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.addressesService.findAll(customerId);
  }

  @Get(':id')
  findOne(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.addressesService.findOne(customerId, id);
  }

  @Post()
  create(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Body() dto: CreateCustomerAddressDto,
  ) {
    return this.addressesService.create(customerId, dto);
  }

  @Put(':id')
  update(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCustomerAddressDto,
  ) {
    return this.addressesService.update(customerId, id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.addressesService.remove(customerId, id);
    return null;
  }
}
