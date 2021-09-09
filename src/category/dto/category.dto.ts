import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductEntity } from 'src/product/product.entity';

@ObjectType()
export class CreateCategoryDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field()
  @Optional()
  readonly description?: string;
  @Field() readonly image_url: string;
  @Field(() => [CreateProductDto]) readonly products: ProductEntity;
}
