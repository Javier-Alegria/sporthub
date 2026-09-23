import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('instalaciones')
export class Instalacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @Column()
  tipo: string;

  @Column()
  ubicacion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  precioHora: number;

  @Column({
    default: true,
  })
  activa: boolean;

  @OneToMany(() => Reserva, (reserva) => reserva.instalacion)
  reservas: Reserva[];
}