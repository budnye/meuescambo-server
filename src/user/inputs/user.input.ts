import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
@InputType()
export class inputUser {
  @Field()
  @IsString()
  @IsNotEmpty({ message: `Name can't be empty` })
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: `Email can't be empty` })
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: `Password can't be empty` })
  readonly password: string;
}
