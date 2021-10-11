

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
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProgramsComponent } from 'app/main/apps/academy/programs/programs.component';
import {  ProgramsService } from 'app/main/apps/academy/programs.service';
import { FuseSidebarModule } from '@fuse/components';
import { ProgramFormComponent } from './programs/program-form/program-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';


import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  } from '@angular/material-moment-adapter';

import {MatDatetimepickerModule, MatNativeDatetimeModule, MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ProgramDetailsService} from './programDetails/programDetails.service';
import { ProgramDetailsComponent } from './programDetails/programDetails.component';
import { ThematiqueComponent } from './programDetails/tabs/thematique/thematique.component';
import { ModuleComponent } from './programDetails/tabs/module/module.component';
import { ThemeDetailComponent } from './programDetails/tabs/themeDetail/themeDetail.component';
import { ThematiqueFormComponent } from './programDetails/tabs/thematique/thematique-form/thematique-form.component';
import { ModuleFormComponent } from './programDetails/tabs/module/module-form/module-form.component';
import { MainModuleComponent } from './programDetails/tabs/module/sidebars/main/mainModule.component';
import { ModuleListComponent } from './programDetails/tabs/module/module-list/module-list.component';
import {SelectedBarModuleComponent} from './programDetails/tabs/module/selected-bar-module/selected-bar-module.component'
import { ThemeDetailFormComponent } from './programDetails/tabs/themeDetail/theme-detail-form/theme-detail-form.component';
import { ThemeDetailsListComponent } from './programDetails/tabs/themeDetail/theme-detail-list/theme-detail-list.component';
import { MainThemeDetailComponent } from './programDetails/tabs/themeDetail/sidebars/main/main-theme-detail.component';
import {SelectedBarThemeDetailComponent} from './programDetails/tabs/themeDetail/selected-bar-theme-detail/selected-bar-theme-detail.component';
import { FormsModule } from '@angular/forms';
import {ModuleInstFormComponent} from '../academy/program-inst-detail/tabs/module-inst/module-form/module-form.component'
import { AddSessionComponent } from './add-session/add-session.component';
import { TrainersListComponent } from './add-session/trainers-list/trainers-list.component';
import {SelectedBarModuleInstComponent} from '../academy/program-inst-detail/tabs/module-inst/selected-bar-module-inst/selected-bar-module-inst.component'
import { AddSessionService } from './add-session/add-session.service';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ProgramsInstComponent } from './programs-inst/programs-inst.component';
import { ProgramInstFormComponent } from './programs-inst/program-inst-form/program-inst-form.component';
import { ProgramInstDetailComponent } from './program-inst-detail/program-inst-detail.component';
import { ModuleInstComponent } from './program-inst-detail/tabs/module-inst/module-inst.component';
import { ThematiqueInstComponent } from './program-inst-detail/tabs/thematique-inst/thematique-inst.component';
import { ThemeDetailInstComponent } from './program-inst-detail/tabs/theme-detail-inst/theme-detail-inst.component';
import {ThematiqueInstFormComponent} from '../academy/program-inst-detail/tabs/thematique-inst/thematique-inst-form/thematique-inst-form.component'
import{ProgramsInstService} from './programs-inst.service';
import{ProgramInstDetailService} from './program-inst-detail/program-inst-detail.service';
import { ModuleInstListComponent } from './program-inst-detail/tabs/module-inst/module-inst-list/module-inst-list.component';
import { ThemeDetailInstListComponent } from './program-inst-detail/tabs/theme-detail-inst/theme-detail-inst-list/theme-detail-inst-list.component';
import { MainComponent } from './program-inst-detail/tabs/theme-detail-inst/main/main.component';
import{MainComponent2} from './program-inst-detail/tabs/module-inst/sidebars/main/main.component';
import { SelectedBarComponent } from './program-inst-detail/tabs/theme-detail-inst/selected-bar/selected-bar.component';
import{ThemeDetailInstFormComponent} from './../academy/program-inst-detail/tabs/theme-detail-inst/theme-detail-form/theme-detail-form.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { SessionsListComponent } from './all-sessions/sessions-list/sessions-list.component';
import  { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';
import  { MainSessionsComponent } from 'app/main/apps/academy/all-sessions/sidebars/main/main.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassFormComponent } from './classes/class-form/class-form.component';
import{ClassesService} from './classes.service';
import { ModuleClasseComponent } from './classes-detail/tabs/module-classe/module-classe.component';
import { ThematiqueClasseComponent } from './classes-detail/tabs/thematique-classe/thematique-classe.component';
import { ThemeDetailClasseComponent } from './classes-detail/tabs/theme-detail-classe/theme-detail-classe.component';
import{ClassesDetailComponent} from '../academy/classes-detail/classes-detail.component';
import { ModulesInstListComponent } from './classes-detail/tabs/module-classe/modules-inst-list/modules-inst-list.component';
import { SelectModuleComponent } from './classes-detail/tabs/module-classe/select-module/select-module.component';
import { SelectedBarModuleClasseComponent } from './classes-detail/tabs/module-classe/selected-bar-module-classe/selected-bar-module-classe.component';
import { ThemeDetailClassListComponent } from './classes-detail/tabs/theme-detail-classe/theme-detail-class-list/theme-detail-class-list.component';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { EditTrainersListComponent } from './edit-session/edit-trainers-list/edit-trainers-list.component'
import { EditSessionService } from 'app/main/apps/academy/edit-session/edit-session.service';
import{MainComponent3}from 'app/main/apps/academy/classes-detail/tabs/module-classe/sidebars/main/main.component';
import{ClassesDetailService} from '../academy/classes-detail/classes-detail.service';
import{MainComponent4} from '../academy/classes-detail/tabs/theme-detail-classe/main/main.component';
import {ClasseParticipantsComponent} from './classes/classe-participants/classe-participants.component'
import {ClasseParticipantListComponent} from './classes/classe-participants/classe-participants-list/classe-participant-list.component'
import { ClasseParticipantsService } from './classes/classe-participants/classe-participants.service';
import { PlaceFormComponent } from './classes/place-form/place-form.component'
import { ProgramSpecComponent } from './program-spec/program-spec.component';
import { ProgramSpecFormComponent } from './program-spec/program-spec-form/program-spec-form.component'
import {ProgramSpecService } from './program-spec.service';
import { ProgramSpecDetailComponent } from './program-spec-detail/program-spec-detail.component';
import { ThematiqueSpecComponent } from './program-spec-detail/tabs/thematique-spec/thematique-spec.component';
import { ModuleSpecComponent } from './program-spec-detail/tabs/module-spec/module-spec.component';
import { ThemeDetailSpecComponent } from './program-spec-detail/tabs/theme-detail-spec/theme-detail-spec.component';

import {ProgramSpecDetailService} from './program-spec-detail/program-spec-detail.service';
import { ThematiqueSpecFormComponent } from './program-spec-detail/tabs/thematique-spec/thematique-spec-form/thematique-spec-form.component';
import { ModuleSpecFormComponent } from './program-spec-detail/tabs/module-spec/module-spec-form/module-spec-form.component';
import { ModuleSpecListComponent } from './program-spec-detail/tabs/module-spec/module-spec-list/module-spec-list.component';
import { SelectedBarModuleSpecComponent } from './program-spec-detail/tabs/module-spec/selected-bar-module-spec/selected-bar-module-spec.component';
import { MainModuleSpecComponent } from './program-spec-detail/tabs/module-spec/sidebars/main-module-spec/main-module-spec.component';
import { SelectedBarThemeDetailSpecComponent } from './program-spec-detail/tabs/theme-detail-spec/selected-bar-theme-detail-spec/selected-bar-theme-detail-spec.component';
import { MainThemeDetailSpecComponent } from './program-spec-detail/tabs/theme-detail-spec/sidebars/main-theme-detail-spec/main-theme-detail-spec.component';
import { ThemeDetailSpecFormComponent } from './program-spec-detail/tabs/theme-detail-spec/theme-detail-spec-form/theme-detail-spec-form.component';
import { ThemeDetailSpecListComponent } from './program-spec-detail/tabs/theme-detail-spec/theme-detail-spec-list/theme-detail-spec-list.component';
import { ThemeDetailClasseFormComponent } from './classes-detail/tabs/theme-detail-classe/theme-detail-classe-form/theme-detail-classe-form.component';
import { ModuleClassFormComponent } from './classes-detail/tabs/module-classe/module-class-form/module-class-form.component'

registerLocaleData(localeFr, 'fr');

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM-YYYY',
       
    }
};



