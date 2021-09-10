import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/category.entity';
import { CreateCategoryDto } from 'src/category/dto/category.dto';

@ObjectType()
export class UpdateProductDto {
  @Field()
  readonly id: string;

  @Field()
  @Optional()
  readonly name?: string;

  @Field()
  @Optional()
  readonly description?: string;

  @Field()
  @Optional()
  readonly image_url?: string;

  @Field()
  @Optional()
  readonly isActive?: boolean;

  @Field(() => [CreateCategoryDto])
  @Optional()
  readonly categories?: CategoryEntity[];
}
