import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Instalacion } from '../instalaciones/entities/instalacion.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepository: Repository<Reserva>,

    @InjectRepository(Instalacion)
    private readonly instalacionesRepository: Repository<Instalacion>,
  ) {}

  async crearReserva(
    reservaDto: CreateReservaDto,
    usuarioId: number,
  ): Promise<Reserva> {
    const instalacion = await this.instalacionesRepository.findOne({
      where: {
        id: reservaDto.instalacionId,
      },
    });

    if (!instalacion) {
      throw new NotFoundException('La instalación no existe');
    }

    if (!instalacion.activa) {
      throw new ConflictException(
        'La instalación no está disponible para reservas',
      );
    }

    if (reservaDto.horaInicio >= reservaDto.horaFin) {
      throw new ConflictException(
        'La hora de inicio debe ser anterior a la hora de fin',
      );
    }

    const reservaExistente = await this.reservasRepository
      .createQueryBuilder('reserva')
      .where('reserva.instalacionId = :instalacionId', {
        instalacionId: reservaDto.instalacionId,
      })
      .andWhere('reserva.fecha = :fecha', {
        fecha: reservaDto.fecha,
      })
      .andWhere('reserva.estado = :estado', {
        estado: 'ACTIVA',
      })
      .andWhere(
        'reserva.horaInicio < :horaFin AND reserva.horaFin > :horaInicio',
        {
          horaInicio: reservaDto.horaInicio,
          horaFin: reservaDto.horaFin,
        },
      )
      .getOne();

    if (reservaExistente) {
      throw new ConflictException(
        'La instalación ya está reservada en ese horario',
      );
    }

    const reserva = this.reservasRepository.create({
      ...reservaDto,
      usuarioId,
    });

    return this.reservasRepository.save(reserva);
  }

  async obtenerReservas(
    usuarioId: number,
    rol: string,
  ): Promise<Reserva[]> {
    if (rol === 'ADMIN') {
      const reservas = await this.reservasRepository.find({
        relations: {
          usuario: true,
          instalacion: true,
        },
        order: {
          fecha: 'ASC',
          horaInicio: 'ASC',
        },
      });

      return reservas.map((reserva) => {
        if (reserva.usuario) {
          const { password, ...usuarioSinPassword } = reserva.usuario;
          reserva.usuario = usuarioSinPassword as typeof reserva.usuario;
        }

        return reserva;
      });
    }

    return this.reservasRepository.find({
      where: {
        usuarioId,
      },
      relations: {
        instalacion: true,
      },
      order: {
        fecha: 'ASC',
        horaInicio: 'ASC',
      },
    });
  }

  async cancelarReserva(
    reservaId: number,
    usuarioId: number,
    rol: string,
  ): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({
      where: {
        id: reservaId,
      },
    });

    if (!reserva) {
      throw new NotFoundException('La reserva no existe');
    }

    if (reserva.estado === 'CANCELADA') {
      throw new ConflictException('La reserva ya está cancelada');
    }

    if (rol !== 'ADMIN' && reserva.usuarioId !== usuarioId) {
      throw new ConflictException(
        'No puedes cancelar una reserva de otro usuario',
      );
    }

    reserva.estado = 'CANCELADA';

    return this.reservasRepository.save(reserva);
  }
}