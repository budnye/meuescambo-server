import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class inputUserUpdate {
  @Field()
  @IsString()
  @MaxLength(20, { message: `Name to long` })
  @MinLength(3, { message: `Name too small` })
  readonly name: string;

  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(20, { message: `Email too long ` })
  readonly email: string;

  @Field()
  @IsString()
  @MaxLength(12, { message: `Password to long` })
  @MinLength(8, { message: `Password too small` })
  readonly password: string;
}
