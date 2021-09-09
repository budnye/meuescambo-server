import { DislikedEntity } from 'src/disliked/disliked.entity';
import { LikedEntity } from 'src/liked/liked.entity';
import { ProductEntity } from 'src/product/product.entity';
import { hashPasswordTransform } from 'src/utils/crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 90, nullable: false })
  name: string;

  @Column('varchar', { length: 90, unique: true })
  email: string;

  @Column({ transformer: hashPasswordTransform })
  password: string;

  @Column('varchar', { length: 10, nullable: true })
  avatar: string;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
