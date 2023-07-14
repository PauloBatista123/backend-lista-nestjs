import { Module } from '@nestjs/common';
import { RedisService } from 'src/services/redis.service';

@Module({
  providers: [RedisService],
})
export class RedisModule {}
