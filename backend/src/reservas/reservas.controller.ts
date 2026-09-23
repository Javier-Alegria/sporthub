import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(
    private readonly reservasService: ReservasService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  crearReserva(
    @Body() reservaDto: CreateReservaDto,
    @Req() request: any,
  ) {
    return this.reservasService.crearReserva(
      reservaDto,
      request.user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  obtenerReservas(@Req() request: any) {
    return this.reservasService.obtenerReservas(
      request.user.id,
      request.user.rol,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  cancelarReserva(
    @Param('id') id: string,
    @Req() request: any,
  ) {
    return this.reservasService.cancelarReserva(
      Number(id),
      request.user.id,
      request.user.rol,
    );
  }
}