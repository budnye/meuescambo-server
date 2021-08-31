import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
@InputType()
export class inputAuth {
  @Field()
  @IsString()
  @IsNotEmpty({ message: `Email can't be empty` })
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: `Password can't be empty` })
  readonly password: string;
}
