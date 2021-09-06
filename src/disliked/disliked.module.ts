import { Module } from '@nestjs/common';
import { DislikedService } from './disliked.service';

@Module({
  providers: [DislikedService]
})
export class DislikedModule {}
