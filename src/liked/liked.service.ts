import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LikedEntity } from './liked.entity';

@Injectable()
export class LikedService {
  constructor(
    @InjectRepository(LikedEntity)
    private readonly LikedRepository: Repository<LikedEntity>,
  ) {}

  async isLikedByUser(userId: string, productId: string): Promise<boolean> {
    return !!(await this.LikedRepository.findOne({
      relations: ['user', 'product'],
      where: { product: { id: productId }, user: { id: userId } },
    }));
  }

  async isLiked(productId: string): Promise<LikedEntity> {
    return await this.LikedRepository.createQueryBuilder('liked')
      .leftJoinAndSelect('liked.product', 'product')
      .leftJoinAndSelect('liked.users', 'user')
      .where('product.id = :productId', { productId })
      .getOne();
  }

  async addNewLike(
    user: UserEntity,
    product: ProductEntity,
  ): Promise<LikedEntity> {
    const newLiked = new LikedEntity();
    newLiked.user = user;
    newLiked.product = product;
    return await this.LikedRepository.save(newLiked);
  }
}
