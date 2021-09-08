import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class inputProduct {
  @Field()
  @IsNotEmpty({ message: `Name can't be empty` })
  @MaxLength(20, { message: `Name to long` })
  @MinLength(3, { message: `Name too small` })
  readonly name: string;

  @Field()
  @Optional()
  @IsString()
  @MaxLength(200, { message: `Description to long` })
  readonly description: string;

  @Field()
  @IsString()
  @MaxLength(200, { message: `Image url to long` })
  readonly image_url: string;

  @Field(() => [String])
  readonly categories: string[];
}
