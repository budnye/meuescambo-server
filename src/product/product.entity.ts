import { CategoryEntity } from 'src/category/category.entity';
import { DislikedEntity } from 'src/disliked/disliked.entity';
import { LikedEntity } from 'src/liked/liked.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 120, nullable: false })
  name: string;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column('varchar', { length: 200, nullable: true })
  image_url: string;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => LikedEntity, (likes) => likes.product)
  likes: LikedEntity[];

  @OneToMany(() => DislikedEntity, (disliked) => disliked.product)
  dislikes: DislikedEntity[];

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
