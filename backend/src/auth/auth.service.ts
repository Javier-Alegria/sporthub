import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.buscarPorEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordCorrecta) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}