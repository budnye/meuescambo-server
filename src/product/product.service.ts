import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    const products = await this.ProductRepository.find({
      relations: ['user', 'categories'],
    });

    return products;
  }

  async getProduct(id: string): Promise<ProductEntity> {
    return await this.ProductRepository.findOne(id);
  }
}
