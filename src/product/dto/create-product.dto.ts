import { Optional } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/category.entity';
import { CreateCategoryDto } from 'src/category/dto/category.dto';
import { DislikedEntity } from 'src/disliked/disliked.entity';
import { CreateDislikeDto } from 'src/disliked/dto/create-dislike.dto';
import { CreateLikeDto } from 'src/liked/dto/create-like.dto';
import { LikedEntity } from 'src/liked/liked.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class CreateProductDto {
  @Field() readonly id?: string;
  @Field() readonly name: string;
  @Field() readonly description: string;
  @Field() readonly image_url: string;
  @Field() readonly isActive?: boolean;
  @Field(() => CreateUserDto) readonly user: UserEntity;
  @Field(() => [CreateCategoryDto]) readonly categories!: CategoryEntity[];
  @Field(() => CreateLikeDto)
  readonly likes?: LikedEntity;
  @Field(() => CreateDislikeDto)
  readonly dislikes?: DislikedEntity;
  @Field()
  readonly likedByUser?: number;
  @Field()
  readonly dislikedByUser?: number;
}
