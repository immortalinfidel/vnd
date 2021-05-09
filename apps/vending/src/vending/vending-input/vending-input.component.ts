import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vnd-vending-input',
  templateUrl: './vending-input.component.html',
  styleUrls: ['./vending-input.component.scss'],
})
export class VendingInputComponent {
  @Input() fromGroup = VendingInputComponent.buildForm(null);
  @Input() label = 'label';

  static buildForm(item: { count: number; type: string }) {
    return new FormGroup({
      type: new FormControl(item ? item.type : ''),
      count: new FormControl(item ? item.count : 0),
    });
  }

  increment() {
    let val = this.fromGroup.get('count').value;
    val = val + 1;

    this.fromGroup.patchValue({ count: val });
  }

  decrement() {
    let val = this.fromGroup.get('count').value;
    if (val > 0) {
      val = val - 1;
      this.fromGroup.patchValue({ count: val });
    }
  }
}
