import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateInstalacionDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precioHora?: number;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}