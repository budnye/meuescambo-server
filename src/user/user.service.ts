import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    await this.UserRepository.save(user);

    return user;
  }

  async updateUser(data: UpdateUserDto): Promise<UserEntity> {
    await UserEntity.update(data.id, data);

    return await UserEntity.findOne(data.id);
  }

  async getUsers() {
    return await this.UserRepository.find();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.UserRepository.findOne({ email: email });

    return user;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.UserRepository.findOne(id);

    return user;
  }

  async getUser(email: string): Promise<UserEntity> {
    const user = await this.UserRepository.findOne({ email: email });

    return user;
  }
}
