import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VendingModule } from './vending/vending.module';
import { CounterModule } from './counter/counter.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    VendingModule,
    CounterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'vending'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
