import { NgModule } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ClassroomsComponent } from 'app/main/apps/classrooms/classrooms.component';
import { ClassroomsService } from 'app/main/apps/classrooms/classrooms.service';
import { ClassroomsListComponent } from 'app/main/apps/classrooms/classrooms-list/classrooms-list.component';
import { SelectedBarComponent } from 'app/main/apps/classrooms/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/classrooms/sidebars/main/main.component';
import { ClassroomsFormComponent } from 'app/main/apps/classrooms/classrooms-form/classrooms-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path     : '**',
        component: ClassroomsComponent,
        resolve  : {
            contacts: ClassroomsService
        },
       
        
    }
];

@NgModule({
    declarations   : [
        ClassroomsComponent,
        ClassroomsListComponent,
        SelectedBarComponent,
        MainComponent,
        ClassroomsFormComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
    
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
        ClassroomsService
    ],
    entryComponents: [
        ClassroomsFormComponent
    ]
})
export class ClassroomsModule
{
}
