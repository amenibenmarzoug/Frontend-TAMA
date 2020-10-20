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

import { InstitutionComponent } from 'app/main/apps/institution/institution.component';
import { InstitutionService } from 'app/main/apps/institution/institution.service';
import { InstitutionListComponent } from 'app/main/apps/institution/institution-list/institution-list.component';
import { SelectedBarComponent } from 'app/main/apps/institution/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/institution/sidebars/main/main.component';
import { InstitutionFormComponent } from 'app/main/apps/institution/institution-form/institution-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path     : '**',
        component: InstitutionComponent,
        resolve  : {
            contacts: InstitutionService
        },
       
        
    }
];

@NgModule({
    declarations   : [
        InstitutionComponent,
        InstitutionListComponent,
        SelectedBarComponent,
        MainComponent,
        InstitutionFormComponent
    ],
    imports        : [
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
        InstitutionService
    ],
    entryComponents: [
        InstitutionFormComponent
    ]
})
export class InstitutionModule
{
}
