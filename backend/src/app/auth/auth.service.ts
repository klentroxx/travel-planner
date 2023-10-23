import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.usersService.getByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, createdAt, updatedAt, ...result } = user;

      return result;
    }

    return null;
  }

  async issueToken(user: Partial<User>) {
    const payload = { username: user.username, sub: user.id }
    return { id: this.jwtService.sign(payload) }
  }
}
