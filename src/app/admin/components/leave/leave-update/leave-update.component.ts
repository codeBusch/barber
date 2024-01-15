import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../../../services/leave.service';
import { Leave } from '../../../../models/leave';

@Component({
  selector: 'app-leave-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './leave-update.component.html',
  styleUrl: './leave-update.component.scss'
})

export class LeaveUpdateComponent {
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private leaveService:LeaveService
  ){}

  leaveForm!:FormGroup;

  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

  updateLeaveForm(leave:Leave){
    this.leaveForm=this.formBuilder.group({
      id:[leave.id, Validators.required],
      userId:[leave.userId, Validators.required],
      startDate:[leave.startDate, Validators.required],
      endDate:[leave.endDate, Validators.required]
    })
  }

  onSubmit(){
    this.leaveForm.valid ? this.toastrService.warning("Please check the form.","Warning") : console.log("aynen");

    let leave:Leave=Object.assign({}, this.leaveForm.value);

    this.leaveService.update(leave).subscribe(res=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}