const routes = [
    {
        path     : 'programs',
        component: ProgramsComponent,
        resolve  : {
            academy: ProgramsService
        }
    },
    {
        path     : 'programsD',
        component: ProgramSpecComponent,
        resolve  : {
            academy: ProgramSpecService
        }
    },

    {
        path     : 'class',
        component: ClassesComponent,
        resolve  : {
            academy: ClassesService
        }
    },
    {
        path     : 'programDetails/:id',
        component: ProgramDetailsComponent,
        resolve  : {
            academy: ProgramDetailsService,
        }
    },
    {
        path     : 'programInstDetails/:id',
        component: ProgramInstDetailComponent,
        resolve  : {
            academy: ProgramInstDetailService,
        }
    },
    {
        path     : 'classeDetail/:id',
        component: ClassesDetailComponent,
        resolve  : {
            academy: ClassesDetailService,
        }
    },
    
    {
        path     : 'programSpecDetails/:id',
        component: ProgramSpecDetailComponent,
        resolve  : {
            academy: ProgramSpecDetailService,
        }
    },
    {
        path     : 'module',
        component: ModuleComponent,
        resolve  : {
            academy: ProgramsService
        }
    },
    {
        path     : 'themeDetail',
        component: ThemeDetailComponent,
        resolve  : {
            academy: ProgramsService
        }
    },
    {
        path     : 'thematique',
        component: ThematiqueComponent,
        resolve  : {
            academy: ProgramsService
        }
    },
    
    {
        path     : 'addSession',
        component: AddSessionComponent,
        resolve  : {
            academy: AddSessionService
        }
    },
    {
        path     : 'editSession/:id',
        component: EditSessionComponent,
        resolve  : {
            academy: EditSessionService
        }
    },
    {
        path     : 'allSessions',
        component: AllSessionsComponent,
        resolve  : {
            academy: AllSessionsService
        }
    },
    {
        path     : 'programDetails/:id',
        component: ProgramDetailsComponent,
        resolve  : {
            academy: ProgramsService,
        }
    },
   
    
 
];
@NgModule({
    declarations: [
        ProgramsComponent,
        ProgramFormComponent,

        ThematiqueComponent,
        ThematiqueFormComponent,

        ProgramDetailsComponent,

        ModuleComponent,
        ModuleFormComponent,
        ModuleListComponent,
        MainModuleComponent,
        SelectedBarModuleComponent,



        ThemeDetailComponent,  
        ThemeDetailFormComponent,
        ThemeDetailInstFormComponent,
        ThemeDetailsListComponent,
        MainThemeDetailComponent,
        SelectedBarThemeDetailComponent,
       
        

        AddSessionComponent,
        TrainersListComponent,
        
        ProgramsInstComponent,
        ProgramInstFormComponent,

        ProgramInstDetailComponent,

        ThematiqueInstComponent,
        ThematiqueInstFormComponent,
        
        ModuleInstComponent,
        ModuleInstListComponent,
        ModuleInstFormComponent,
        SelectedBarModuleInstComponent,

        


        ThemeDetailInstComponent,
        ThemeDetailInstListComponent,
        MainComponent,
        MainComponent2,
        MainComponent3,
        MainSessionsComponent,
        SelectedBarComponent,
        AllSessionsComponent,
        SessionsListComponent,
        ClassesComponent,
        ClassFormComponent,
        ModuleClasseComponent,
        ThematiqueClasseComponent,
        ThemeDetailClasseComponent,
        ClassesDetailComponent,
        ModulesInstListComponent,
        SelectModuleComponent,
        SelectedBarModuleClasseComponent,
        ThemeDetailClassListComponent,
        EditSessionComponent,
        EditTrainersListComponent,
        MainComponent4,

        //ClasseParticipantsComponent

        ClasseParticipantListComponent,
        ClasseParticipantsComponent,
        
        PlaceFormComponent,
        ProgramSpecComponent,
        ProgramSpecFormComponent,
        ProgramSpecDetailComponent,
        ThematiqueSpecComponent,
        ModuleSpecComponent,
        ThemeDetailSpecComponent,
        ThematiqueSpecFormComponent,
        ModuleSpecFormComponent,
        ModuleSpecListComponent,
        SelectedBarModuleSpecComponent,
        MainModuleSpecComponent,
        SelectedBarThemeDetailSpecComponent,
        MainThemeDetailSpecComponent,
        ThemeDetailSpecFormComponent,
        ThemeDetailSpecListComponent,
        ThemeDetailClasseFormComponent,
        ModuleClassFormComponent
       
        
        

        



        
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
        CommonModule,
        FormsModule,


        


        
    ],
    providers   : [
        MatNativeDatetimeModule,
        ProgramDetailsService,
        ProgramsService,  
        ProgramsInstService,   
        ProgramInstDetailService,
        ProgramDetailsService, 
        AddSessionService,
        AllSessionsService,
        EditSessionService,
        ProgramSpecService,
        ProgramSpecDetailService,
       // ClasseParticipantsService,
        ClasseParticipantsService,
        
        {provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
          },
          {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

       
    ],
    exports:[
        ModuleComponent,
        ThemeDetailComponent,
        ThematiqueComponent,
        CommonModule,
        FormsModule
       
        
    ],
    entryComponents: [
        ProgramsComponent,
        ProgramFormComponent
    ]
})
export class AcademyModule
{
}
