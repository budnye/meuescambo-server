import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { LikedModule } from './liked/liked.module';
import { DislikedModule } from './disliked/disliked.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    LikedModule,
    DislikedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
