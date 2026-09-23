import { 
  Injectable, 
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
    rol: string;
  }) {
    const user = await this.usersService.buscarPorEmail(payload.email);

    if (!user || !user.activo) {
      throw new UnauthorizedException('El usuario está desactivado');
    }

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };
  }
}