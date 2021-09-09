import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/jql-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { CreateLikeDto } from 'src/liked/dto/create-like.dto';
import { LikedService } from 'src/liked/liked.service';
import { CurrentUser } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EntityNotFoundError } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { inputProduct } from './inputs/create-product.input';
import { inputGetproduct } from './get-product.input';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { DislikedService } from 'src/disliked/disliked.service';
import { CreateDislikeDto } from 'src/disliked/dto/create-dislike.dto';

@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly likedService: LikedService,
    private readonly dislikedService: DislikedService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CreateProductDto])
  async products(@CurrentUser() user: UserEntity) {
    return this.productService.getProducts(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CreateProductDto])
  async userProducts(@CurrentUser() user: UserEntity) {
    return this.productService.getUserProducts(user.id);
  }

  @Query(() => CreateProductDto)
  async product(@Args('data') data: inputGetproduct) {
    const { id } = data;
    return await this.productService.getProduct(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateProductDto)
  async createProduct(
    @Args('data') data: inputProduct,
    @CurrentUser() user: UserEntity,
  ) {
    const { name, description, image_url } = data;

    const categories = await this.categoryService.getCategoriesArray(
      data.categories,
    );

    const sendData = {
      name,
      description,
      image_url,
      user,
      categories,
    };

    return this.productService.createProduct(sendData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [CreateLikeDto])
  async likeProduct(
    @CurrentUser() user: UserEntity,
    @Args('data') data: inputGetproduct,
  ) {
    const { id } = data;

    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new EntityNotFoundError(ProductEntity, 'Product not found');
    }

    if (product.user === user) {
      throw new Error('You cannot like your own product');
    }

    const isLiked = await this.likedService.isLikedByUser(user.id, product.id);
    const isDisliked = await this.dislikedService.isDislikedByUser(
      user.id,
      product.id,
    );

    if (isLiked || isDisliked) {
      throw new Error(
        `You already ${isLiked ? 'liked' : 'disliked'} this product`,
      );
    }

    return this.likedService.addNewLike(user, product);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [CreateDislikeDto])
  async dislikeProduct(
    @CurrentUser() user: UserEntity,
    @Args('data') data: inputGetproduct,
  ) {
    const { id } = data;

    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new EntityNotFoundError(ProductEntity, 'Product not found');
    }

    const isLiked = await this.likedService.isLikedByUser(user.id, product.id);
    const isDisliked = await this.dislikedService.isDislikedByUser(
      user.id,
      product.id,
    );

    if (isLiked || isDisliked) {
      throw new Error(
        `You already ${isLiked ? 'liked' : 'disliked'} this product`,
      );
    }

    return this.dislikedService.addNewDislike(user, product);
  }
}
