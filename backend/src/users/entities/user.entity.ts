import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'USER',
  })
  rol: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;
}