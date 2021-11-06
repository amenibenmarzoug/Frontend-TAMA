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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';


import { SelectedBarClasseComponent } from './selected-bar/selected-bar.component';
import { MainClasseComponent } from './sidebars/main/main.component';
import { MatSelectModule } from '@angular/material/select';
import { ClassroomsManagerComponent } from './classrooms-manager.component';
import { ClassroomsManagerFormComponent } from './classrooms-manager-form/classrooms-manager-form.component';
import { ClassroomsManagerListComponent } from './classrooms-manager-list/classrooms-manager-list.component';
import { ClassroomsManagerService } from './classrooms-manager.service';
import { AuthGuardManagerService } from 'app/auth-guard-manager.service';


const routes: Routes = [
  {
      path     : '**',
      component: ClassroomsManagerComponent,
      resolve  : {
          contacts: ClassroomsManagerService
      },
      canActivate:[AuthGuardManagerService] 

  }
];

@NgModule({
  declarations: [ClassroomsManagerComponent, ClassroomsManagerFormComponent, ClassroomsManagerListComponent, SelectedBarClasseComponent, MainClasseComponent],
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
    MatSelectModule ,
    MatToolbarModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers      : [
    ClassroomsManagerService
],
entryComponents: [
    ClassroomsManagerFormComponent
]
})
export class ClassroomsManagerModule { }
