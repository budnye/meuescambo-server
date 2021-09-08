import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCategoryDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field()
  @Optional()
  readonly description?: string;
  @Field() readonly image_url: string;
}
