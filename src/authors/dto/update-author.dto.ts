import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus berupa teks' })
  @MaxLength(150, { message: 'Nama maksimal 150 karakter' })
  readonly name?: string;
}
