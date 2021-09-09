import { ProductEntity } from 'src/product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 90, nullable: false })
  name: string;

  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column('varchar', { length: 200, nullable: false })
  image_url: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
