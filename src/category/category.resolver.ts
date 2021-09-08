import { Resolver, Query } from '@nestjs/graphql';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Resolver((of) => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CreateCategoryDto])
  async categories() {
    return this.categoryService.getCategories();
  }
}
