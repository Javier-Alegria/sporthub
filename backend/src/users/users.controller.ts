import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  crearUsuario(@Body() user: CreateUserDto): Promise<any> {
    return this.usersService.crearUsuario(user);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  perfil(@Req() request: any) {
    return this.usersService.obtenerPorId(request.user.id);
  }

  @Put('perfil')
  @UseGuards(JwtAuthGuard)
  actualizarPerfil(
    @Body() userDto: UpdateUserDto,
    @Req() request: any,
  ) {
    return this.usersService.actualizarUsuario(
      request.user.id,
      userDto,
    );
  }
}