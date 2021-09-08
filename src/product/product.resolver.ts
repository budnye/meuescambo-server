import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/jql-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { CurrentUser } from 'src/user/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EntityNotFoundError } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { inputProduct } from './inputs/create-product.input';
import { inputGetproduct } from './inputs/get-product.input';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [CreateProductDto])
  async products() {
    return this.productService.getProducts();
  }

  @Query(() => CreateProductDto)
  async product(@Args('data') data: inputGetproduct) {
    const { id } = data;
    return this.productService.getProduct(id);
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
    console.log(user);

    const sendData = {
      name,
      description,
      image_url,
      user,
      categories,
    };

    return this.productService.createProduct(sendData);
  }
}
