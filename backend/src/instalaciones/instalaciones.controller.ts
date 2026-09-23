import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateInstalacionDto } from './dto/create-instalacion.dto';
import { InstalacionesService } from './instalaciones.service';

import { UpdateInstalacionDto } from './dto/update-instalacion.dto';

@Controller('instalaciones')
export class InstalacionesController {
  constructor(
    private readonly instalacionesService: InstalacionesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  crearInstalacion(@Body() instalacionDto: CreateInstalacionDto) {
    return this.instalacionesService.crearInstalacion(instalacionDto);
  }

  @Get()
  obtenerInstalaciones() {
    return this.instalacionesService.obtenerInstalaciones();
  }

  @Get(':id')
  obtenerInstalacionPorId(@Param('id') id: string) {
    return this.instalacionesService.obtenerInstalacionPorId(
      Number(id),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  actualizarInstalacion(
    @Param('id') id: string,
    @Body() instalacionDto: UpdateInstalacionDto,
  ) {
    return this.instalacionesService.actualizarInstalacion(
      Number(id),
      instalacionDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  eliminarInstalacion(@Param('id') id: string) {
    return this.instalacionesService.eliminarInstalacion(
      Number(id),
    );
  }
}