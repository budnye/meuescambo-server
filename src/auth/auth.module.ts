import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  providers: [AuthService, UserService, AuthResolver],
})
export class AuthModule {}
