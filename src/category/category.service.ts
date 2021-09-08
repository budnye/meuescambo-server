import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    return await this.CategoryRepository.createQueryBuilder().getMany();
  }

  async getCategoriesArray(categories: string[]): Promise<CategoryEntity[]> {
    return await this.CategoryRepository.createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: categories })
      .getMany();
  }
}
