import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Matches,
  Min,
} from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  instalacionId: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'La hora de inicio debe tener formato HH:mm o HH:mm:ss',
  })
  horaInicio: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, {
    message: 'La hora de fin debe tener formato HH:mm o HH:mm:ss',
  })
  horaFin: string;
}