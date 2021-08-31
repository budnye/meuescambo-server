import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { inputUser } from './inputs/user.input';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [CreateUserDto])
  async User() {
    return this.userService.getUsers();
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args('data') data: inputUser) {
    return this.userService.createUser(data);
  }
}
