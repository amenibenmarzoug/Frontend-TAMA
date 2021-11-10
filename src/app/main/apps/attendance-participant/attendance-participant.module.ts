import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
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

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';
import { AttendanceParticipantListComponent } from './attendance-participant-list/attendance-participant-list.component';
import { AttendanceParticipantService } from './attendance-participant.service';
import {AttendanceParticipantComponent} from './attendance-participant.component';
import { MatPaginatorModule } from '@angular/material/paginator';
const routes: Routes = [
  {
    path: '**',
    component: AttendanceParticipantComponent,
    resolve: {
      attendances: AttendanceParticipantService
    }
  }
];


@NgModule({
  declarations: [AttendanceParticipantListComponent,AttendanceParticipantComponent],
  imports: [
    CommonModule,
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
    AttendanceParticipantService
  ],
})
export class AttendanceParticipantModule { }
