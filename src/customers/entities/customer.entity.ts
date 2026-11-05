import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { CustomerAddress } from './customer-address.entity.js';
import { Order } from '../../orders/entities/order.entity.js';

// Customer = pengguna aplikasi (pengganti entity User sebelumnya)
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  // Email harus unik
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  // Untuk login. Tidak ada di PDF, nullable dan tidak ikut terbaca
  // saat query (select: false) supaya tidak bocor di response.
  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  password: string | null;

  // Satu pelanggan dapat menyimpan beberapa alamat
  @OneToMany(() => CustomerAddress, (address) => address.customer)
  addresses: CustomerAddress[];

  // Satu pelanggan dapat memiliki banyak pesanan
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
