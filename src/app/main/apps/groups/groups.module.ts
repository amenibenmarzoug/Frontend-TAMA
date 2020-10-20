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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';

import { GroupListComponent } from 'app/main/apps/groups/group-list/group-list.component';
import { SelectedBarComponent } from 'app/main/apps/groups/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/groups/sidebars/main/main.component';
import { GroupFormComponent } from 'app/main/apps/groups/group-form/group-form.component';

import { GroupsService } from './groups.service';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '**',
    component: GroupsComponent,
    
    resolve: {
      contacts: GroupsService
    },
    
  },
  
];



@NgModule({
  declarations: [GroupsComponent, GroupListComponent,
    SelectedBarComponent,
    MainComponent,
    GroupFormComponent],
  imports: [
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
    FormsModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [
    GroupsService
  ],
  entryComponents: [
    GroupFormComponent
  ]

})
export class GroupsModule { }
