import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity.js';
import { OrderItem } from './order-item.entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';
import { Shipment } from '../../shipments/entities/shipment.entity.js';
import { decimalTransformer } from '../../common/transformers/decimal.transformer.js';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Satu pelanggan dapat memiliki banyak pesanan
  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Relation<Customer>;

  @Column({ name: 'order_number', type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: OrderStatus;

  // Snapshot nilai transaksi
  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: decimalTransformer,
  })
  totalAmount: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  // Rancangan sederhana: satu pesanan satu pembayaran
  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Relation<Payment> | null;

  // Rancangan sederhana: satu pesanan satu pengiriman
  @OneToOne(() => Shipment, (shipment) => shipment.order)
  shipment: Relation<Shipment> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
