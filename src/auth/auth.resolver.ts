import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { inputAuth } from './input/auth.input';
import { LoginAuthDto } from './dto/login-auth.dto';

@Resolver((of) => AuthService)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Query(() => [CreateUserDto])
  // async User() {
  //   return this.userService.getUser();
  // }

  @Mutation(() => LoginAuthDto)
  async login(@Args('data') data: inputAuth) {
    return this.authService.validateUser(data);
  }
}
