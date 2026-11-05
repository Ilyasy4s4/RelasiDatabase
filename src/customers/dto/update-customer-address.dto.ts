import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCustomerAddressDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  @IsString({ message: 'Nama penerima harus berupa teks' })
  @MaxLength(150, { message: 'Nama penerima maksimal 150 karakter' })
  readonly recipientName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @MaxLength(20, { message: 'Nomor telepon maksimal 20 karakter' })
  readonly phone?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  @IsString({ message: 'Alamat harus berupa teks' })
  readonly address?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  @IsString({ message: 'Kota harus berupa teks' })
  @MaxLength(100, { message: 'Kota maksimal 100 karakter' })
  readonly city?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  @IsString({ message: 'Kode pos harus berupa teks' })
  @MaxLength(10, { message: 'Kode pos maksimal 10 karakter' })
  readonly postalCode?: string;
}
