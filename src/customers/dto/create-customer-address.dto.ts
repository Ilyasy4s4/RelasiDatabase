import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsNotEmpty({ message: 'Nama penerima harus diisi' })
  @IsString({ message: 'Nama penerima harus berupa teks' })
  @MaxLength(150, { message: 'Nama penerima maksimal 150 karakter' })
  readonly recipientName: string;

  @IsNotEmpty({ message: 'Nomor telepon harus diisi' })
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @MaxLength(20, { message: 'Nomor telepon maksimal 20 karakter' })
  readonly phone: string;

  @IsNotEmpty({ message: 'Alamat harus diisi' })
  @IsString({ message: 'Alamat harus berupa teks' })
  readonly address: string;

  @IsNotEmpty({ message: 'Kota harus diisi' })
  @IsString({ message: 'Kota harus berupa teks' })
  @MaxLength(100, { message: 'Kota maksimal 100 karakter' })
  readonly city: string;

  @IsNotEmpty({ message: 'Kode pos harus diisi' })
  @IsString({ message: 'Kode pos harus berupa teks' })
  @MaxLength(10, { message: 'Kode pos maksimal 10 karakter' })
  readonly postalCode: string;
}
