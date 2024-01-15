import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { Order, OrderWithProduct } from '../models/order';
import { Observable } from 'rxjs';
import { DataResponse } from '../models/responses';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {
  override path: string="orders";
  // getByIdWithProducts(productId:number):Observable<DataResponse<OrderWithProduct>>
}
