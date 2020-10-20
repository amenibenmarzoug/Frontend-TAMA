/*import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDatetimepickerModule, MatNativeDatetimeModule, MAT_DATETIME_FORMATS} from "@mat-datetimepicker/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';

import { AcademyCoursesComponent } from 'app/main/apps/academy/courses/courses.component';
import { AcademyCourseComponent } from 'app/main/apps/academy/course/course.component';
import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { AcademyCourseService } from 'app/main/apps/academy/course.service';
import { FuseSidebarModule } from '@fuse/components';
import { CursusFormComponent } from './cursus-form/cursus-form.component';
import { MatMenuModule } from '@angular/material/menu';

import { TrainingsComponent } from './trainings/trainings.component';
import{TrainingsService} from './trainings.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { TrainingFormComponent } from './trainings/training-form/training-form.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { SelectedBarComponent } from './trainings/selected-bar/selected-bar.component';
import { MainComponent } from './trainings/sidebars/main/main.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';

import { CursusTrainingComponent } from './cursus-training/cursus-training.component';
import{CursusTrainingService} from './cursus-training.service';
import{CourseSessionComponent} from './course-session/course-session.component';
import {CourseSessionService} from './course-session.service';
import { CourseSessionFormComponent } from './course-session/course-session-form/course-session-form.component';
import { CourseSessionListComponent } from './course-session/course-session-list/course-session-list.component';
import { SidebarsComponent } from './course-session/sidebars/sidebars.component'

const routes = [
    {
        path     : 'courses',
        component: AcademyCoursesComponent, 
        resolve  : {
            academy: AcademyCoursesService
        }
    },
    {
        path     : 'cursus',
        component: AcademyCoursesComponent,
        resolve  : {
            academy: AcademyCoursesService
        }
    },
    {
        path     : 'courses/:courseId/:courseName',
        component: AcademyCourseComponent,
        resolve  : {
            academy: AcademyCourseService
        }
    },
   {
        path     : 'trainings',
        component: TrainingsComponent,
        resolve  : {
            academy: TrainingsService
        }
    },
    {
        path     : 'add',
        component: CursusTrainingComponent,
        resolve  : {
            academy: CursusTrainingService
        }
    },
    {
        path     : 'addCourseSession',
        component: CourseSessionComponent,
        resolve  : {
            academy: CourseSessionService,
        }
    },
  /*  {
        path      : '**',
        redirectTo: 'courses'
    }*/
/*];

@NgModule({
    declarations: [
        AcademyCoursesComponent,
        AcademyCourseComponent,
        
        CursusFormComponent,
        
        TrainingsComponent,
     
        TrainingFormComponent,
        TrainingListComponent,
        
        MainComponent,

        SelectedBarComponent,

        CursusTrainingComponent,

        CourseSessionComponent,

        CourseSessionFormComponent,

        CourseSessionListComponent,

        SidebarsComponent,
        


        
        
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

        FuseSharedModule,
        FuseSidebarModule,
        MatTableModule,
        MatTabsModule,
        MatSortModule,

        MatCheckboxModule,

        MatListModule,
        MatStepperModule,
        MatNativeDatetimeModule
        
    ],
    providers   : [
        TrainingsService,
        AcademyCoursesService,
        AcademyCourseService,
        TrainingsService,
        TrainingFormComponent

    ],
    exports:[
        TrainingListComponent,
    ],
    entryComponents: [
        TrainingFormComponent
    ]
})
export class AcademyModule
{
}*/




import { NgModule , LOCALE_ID } from '@angular/core';
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
import { AcademyCoursesComponent } from 'app/main/apps/academy/courses/courses.component';
import { AcademyCourseComponent } from 'app/main/apps/academy/course/course.component';
import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { AcademyCourseService } from 'app/main/apps/academy/course.service';
import { FuseSidebarModule } from '@fuse/components';
import { CursusFormComponent } from './cursus-form/cursus-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { TrainingsComponent } from './trainings/trainings.component';
import{TrainingsService} from './trainings.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { TrainingFormComponent } from './trainings/training-form/training-form.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { SelectedBarComponent } from './trainings/selected-bar/selected-bar.component';
import { MainComponent } from './trainings/sidebars/main/main.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { CursusTrainingComponent } from './cursus-training/cursus-training.component';
import{CursusTrainingService} from './cursus-training.service';


import{CourseSessionComponent} from './course-session/course-session.component';
import {CourseSessionService} from './course-session.service';
import { CourseSessionFormComponent } from './course-session/course-session-form/course-session-form.component';
import { CourseSessionListComponent } from './course-session/course-session-list/course-session-list.component';
/*import {
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule, 
    NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';*/
import {MatDatetimepickerModule, MatNativeDatetimeModule, MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarsComponent } from './course-session/sidebars/sidebars.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CreatedTrainingsListComponent } from './cursus-training/created-trainings-list/created-trainings-list.component';

registerLocaleData(localeFr, 'fr');
const routes = [
    {
        path     : 'courses',
        component: AcademyCoursesComponent,
        resolve  : {
            academy: AcademyCoursesService
        }
    },
    {
        path     : 'cursus',
        component: AcademyCoursesComponent,
        resolve  : {
            academy: AcademyCoursesService
        }
    },
    {
        path     : 'courses/:courseId/:courseName',
        component: AcademyCourseComponent,
        resolve  : {
            academy: AcademyCourseService
        }
    },
   {
        path     : 'trainings',
        component: TrainingsComponent,
        resolve  : {
            academy: TrainingsService
        }
    },
    {
        path     : 'add',
        component: CursusTrainingComponent,
        resolve  : {
            academy: CursusTrainingService
        }
    },
    {
        path     : 'addCourseSession',
        component: CourseSessionComponent,
        resolve  : {
            academy: CourseSessionService
        }
    },
  /*  {
        path      : '**',
        redirectTo: 'courses'
    }*/
];
@NgModule({
    declarations: [
        AcademyCoursesComponent,
        AcademyCourseComponent,
        CursusFormComponent,
        TrainingsComponent,
        TrainingFormComponent,
        TrainingListComponent,
        MainComponent,
        SelectedBarComponent,
        CursusTrainingComponent,
        CourseSessionComponent,


        
        CourseSessionFormComponent,
        CourseSessionListComponent,
        SidebarsComponent,
        CreatedTrainingsListComponent,
        

        



        
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


        
    ],
    providers   : [
        TrainingsService,
        AcademyCoursesService,
        AcademyCourseService,
        TrainingsService,
        CourseSessionService,
        TrainingFormComponent,

        CursusTrainingService,
        MatNativeDatetimeModule,
        
        {provide: LOCALE_ID, useValue: 'fr' }

       
    ],
    exports:[
        TrainingListComponent,
    ],
    entryComponents: [
        TrainingFormComponent
    ]
})
export class AcademyModule
{
}
