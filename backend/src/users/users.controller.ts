import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

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
    return request.user;
  }
}