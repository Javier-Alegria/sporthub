import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

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

  async obtenerPorId(id: number): Promise<Omit<User, 'password'>> {
    const usuario = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    const { password, ...usuarioSinPassword } = usuario;

    return usuarioSinPassword;
  }

  async actualizarUsuario(
    id: number,
    userDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const usuario = await this.obtenerPorId(id);

    if (userDto.email && userDto.email !== usuario.email) {
      const usuarioExistente = await this.usersRepository.findOne({
        where: {
          email: userDto.email,
        },
      });

      if (usuarioExistente) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    if (userDto.password) {
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }

    Object.assign(usuario, userDto);

    await this.usersRepository.save(usuario);

    return this.obtenerPorId(id);
  }

  async desactivarUsuario(id: number): Promise<Omit<User, 'password'>> {
    const usuario = await this.obtenerPorId(id);

    usuario.activo = false;

    await this.usersRepository.save(usuario);

    return this.obtenerPorId(id);
  }

  async activarUsuario(id: number): Promise<Omit<User, 'password'>> {
    const usuario = await this.obtenerPorId(id);

    usuario.activo = true;

    await this.usersRepository.save(usuario);

    return this.obtenerPorId(id);
  }

  async obtenerUsuarios(): Promise<Omit<User, 'password'>[]> {
    const usuarios = await this.usersRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return usuarios.map((usuario) => {
      const { password, ...usuarioSinPassword } = usuario;

      return usuarioSinPassword;
    });
  }
}