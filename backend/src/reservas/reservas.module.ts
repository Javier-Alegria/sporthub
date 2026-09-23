import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Reserva } from './entities/reserva.entity';

import { Instalacion } from '../instalaciones/entities/instalacion.entity';

import { ReservasController } from './reservas.controller';

import { ReservasService } from './reservas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Instalacion])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}