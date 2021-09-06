import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserEntity } from '../user/user.entity';
import { inputAuth } from './input/auth.input';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './strategy/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(data: inputAuth): Promise<UserEntity> {
    console.log(data);

    const user = await this.userService.getUserByEmail(data.email);

    if (!user) throw new UnauthorizedException('Usuário ou senha inválido');

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword)
      throw new UnauthorizedException('Usuário ou senha inválido');

    return user;
  }

  async login(user: UserEntity): Promise<LoginAuthDto> {
    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async verify(token: string): Promise<UserEntity> {
    const decoded = this.jwtService.verify(token, { secret: jwtSecret });

    return this.userService.getUserByEmail(decoded.email);
  }
  // async validateUser(data: inputAuth): Promise<LoginAuthDto> {
  //   const user = await this.userService.getUser({ email: data.email });
  //   const validPassword = compareSync(data.password, user.password);

  //   if (!validPassword) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const payload = { email: user.email, id: user.id };
  //   const token = `Bearer ${this.jwtService.sign(payload)}`;

  //   return {
  //     token,
  //   };
  // }
}
