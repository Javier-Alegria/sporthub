import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Instalacion } from './entities/instalacion.entity';
import { InstalacionesController } from './instalaciones.controller';
import { InstalacionesService } from './instalaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instalacion])],
  controllers: [InstalacionesController],
  providers: [InstalacionesService],
})
export class InstalacionesModule {}