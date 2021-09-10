import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'rxjs';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { inputProduct } from './inputs/create-product.input';
import { inputProductUpdate } from './inputs/update-product.input';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(userId: string): Promise<ProductEntity[]> {
    const products = await this.ProductRepository.createQueryBuilder('product')
      .leftJoin('product.likes', 'likes')
      .leftJoin('product.dislikes', 'dislikes')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.user.id != :userId', { userId })
      .andWhere('product.isActive = :isActive', { isActive: true })
      .loadRelationCountAndMap(
        'product.likedByUser',
        'product.likes',
        'likes',
        (qb) => qb.andWhere('likes.user = :userId', { userId }),
      )
      .loadRelationCountAndMap(
        'product.dislikedByUser',
        'product.dislikes',
        'dislikes',
        (qb) => qb.andWhere('dislikes.user = :userId', { userId }),
      )
      .getMany();

    return products;
  }

  async getUserProducts(userId: string): Promise<ProductEntity[]> {
    return await this.ProductRepository.find({
      where: {
        user: userId,
        isActive: true,
      },
      relations: ['user', 'categories', 'likes'],
    });
  }

  async getProduct(id: string): Promise<ProductEntity> {
    return await this.ProductRepository.createQueryBuilder('product')
      .leftJoin('product.likes', 'likes')
      .leftJoin('product.dislikes', 'dislikes')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.id = :id', { id })
      .andWhere('product.isActive = :isActive', { isActive: true })
      .loadRelationCountAndMap(
        'product.likesCount',
        'product.likes',
        'likes',
        (qb) => qb.andWhere('likes.product = :id', { id }),
      )
      .loadRelationCountAndMap(
        'product.dislikesCount',
        'product.dislikes',
        'dislikes',
        (qb) => qb.andWhere('dislikes.product = :id', { id }),
      )
      .getOne();
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

  async updateProduct(data: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.ProductRepository.findOne(data.id);
    product.name = data.name;
    product.description = data.description;
    product.image_url = data.image_url;
    product.categories = data.categories;
    product.save();

    return product;
  }

  async isProductOwner(productId: string, userId: string): Promise<boolean> {
    return !!(await this.ProductRepository.findOne(productId, {
      relations: ['user'],
      where: {
        user: { id: userId },
      },
    }));
  }
}
