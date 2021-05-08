import { VendingService } from './vending.service';
import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { CounterModule } from '../counter/counter.module';

@Module({
  imports: [InventoryModule, CounterModule],
  controllers: [],
  providers: [VendingService],
  exports: [VendingService],
})
export class VendingModule {}
