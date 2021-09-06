import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

@InputType()
export class inputUser {
  @Field()
  @IsString()
  @IsNotEmpty({ message: `Name can't be empty` })
  @MaxLength(20, { message: `Name to long` })
  @MinLength(3, { message: `Name too small` })
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: `Email can't be empty` })
  @IsEmail()
  @MaxLength(20, { message: `Email too long ` })
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: `Password can't be empty` })
  @MaxLength(12, { message: `Password to long` })
  @MinLength(8, { message: `Password too small` })
  readonly password: string;
}
