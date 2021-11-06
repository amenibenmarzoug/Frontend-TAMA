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

import { TrainersComponent } from 'app/main/apps/trainer/trainer.component';
import { TrainerService } from 'app/main/apps/trainer/trainer.service';
import { TrainerListComponent } from 'app/main/apps/trainer/trainer-list/trainer-list.component';
import { SelectedBarComponent } from 'app/main/apps/trainer/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/trainer/sidebars/main/main.component';
import { TrainerFormComponent } from 'app/main/apps/trainer/trainer-form/trainer-form.component';
import { FormsComponent } from 'app/main/ui/forms/forms.component';
import { AuthGuardManagerService } from 'app/auth-guard-manager.service';

const routes: Routes = [
    {
        path     : '**',
        component: TrainersComponent,
        resolve  : {
            contacts: TrainerService
        },
        canActivate:[AuthGuardManagerService] 

        
    }
];

@NgModule({
    declarations   : [
        TrainersComponent,
        TrainerListComponent,
        SelectedBarComponent,
        MainComponent,
        TrainerFormComponent
    ],
    imports        : [
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
    providers      : [
        TrainerService
    ],
    entryComponents: [
        TrainerFormComponent
    ]
})
export class TrainerModule
{
}
