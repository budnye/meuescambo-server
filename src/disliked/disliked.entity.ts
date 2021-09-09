// TypeORM
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
// Entities
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class DislikedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    primary: true,
  })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    primary: true,
  })
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}
