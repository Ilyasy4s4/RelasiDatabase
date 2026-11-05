import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

// Semua field opsional, jadi boleh mengubah sebagian data saja
export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title tidak boleh kosong' })
  @IsString({ message: 'Title harus berupa teks' })
  @MaxLength(30, { message: 'Title maksimal 30 karakter' })
  readonly title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'ISBN tidak boleh kosong' })
  @IsString({ message: 'ISBN harus berupa teks' })
  @MaxLength(45, { message: 'ISBN maksimal 45 karakter' })
  readonly isbn?: string;

  @IsOptional()
  @IsInt({ message: 'Tahun terbit harus berupa angka bulat' })
  @Min(0, { message: 'Tahun terbit tidak boleh negatif' })
  readonly publishedYear?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Harga harus berupa angka (maks. 2 desimal)' })
  @Min(0, { message: 'Harga tidak boleh negatif' })
  readonly price?: number;

  @IsOptional()
  @IsInt({ message: 'Stok harus berupa angka bulat' })
  @Min(0, { message: 'Stok tidak boleh negatif' })
  readonly stock?: number;

  @IsOptional()
  @IsBoolean({
    message: 'Status ketersediaan harus berupa boolean',
  })
  readonly isAvailable?: boolean;

  // Kirim null untuk melepas kategori / penerbit
  @IsOptional()
  @IsUUID('4', { message: 'categoryId harus berupa UUID' })
  readonly categoryId?: string | null;

  @IsOptional()
  @IsUUID('4', { message: 'publisherId harus berupa UUID' })
  readonly publisherId?: string | null;

  // Mengganti seluruh daftar penulis buku ini
  @IsOptional()
  @IsArray({ message: 'authorIds harus berupa array' })
  @ArrayUnique({ message: 'authorIds tidak boleh ada yang sama' })
  @IsUUID('4', { each: true, message: 'Setiap authorIds harus berupa UUID' })
  readonly authorIds?: string[];
}
