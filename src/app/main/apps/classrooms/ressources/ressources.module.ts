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

import { RessourcesComponent } from './ressources.component';
import { RessourcesService } from './ressources.service';
import { RessourcesListComponent } from './ressources-list/ressources-list.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { MainComponent } from './sidebars/main/main.component';
import { RessourcesFormComponent } from './ressources-form/ressources-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path     : '**',
        component: RessourcesComponent,
        resolve  : {
            contacts: RessourcesService
        },
       
        
    }
];

@NgModule({
    declarations   : [
        RessourcesComponent,
        RessourcesListComponent,
        SelectedBarComponent,
        MainComponent,
        RessourcesFormComponent
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
        RessourcesService
    ],
    entryComponents: [
        RessourcesFormComponent
    ]
})
export class RessourcesModule
{
}
