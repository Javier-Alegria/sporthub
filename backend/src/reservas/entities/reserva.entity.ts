import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Instalacion } from '../../instalaciones/entities/instalacion.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  instalacionId: number;

  @Column({
    type: 'date',
  })
  fecha: Date;

  @Column({
    type: 'time',
  })
  horaInicio: string;

  @Column({
    type: 'time',
  })
  horaFin: string;

  @Column({
    default: 'ACTIVA',
  })
  estado: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @ManyToOne(() => User, (user) => user.reservas)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @ManyToOne(() => Instalacion, (instalacion) => instalacion.reservas)
  @JoinColumn({ name: 'instalacionId' })
  instalacion: Instalacion;
}