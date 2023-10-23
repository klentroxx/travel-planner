import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  /**
   * Get a user by their ID
   *
   * @param id
   * @returns
   */
  public async getById(id: number) {
    return await this.dataSource.manager.findOneByOrFail(User, { id });
  }

  /**
   * Get a user by their username
   *
   * @param username
   * @returns
   */
  public async getByUsername(username: string) {
    return await this.dataSource.manager.findOneByOrFail(User, { username })
  }

  /**
   * Create new user
   *
   * @param name
   * @param username
   * @param password
   */
  public async createUser(name: string, username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
      const { password: _, ...user } = await this.userRepository.save({ name, username, password: hashedPassword })

      return user
    } catch (error) {
      throw new HttpException('Failed to create user!', 500, { cause: error })
    }
  }

}
