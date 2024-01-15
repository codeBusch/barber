import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../models/leave';
import { CommonModule } from '@angular/common';
import { LeavesAddComponent } from './leaves-add/leaves-add.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, LeavesAddComponent, LeaveUpdateComponent],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit{
  constructor(private leaveService:LeaveService){}

  leaves:Leave[]=[];
  selectedLeave!:Leave;

  @ViewChild(LeavesAddComponent, {static:true}) addLeaveComponent !: LeavesAddComponent;
  @ViewChild(LeaveUpdateComponent, {static:true}) updateLeaveComponent !: LeaveUpdateComponent;

  getAll(){
    this.leaveService.getAll().subscribe(res=>{
      this.leaves = res.data;
    })
  }

  showAddModal(){
    this.addLeaveComponent.createLeaveForm();
  }

  showEditModal(leave:Leave){
    this.updateLeaveComponent.updateLeaveForm(leave);
  }

  deleteUserById(id:number){
    this.leaveService.deleteById(id).subscribe();
  }

  ngOnInit(): void {
    this.getAll();
  }
}
