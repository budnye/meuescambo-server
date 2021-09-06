import { Module } from '@nestjs/common';
import { LikedService } from './liked.service';

@Module({
  providers: [LikedService]
})
export class LikedModule {}
