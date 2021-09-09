import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { DislikedEntity } from './disliked.entity';

@Injectable()
export class DislikedService {
  constructor(
    @InjectRepository(DislikedEntity)
    private readonly DislikedRepository: Repository<DislikedEntity>,
  ) {}

  async isDislikedByUser(userId: string, productId: string): Promise<boolean> {
    return !!(await this.DislikedRepository.findOne({
      relations: ['user', 'product'],
      where: { product: { id: productId }, user: { id: userId } },
    }));
  }

  async isDisliked(productId: string): Promise<DislikedEntity> {
    return await this.DislikedRepository.createQueryBuilder('liked')
      .leftJoinAndSelect('disliked.product', 'product')
      .leftJoinAndSelect('disliked.users', 'user')
      .where('product.id = :productId', { productId })
      .getOne();
  }

  async addNewDislike(
    user: UserEntity,
    product: ProductEntity,
  ): Promise<DislikedEntity> {
    const newDisliked = new DislikedEntity();
    newDisliked.user = user;
    newDisliked.product = product;

    return await this.DislikedRepository.save(newDisliked);
  }
}
