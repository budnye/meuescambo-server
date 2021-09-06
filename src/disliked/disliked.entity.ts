// TypeORM
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entities
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class DislikedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToMany(() => ProductEntity, (product) => product, {
    cascade: true,
    primary: true,
  })
  product: ProductEntity;

  @OneToMany(() => UserEntity, (user) => user, {
    cascade: true,
    primary: true,
  })
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}
