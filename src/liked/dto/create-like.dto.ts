import { Field, ObjectType } from '@nestjs/graphql';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductEntity } from 'src/product/product.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class CreateLikeDto {
  @Field() readonly id?: string;
  @Field(() => CreateUserDto) readonly user: UserEntity;
  @Field(() => CreateProductDto) readonly product: ProductEntity;
}
