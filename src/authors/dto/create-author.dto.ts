import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Nama harus diisi' })
  @IsString({ message: 'Nama harus berupa teks' })
  @MaxLength(150, { message: 'Nama maksimal 150 karakter' })
  readonly name: string;
}
