/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendingInputComponent } from './vending-input.component';

describe('VendingInputComponent', () => {
  let component: VendingInputComponent;
  let fixture: ComponentFixture<VendingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
