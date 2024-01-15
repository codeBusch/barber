import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../models/order';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss'
})
export class OrderAddComponent {
  createForm!:FormGroup
  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private orderService:OrderService){}

  createCreateForm(){
    this.createForm=this.formBuilder.group({
      fullName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required],
      sendDate:['',Validators.required],
      cargoBranch:['',Validators.required],
      isSend:[false,Validators.required]

    })
  }
  onSubmit(){
    if(!this.createForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }
    let order:Order=Object.assign({},this.createForm.value);
    this.orderService.create(order).subscribe(res=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}
