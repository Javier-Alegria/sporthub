import { Test, TestingModule } from '@nestjs/testing';

import { InstalacionesController } from './instalaciones.controller';
import { InstalacionesService } from './instalaciones.service';

describe('InstalacionesController', () => {
  let controller: InstalacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstalacionesController],
      providers: [
        {
          provide: InstalacionesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<InstalacionesController>(InstalacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});