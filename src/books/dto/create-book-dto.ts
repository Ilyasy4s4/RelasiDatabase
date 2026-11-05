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

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title harus diisi' })
  @IsString({ message: 'Title harus berupa teks' })
  @MaxLength(30, { message: 'Title maksimal 30 karakter' })
  readonly title: string;

  @IsNotEmpty({ message: 'ISBN harus diisi' })
  @IsString({ message: 'ISBN harus berupa teks' })
  @MaxLength(45, { message: 'ISBN maksimal 45 karakter' })
  readonly isbn: string;

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

  @IsOptional()
  @IsUUID('4', { message: 'categoryId harus berupa UUID' })
  readonly categoryId?: string | null;

  @IsOptional()
  @IsUUID('4', { message: 'publisherId harus berupa UUID' })
  readonly publisherId?: string | null;

  // Daftar id penulis (relasi many-to-many lewat tabel book_authors)
  @IsOptional()
  @IsArray({ message: 'authorIds harus berupa array' })
  @ArrayUnique({ message: 'authorIds tidak boleh ada yang sama' })
  @IsUUID('4', { each: true, message: 'Setiap authorIds harus berupa UUID' })
  readonly authorIds?: string[];
}
