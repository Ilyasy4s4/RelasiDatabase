import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token harus diisi' })
  @IsString({ message: 'Token harus berupa teks' })
  token: string;

  @IsNotEmpty({ message: 'Password baru harus diisi' })
  @IsString({ message: 'Password baru harus berupa teks' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  newPassword: string;
}
