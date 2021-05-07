import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
