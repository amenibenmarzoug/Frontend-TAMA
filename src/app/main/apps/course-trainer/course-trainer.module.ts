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
import { MatSelectModule } from '@angular/material/select';

import { MatToolbarModule } from '@angular/material/toolbar';



import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AvailableTrainersListComponent } from './available-trainers-list/available-trainers-list.component';
import { MainComponent } from './sidebars/main/main.component';
import { CourseTrainerComponent } from './course-trainer.component';
import { CourseTrainerService } from './coursetrainer.service';


const routes: Routes = [
  {
    path: '**',
    component: CourseTrainerComponent,
    resolve: {
      contacts: CourseTrainerService
    }
  }
];


@NgModule({
  declarations: [CourseTrainerComponent,AvailableTrainersListComponent, MainComponent],
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
    MatSelectModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [
    CourseTrainerService,
    {provide: LOCALE_ID, useValue: 'fr' }

  ],
})
export class CourseTrainerModule { }
