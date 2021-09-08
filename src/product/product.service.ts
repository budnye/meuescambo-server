import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { inputProduct } from './inputs/create-product.input';
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
    console.log(products);

    return products;
  }

  async getProduct(id: string): Promise<ProductEntity> {
    return await this.ProductRepository.findOne(id);
  }

  async createProduct(data: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = data.name;
    product.description = data.description;
    product.image_url = data.image_url;
    product.categories = data.categories;
    product.user = data.user;

    return await this.ProductRepository.save(product);
  }

  //createProduct
}
