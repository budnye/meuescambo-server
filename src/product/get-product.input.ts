import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

@InputType()
export class inputGetproduct {
  @Field()
  @IsString()
  @IsNotEmpty({ message: `Id can't be empty` })
  readonly id: string;
}
