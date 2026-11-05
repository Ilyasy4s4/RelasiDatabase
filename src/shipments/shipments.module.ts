import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shipment } from './entities/shipment.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  exports: [TypeOrmModule],
})
export class ShipmentsModule {}
