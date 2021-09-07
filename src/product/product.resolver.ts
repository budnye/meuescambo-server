import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { inputGetproduct } from './inputs/get-product.input';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
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
}
