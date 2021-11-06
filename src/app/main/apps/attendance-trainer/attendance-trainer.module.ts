import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';

import { AttendanceTrainerListComponent } from './attendance-trainer-list/attendance-trainer-list.component';
import { AttendanceTrainerComponent } from './attendance-trainer.component';
import { AttendanceTrainerSidebarsComponent } from './attendance-trainer-sidebars/attendance-trainer-sidebars.component';
import {AttendanceTrainerService} from './attendance-trainer.service'

import { AuthGuardTrainerService } from '../../../auth-guard-trainer.service';
const routes: Routes = [
  {
    path: '**',
    component: AttendanceTrainerComponent,
    resolve: {
      contacts: AttendanceTrainerService
    },
    canActivate:[AuthGuardTrainerService] 
  }
];

@NgModule({
  declarations: [AttendanceTrainerComponent,AttendanceTrainerListComponent, AttendanceTrainerSidebarsComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule ,
   
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],

  providers: [
    AttendanceTrainerService
  ],

})

export class AttendanceTrainerModule { }
