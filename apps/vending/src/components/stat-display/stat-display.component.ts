import { Component, Input, OnInit } from '@angular/core';
import { IMoney, IProduct } from '@vnd/common';

@Component({
  selector: 'vnd-stat-display',
  templateUrl: './stat-display.component.html',
  styleUrls: ['./stat-display.component.scss'],
})
export class StatDisplayComponent {
  @Input() stat: IMoney | IProduct;
}
