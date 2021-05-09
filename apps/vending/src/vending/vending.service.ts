import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVendingInput, IVendingResult } from '@vnd/common';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VendingService {
  baseApiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http
      .get(`${this.baseApiUrl}/status`)
      .pipe(
        map((val) => {
          return val as IVendingResult;
        })
      )
      .toPromise();
  }

  makePurchase(input: IVendingInput) {
    return this.http
      .post(`${this.baseApiUrl}/purchase`, input)
      .pipe(map((data) => data as IVendingResult))
      .toPromise();
  }
}
