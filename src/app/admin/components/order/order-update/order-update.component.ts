import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss'
})
export class OrderUpdateComponent {
  updateForm!:FormGroup;
  order!:Order;
  orders:Order[]=[]
  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private orderService:OrderService){}

  createUpdateForm(order:Order){
    this.updateForm=this.formBuilder.group({
      id:[order.id,Validators.required],
      fullName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required],
      sendDate:['',Validators.required],
      cargoBranch:['',Validators.required],
      isSend:['',Validators.required]
    })
  }
  onSubmit(){
    if(!this.updateForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }
    let order:Order=Object.assign({},this.updateForm.value);
    this.orderService.update(order).subscribe(result=>{
      if(typeof document ==undefined) return;
      document.querySelector(".edit-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
  // checked(order:Order):boolean{
  //   if(this.order==undefined) return false;
  //   return this.order?.isSend?.find(x=>x.id==order.id)!==undefined
  // }
  // changeSwitch(order:Order){
  //   let order:Order={
  //     id:this.order.id,
     
  //   }
  //   if(this.checked(order)){
  //     this.orderService.removeClaim(userSetClaim).subscribe(result=>{
  //       let claimIndex=this.userWithClaim.claims.findIndex(x=>x.id==order.id);
  //       this.userWithClaim.claims.splice(claimIndex,1);
  //     })
  //   }else{
  //     this.userService.addClaim(userSetClaim).subscribe(result=>{
  //       this.userWithClaim.claims.push(order)
  //     })
  //   }
  // }
}
