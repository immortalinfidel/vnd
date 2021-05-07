import { CounterModule } from './counter/counter.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
