import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { ProductResolver } from './product.resolver';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { LikedModule } from 'src/liked/liked.module';
import { DislikedModule } from 'src/disliked/disliked.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UserModule,
    CategoryModule,
    LikedModule,
    DislikedModule,
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
