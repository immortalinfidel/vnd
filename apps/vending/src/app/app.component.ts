import { Component, OnInit } from '@angular/core';
import { IVendingInput, IVendingResult } from '@vnd/common';
import { FormState, initialVendingStatus } from '../vending/utils';
import { VendingComponent } from '../vending/vending.component';
import { VendingService } from '../vending/vending.service';

@Component({
  selector: 'vnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  vendingForm = VendingComponent.buildForm(initialVendingStatus());
  formState: FormState = FormState.INIT;
  message = '';

  title = 'vending';
  vendingStatus = initialVendingStatus();

  constructor(private svc: VendingService) {}

  async ngOnInit() {
    this.vendingStatus = await this.svc.getStatus();
  }

  async processPurchase(data: IVendingInput) {
    try {
      this.formState = FormState.INPROGRESS;
      const result = await this.svc.makePurchase(data);
      this.vendingStatus = await this.svc.getStatus();
      this.message = this.getSuccessMessage(result);
      this.formState = FormState.SUCCESS;
    } catch (err) {
      this.formState = FormState.ERROR;
      this.message = err.error.message;
    } finally {
      this.resetStatus();
    }
  }

  resetStatus() {
    setTimeout(() => {
      if (this.formState === FormState.SUCCESS) {
        this.vendingForm = VendingComponent.buildForm(initialVendingStatus());
      }
      this.formState = FormState.INIT;
    }, 3000);
  }

  getSuccessMessage(result: IVendingResult) {
    const product = result.products
      .map((p) => {
        return `${p.type}:${p.count}`;
      })
      .join(' ');
    const change = result.money
      .map((p) => {
        return `${p.type}:${p.count}`;
      })
      .join(' ');
    return `Product Received ${product} . Change Received: ${change}`;
  }
}
