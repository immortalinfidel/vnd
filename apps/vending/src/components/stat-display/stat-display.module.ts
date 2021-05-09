import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatDisplayComponent } from './stat-display.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [StatDisplayComponent],
  exports: [StatDisplayComponent],
})
export class StatDisplayModule {}
