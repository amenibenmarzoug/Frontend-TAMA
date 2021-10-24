
import { CommonModule } from '@angular/common';
import { ClassetrainerComponent } from './classetrainer/classetrainer.component';



import { NgModule , LOCALE_ID } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProgramsComponent } from 'app/main/apps/academy/programs/programs.component';
import {  ProgramsService } from 'app/main/apps/academy/programs.service';
import { FuseSidebarModule } from '@fuse/components';

import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';


import { RouterModule, Routes } from '@angular/router';
import {MatDatetimepickerModule, MatNativeDatetimeModule, MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';


import { ClasseParticipantsService} from 'app/main/apps/academy/classes/classe-participants/classe-participants.service'

import {ClassetrainerService} from './classetrainer.service'

const routes: Routes = [
  {
      path     : '**',
      component: ClassetrainerComponent,
      resolve  : {
          contacts: ClassetrainerService

      },
     
      
  }
];

@NgModule({
  declarations: [ClassetrainerComponent],
 
  imports     : [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDatetimepickerModule,
   
    FuseSharedModule,
    FuseSidebarModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatCheckboxModule,
    MatListModule,
    MatStepperModule,       
    MatNativeDatetimeModule,
    CommonModule,
    
],


providers   : [
  ClassetrainerService,
  ClasseParticipantsService

],
})
export class ClassetrainerModule { }
