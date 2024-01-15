import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderUpdateComponent } from './order-update/order-update.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,RouterLink,OrderAddComponent,OrderUpdateComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orders:Order[]=[]
  selectedOrder!:Order
  @ViewChild(OrderAddComponent,{static:true}) addOrderComponent !: OrderAddComponent; 
  @ViewChild(OrderUpdateComponent,{static:true}) updateOrderComponent !: OrderUpdateComponent; 

  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.orderService.getAll().subscribe(res=>{
      this.orders=res.data
    })
  }
  showAddModal(){
    this.addOrderComponent.createCreateForm();
  }
  showEditModal(order:Order|null){
    if(order==null) return;
    this.updateOrderComponent.createUpdateForm(order);
  }
  deleteOrderById(id:number){
    this.orderService.deleteById(id).subscribe(res=>{
      this.getList();
    })
  }
}
