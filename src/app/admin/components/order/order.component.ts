import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orders:Order[]=[]
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.orderService.getAll().subscribe(res=>{
      this.orders=res.data
    })
  }
}
