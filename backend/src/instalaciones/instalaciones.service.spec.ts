import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Instalacion } from './entities/instalacion.entity';
import { InstalacionesService } from './instalaciones.service';

describe('InstalacionesService', () => {
  let service: InstalacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstalacionesService,
        {
          provide: getRepositoryToken(Instalacion),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InstalacionesService>(InstalacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});