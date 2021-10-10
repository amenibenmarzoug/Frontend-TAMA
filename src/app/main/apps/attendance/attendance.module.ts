import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { SidebarsComponent } from './sidebars/sidebars.component';



@NgModule({
  declarations: [AttendanceComponent, AttendanceListComponent, SelectedBarComponent, SidebarsComponent],
  imports: [
    CommonModule
  ]
})
export class AttendanceModule { }
