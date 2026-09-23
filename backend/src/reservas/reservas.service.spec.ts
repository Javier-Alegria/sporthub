import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Reserva } from './entities/reserva.entity';
import { Instalacion } from '../instalaciones/entities/instalacion.entity';
import { ReservasService } from './reservas.service';

describe('ReservasService', () => {
  let service: ReservasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        {
          provide: getRepositoryToken(Reserva),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Instalacion),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});