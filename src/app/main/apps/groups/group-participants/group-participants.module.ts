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
import { GroupParticipantsComponent } from './group-participants.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { GroupParticipantsListComponent } from './group-participants-list/group-participants-list.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { GroupsService } from '../groups.service';

const routes: Routes = [
    {
        path     : '**',
        component: GroupParticipantsComponent,
      
        resolve  : {
            contacts: GroupsService
        },
       
        
    }
];

@NgModule({
    declarations   : [
        GroupParticipantsComponent,
        GroupParticipantsListComponent, 
        SelectedBarComponent, 
        
        
        
        
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
        GroupsService,
    ]
    // entryComponents: [
    //     TrainerFormComponent
    // ]
})
export class GroupParticipantModule
{
}
