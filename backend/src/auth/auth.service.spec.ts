import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            buscarPorEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe iniciar sesión correctamente', async () => {
    usersService.buscarPorEmail = jest.fn().mockResolvedValue({
      id: 1,
      email: 'usuario@test.com',
      password: 'hash',
      rol: 'USER',
      activo: true,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    jwtService.sign = jest.fn().mockReturnValue('token-de-prueba');

    const resultado = await service.login(
      'usuario@test.com',
      'Password1!',
    );

    expect(resultado).toEqual({
      access_token: 'token-de-prueba',
    });
  });

  it('debe rechazar una contraseña incorrecta', async () => {
    usersService.buscarPorEmail = jest.fn().mockResolvedValue({
      id: 1,
      email: 'usuario@test.com',
      password: 'hash',
      rol: 'USER',
      activo: true,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login('usuario@test.com', 'PasswordIncorrecta!'),
    ).rejects.toThrow('Email o contraseña incorrectos');
  });

  it('debe rechazar un usuario inexistente', async () => {
    usersService.buscarPorEmail = jest.fn().mockResolvedValue(null);

    await expect(
      service.login('noexiste@test.com', 'Password1!'),
    ).rejects.toThrow('Email o contraseña incorrectos');
  });

  it('debe rechazar un usuario desactivado', async () => {
    usersService.buscarPorEmail = jest.fn().mockResolvedValue({
      id: 1,
      email: 'usuario@test.com',
      password: 'hash',
      rol: 'USER',
      activo: false,
    });

    await expect(
      service.login('usuario@test.com', 'Password1!'),
    ).rejects.toThrow('El usuario está desactivado');
  });
});