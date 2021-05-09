import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingComponent } from './vending.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { VendingInputComponent } from './vending-input/vending-input.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,

    FlexLayoutModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [VendingComponent, VendingInputComponent],
  exports: [VendingComponent],
})
export class VendingModule {}
