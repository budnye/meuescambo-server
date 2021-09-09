import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedEntity } from './liked.entity';
import { LikedService } from './liked.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikedEntity])],
  providers: [LikedService],
  exports: [LikedService],
})
export class LikedModule {}
