import { NgModule, LOCALE_ID } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';

import { CommonModule } from '@angular/common';



import { AttendanceComponent } from './attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { SidebarsComponent } from './sidebars/sidebars.component';
import { MatSelectModule } from '@angular/material/select';

import { AttendanceService } from './attendance.service';
import { AuthGuardTrainerService } from 'app/auth-guard-trainer.service';
const routes: Routes = [
  {
    path: '**',
    component: AttendanceComponent,
    resolve: {
      contacts: AttendanceService
    },
    canActivate:[AuthGuardTrainerService] 
  }
];

@NgModule({
  declarations: [AttendanceComponent, AttendanceListComponent,  SidebarsComponent],
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
    MatPaginatorModule,
   
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],

  providers: [
    AttendanceService,
    {provide: LOCALE_ID, useValue: 'fr' }
  ],

})



export class AttendanceModule { }



