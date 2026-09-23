import { Test, TestingModule } from '@nestjs/testing';
import { InstalacionesService } from './instalaciones.service';

describe('InstalacionesService', () => {
  let service: InstalacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstalacionesService],
    }).compile();

    service = module.get<InstalacionesService>(InstalacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
