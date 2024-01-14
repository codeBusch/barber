import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { CommonModule } from '@angular/common';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule,AppointmentUpdateComponent,AppointmentAddComponent,RouterLink],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  appointments:Appointment[]=[];
  selectedAppointment!:Appointment;
  @ViewChild(AppointmentAddComponent,{static:true}) addAppointmentComponent!: AppointmentAddComponent
  @ViewChild(AppointmentUpdateComponent,{static:true}) updateAppointmentComponent!:AppointmentUpdateComponent
  constructor(private appointmentService:AppointmentService){}


  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.appointmentService.getAll().subscribe(res=>{
      this.appointments=res.data;
    });
  }
  showAddModal(){
    this.addAppointmentComponent.createCreateForm();
  }
  showEditModal(appointment:Appointment|null){
    if(appointment==null) return;
    this.updateAppointmentComponent.createUpdateForm(appointment);
  }
  deleteAppointmentById(id:number){
    this.appointmentService.deleteById(id).subscribe(res=>{
      this.getList();
    })
  }

}
