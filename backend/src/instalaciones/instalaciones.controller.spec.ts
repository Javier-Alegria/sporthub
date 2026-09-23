import { Test, TestingModule } from '@nestjs/testing';
import { InstalacionesController } from './instalaciones.controller';

describe('InstalacionesController', () => {
  let controller: InstalacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstalacionesController],
    }).compile();

    controller = module.get<InstalacionesController>(InstalacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
