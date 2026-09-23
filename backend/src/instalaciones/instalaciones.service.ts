import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Instalacion } from './entities/instalacion.entity';
import { CreateInstalacionDto } from './dto/create-instalacion.dto';

import { UpdateInstalacionDto } from './dto/update-instalacion.dto';

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

  async obtenerInstalaciones(): Promise<Instalacion[]> {
    return this.instalacionesRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async obtenerInstalacionPorId(id: number): Promise<Instalacion> {
    const instalacion = await this.instalacionesRepository.findOne({
      where: {
        id,
      },
    });

    if (!instalacion) {
      throw new NotFoundException('La instalación no existe');
    }

    return instalacion;
  }  

  async actualizarInstalacion(
    id: number,
    instalacionDto: UpdateInstalacionDto,
  ): Promise<Instalacion> {
    const instalacion = await this.obtenerInstalacionPorId(id);

    Object.assign(instalacion, instalacionDto);

    return this.instalacionesRepository.save(instalacion);
  }  

  async eliminarInstalacion(id: number): Promise<Instalacion> {
    const instalacion = await this.obtenerInstalacionPorId(id);

    instalacion.activa = false;

    return this.instalacionesRepository.save(instalacion);
  }
}