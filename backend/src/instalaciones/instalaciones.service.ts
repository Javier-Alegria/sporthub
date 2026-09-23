import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Instalacion } from './entities/instalacion.entity';
import { CreateInstalacionDto } from './dto/create-instalacion.dto';

@Injectable()
export class InstalacionesService {
  constructor(
    @InjectRepository(Instalacion)
    private readonly instalacionesRepository: Repository<Instalacion>,
  ) {}

  async crearInstalacion(
    instalacionDto: CreateInstalacionDto,
  ): Promise<Instalacion> {
    const instalacion = this.instalacionesRepository.create(instalacionDto);

    return this.instalacionesRepository.save(instalacion);
  }
}