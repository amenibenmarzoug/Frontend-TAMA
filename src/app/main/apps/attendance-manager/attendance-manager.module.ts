import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagerComponent } from './attendance-manager.component';
import { AttendanceManagerListComponent } from './attendance-manager-list/attendance-manager-list.component';
import { AttendanceManagerSidebarsComponent } from './attendance-manager-sidebars/attendance-manager-sidebars.component';
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
import { AttendanceManagerService } from './attendance-manager.service';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  {
    path: '**',
    component: AttendanceManagerComponent,
    resolve: {
      contacts: AttendanceManagerService
    }
  }
];

@NgModule({
  declarations: [AttendanceManagerComponent,AttendanceManagerListComponent, AttendanceManagerSidebarsComponent],
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
    AttendanceManagerService,
    {provide: LOCALE_ID, useValue: 'fr' }
  ],
})
export class AttendanceManagerModule { }
