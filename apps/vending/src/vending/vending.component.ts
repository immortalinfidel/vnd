import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IVendingInput } from '@vnd/common';

import { FormState } from './utils';
import { VendingInputComponent } from './vending-input/vending-input.component';

@Component({
  selector: 'vnd-vending',
  templateUrl: './vending.component.html',
  styleUrls: ['./vending.component.scss'],
})
export class VendingComponent {
  @Input() formGroup;

  @Input() formState = FormState.INIT;

  @Output() formSubmitted = new EventEmitter();

  static buildForm(item: IVendingInput) {
    console.log(item);
    return new FormGroup({
      money: new FormArray(
        item ? item.money.map((i) => VendingInputComponent.buildForm(i)) : []
      ),
      products: new FormArray(
        item ? item.products.map((i) => VendingInputComponent.buildForm(i)) : []
      ),
    });
  }

  get productControls() {
    return (this.formGroup.get('products') as FormArray).controls;
  }

  get moneyControls() {
    return (this.formGroup.get('money') as FormArray).controls;
  }
  onSubmit() {
    const value = this.formGroup.getRawValue();

    this.formSubmitted.emit(value);
  }
}
