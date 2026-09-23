import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInstalacionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  tipo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  ubicacion: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  precioHora: number;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}