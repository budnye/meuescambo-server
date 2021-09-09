import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DislikedEntity } from './disliked.entity';
import { DislikedService } from './disliked.service';

@Module({
  imports: [TypeOrmModule.forFeature([DislikedEntity])],
  providers: [DislikedService],
  exports: [DislikedService],
})
export class DislikedModule {}
