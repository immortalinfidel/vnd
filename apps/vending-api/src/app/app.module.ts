import { VendingModule } from './vending/vending.module';
import { CounterModule } from './counter/counter.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [VendingModule, CounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
