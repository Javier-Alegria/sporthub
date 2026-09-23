import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/\S/, {
    message: 'El nombre no puede estar vacío',
  })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\S/, {
    message: 'Los apellidos no pueden estar vacíos',
  })
  apellidos: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S+$/, {
    message:
      'La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un carácter especial y no puede contener espacios',
  })
  password: string;
}