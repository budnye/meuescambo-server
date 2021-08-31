import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { inputAuth } from './input/auth.input';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(data: inputAuth): Promise<LoginAuthDto> {
    const user = await this.userService.getUser({ email: data.email });
    console.log(user);
    console.log(data);

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { token: 'token' };
  }
}
