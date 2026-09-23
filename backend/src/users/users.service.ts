import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async crearUsuario(
    userDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const usuarioExistente = await this.usersRepository.findOne({
      where: {
        email: userDto.email,
      },
    });

    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordCifrada = await bcrypt.hash(userDto.password, 10);

    const user = this.usersRepository.create({
      ...userDto,
      password: passwordCifrada,
    });

    const usuarioGuardado = await this.usersRepository.save(user);

    const { password, ...usuarioSinPassword } = usuarioGuardado;

    return usuarioSinPassword;
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}