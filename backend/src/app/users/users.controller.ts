import { Controller, Post, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  async login(@Req() request: ExpressRequest) {
    const { name, username, password } = request.body
    return this.usersService.createUser(name, username, password)
  }
}
