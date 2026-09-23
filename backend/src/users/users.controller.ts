import { Body, Controller, Post } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  crearUsuario(@Body() user: User): Promise<User> {
    return this.usersService.crearUsuario(user);
  }
}