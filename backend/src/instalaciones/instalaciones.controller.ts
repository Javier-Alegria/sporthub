import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateInstalacionDto } from './dto/create-instalacion.dto';
import { InstalacionesService } from './instalaciones.service';

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
}