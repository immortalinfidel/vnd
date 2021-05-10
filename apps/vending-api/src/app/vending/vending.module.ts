import { Module } from '@nestjs/common';
import { VendingService } from './vending.service';
import { CounterModule } from '../counter/counter.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [InventoryModule, CounterModule],
  controllers: [],
  providers: [VendingService],
  exports: [VendingService],
})
export class VendingModule {}
