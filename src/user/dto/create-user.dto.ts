import { Field, ObjectType, HideField } from '@nestjs/graphql';
import { ProductEntity } from 'src/product/product.entity';

@ObjectType()
export class CreateUserDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly email: string;
  @HideField() readonly password: string;
}
