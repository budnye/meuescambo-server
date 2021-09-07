import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/category.entity';
import { CreateCategoryDto } from 'src/category/dto/category.dto';
import { DislikedEntity } from 'src/disliked/disliked.entity';
import { LikedEntity } from 'src/liked/liked.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class CreateProductDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly description: string;
  @Field() readonly image_url: string;
  @Field(() => CreateUserDto) readonly user: UserEntity;
  @Field(() => [CreateCategoryDto]) readonly categories: CategoryEntity[];
  // @Field(() => [LikedEntity]) readonly likes: LikedEntity[];
  // @Field(() => [DislikedEntity]) readonly dislikes: DislikedEntity[];
}
