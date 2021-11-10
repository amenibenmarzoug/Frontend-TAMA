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

import { AttendanceCompanyService } from './attendance-company.service';
import { AttendanceCompanyComponent } from './attendance-company.component';
import { AttendanceCompanyListComponent } from './attendance-company-list/attendance-company-list.component';
import { AttendanceCompanySidebarsComponent } from './attendance-company-sidebars/attendance-company-sidebars.component';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  {
    path: '**',
    component: AttendanceCompanyComponent,
    resolve: {
      contacts: AttendanceCompanyService
    }
  }
];

@NgModule({
  declarations: [AttendanceCompanyComponent,AttendanceCompanyListComponent, AttendanceCompanySidebarsComponent],
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
    AttendanceCompanyService
  ],
})
export class AttendanceCompanyModule { }
