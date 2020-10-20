import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';

import { CursusCoursesPartComponent } from 'app/main/apps/cursus-participants/courses/courses.component';
import {  CursusCoursesPartService } from 'app/main/apps/cursus-participants/courses.service';
import { FuseSidebarModule } from '@fuse/components';
import { MatMenuModule } from '@angular/material/menu';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';



import { MatRippleModule } from '@angular/material/core';
import { CursusCoursessPartService } from './courses/coursess.service';
import { CursusCoursePartService } from '../cursus-participants/course.service';
import { CursusCoursePartComponent } from '../cursus-participants/course/course.component';


const routes = [
    {
        path     : 'courses',
        component: CursusCoursesPartComponent,
        resolve  : {
            academy: CursusCoursesPartService
        }
    },
    {
        path     : 'cursus',
        component: CursusCoursesPartComponent,
        resolve  : {
            academy: CursusCoursesPartService
        }
    },
    {
        path     : 'courses/:courseId/:courseName',
        component: CursusCoursePartComponent,
        resolve  : {
            academy: CursusCoursessPartService
        }
    },
   
    {
        path      : '**',
        redirectTo: 'courses'
    }
    
];

@NgModule({
    declarations: [
        CursusCoursesPartComponent,
        CursusCoursePartComponent,
        
      
        


        


        
        
    ],
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
        FuseSidebarModule,
        MatTableModule,
        MatTabsModule,
        MatSortModule,
        
        MatCheckboxModule,

        MatListModule,
        MatStepperModule
    ],
    providers   : [
        
        CursusCoursesPartService,
        CursusCoursePartService,
        CursusCoursessPartService

    ],
   
})
export class CursusParticipantsModule
{
}
