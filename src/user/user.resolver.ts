import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { inputUser } from './inputs/user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jql-auth.guard';
import { CurrentUser } from './user.decorator';
import { inputUserUpdate } from './inputs/userUpdate.input';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [CreateUserDto])
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => CreateUserDto)
  async getUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args('data') data: inputUser) {
    const user = await this.userService.getUserByEmail(data.email);

    if (user) {
      throw new Error('E-mail já registrado.');
    }

    return this.userService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateUserDto)
  async updateUser(
    @Args('data') data: inputUserUpdate,
    @CurrentUser() user: UserEntity,
  ) {
    const emailExists = await this.userService.getUserByEmail(data.email);

    if (emailExists && user.id !== emailExists.id) {
      throw new Error('E-mail já registrado.');
    }

    if (data.password) {
      throw new Error('Can not edit password.');
    }

    const newData = {
      ...data,
      id: user.id,
    };

    return this.userService.updateUser(newData);
  }
}
