import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { inputUser } from './inputs/user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jql-auth.guard';
import { CurrentUser } from './user.decorator';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CreateUserDto])
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => CreateUserDto)
  async getUser(@CurrentUser() user: UserEntity) {
    console.log(user);
    return user;
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args('data') data: inputUser) {
    return this.userService.createUser(data);
  }
}
