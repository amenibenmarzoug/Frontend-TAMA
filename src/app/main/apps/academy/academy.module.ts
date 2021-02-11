

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

/*import {
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule, 
    NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';*/
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
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {MainModuleInstComponent} from '../academy/program-inst-detail/tabs/module-inst/main/mainModule.component'
import {ModuleInstFormComponent} from '../academy/program-inst-detail/tabs/module-inst/module-form/module-form.component'
import { AddSessionComponent } from './add-session/add-session.component';
import { TrainersListComponent } from './add-session/trainers-list/trainers-list.component';
import {SelectedBarModuleInstComponent} from '../academy/program-inst-detail/tabs/module-inst/selected-bar-module-inst/selected-bar-module-inst.component'
import { CursusParticipantService } from '../cursus/cursus-participants/cursus-participant.service';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './program-inst-detail/tabs/theme-detail-inst/main/main.component';
import { SelectedBarComponent } from './program-inst-detail/tabs/theme-detail-inst/selected-bar/selected-bar.component';
import{ThemeDetailInstFormComponent} from './../academy/program-inst-detail/tabs/theme-detail-inst/theme-detail-form/theme-detail-form.component';
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
import { ThemeDetailClassListComponent } from './classes-detail/tabs/theme-detail-classe/theme-detail-class-list/theme-detail-class-list.component'
registerLocaleData(localeFr, 'fr');
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
        component: ProgramsInstComponent,
        resolve  : {
            academy: ProgramsInstService
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
            academy: ClassesService,
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
        MainModuleInstComponent,
        ModuleInstFormComponent,
        SelectedBarModuleInstComponent,

        


        ThemeDetailInstComponent,
        ThemeDetailInstListComponent,
        MainComponent,
        SelectedBarComponent,
        ClassesComponent,
        ClassFormComponent,
        ModuleClasseComponent,
        ThematiqueClasseComponent,
        ThemeDetailClasseComponent,
        ClassesDetailComponent,
        ModulesInstListComponent,
        SelectModuleComponent,
        SelectedBarModuleClasseComponent,
        ThemeDetailClassListComponent
       
        
        

        



        
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
        {provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
          },
          {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

       
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
