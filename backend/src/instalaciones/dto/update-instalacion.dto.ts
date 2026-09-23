import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateInstalacionDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  descripcion?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  precioHora?: number;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}