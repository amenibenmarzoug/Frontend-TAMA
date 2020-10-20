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

import { CursusCoursesComponent } from 'app/main/apps/cursus/courses/courses.component';
import { CursusCourseComponent } from 'app/main/apps/cursus/course/course.component';
import {  CursusCoursesService } from 'app/main/apps/cursus/courses.service';
import {  CursusCourseService } from 'app/main/apps/cursus/course.service';
import { FuseSidebarModule } from '@fuse/components';
import { CursusFormComponent } from './cursus-form/cursus-form.component';
import { MatMenuModule } from '@angular/material/menu';

import { ParticipantsComponent } from './participants/participants.component';
import{ParticipantsService} from './participants.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { ParticipantFormComponent } from './participants/participant-form/participant-form.component';
import { ParticipantListComponent } from './participants/participant-list/participant-list.component';
import { SelectedBarComponent } from './participants/selected-bar/selected-bar.component';
import { MainComponent } from './participants/sidebars/main/main.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';



import { CursusParticipantsComponent } from './cursus-participants/cursus-participants.component';
import{CursusParticipantsService} from './cursus-participants.service';
import { MatRippleModule } from '@angular/material/core';
import { CursusParticipantService } from './cursus-participants/cursus-participant.service';
import { CursusCoursessService } from './courses/coursess.service';


const routes = [
    {
        path     : 'courses',
        component: CursusCoursesComponent,
        resolve  : {
            academy: CursusCoursesService
        }
    },
    {
        path     : 'cursus',
        component: CursusCoursesComponent,
        resolve  : {
            academy: CursusCoursesService
        }
    },
    {
        path     : 'courses/:courseId/:courseName',
        component: CursusCourseComponent,
        resolve  : {
            academy: CursusCourseService
        }
    },
   {
        path     : 'participants',
        component: ParticipantsComponent,
        resolve  : {
            academy: ParticipantsService
        }
    },
    {
        path     : 'cursus-participants',
        component: CursusParticipantsComponent,
        resolve  : {
            academy: CursusParticipantsService
        }
    },
    {
        path      : '**',
        redirectTo: 'courses'
    }
    
];

@NgModule({
    declarations: [
        CursusCoursesComponent,
        CursusCourseComponent,
        
        CursusFormComponent,
        
        ParticipantsComponent,
     
        ParticipantFormComponent,
        ParticipantListComponent,
        
        MainComponent,

        SelectedBarComponent,

        CursusParticipantsComponent,
        


        
        
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
        ParticipantsService,
        CursusCoursesService,
        CursusCourseService,
        ParticipantsService,
        ParticipantFormComponent,
        ParticipantsComponent,
        CursusParticipantService, 
        CursusCoursessService

    ],
    exports:[
        ParticipantListComponent,
    ],
    entryComponents: [
        ParticipantFormComponent
    ]
})
export class CursusModule
{
}