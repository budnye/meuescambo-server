import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCategoryDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly description: string;
  @Field() readonly image_url: string;
}
