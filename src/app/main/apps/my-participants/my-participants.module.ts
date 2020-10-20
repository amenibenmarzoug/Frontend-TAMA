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
import { MyParticipantsComponent } from './my-participants.component';

import { MyParticipantListComponent } from 'app/main/apps/my-participants/my-participant-list/my-participant-list.component';
import { SelectedBarComponent } from 'app/main/apps/my-participants/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/my-participants/sidebars/main/main.component';
import { MyParticipantFormComponent } from 'app/main/apps/my-participants/my-participant-form/my-participant-form.component';

import { MyParticipantsService } from './my-participants.service' ;
import { MatSelectModule } from '@angular/material/select';



const routes: Routes = [
  {
    path: '**',
    component: MyParticipantsComponent,
    resolve: {
      contacts: MyParticipantsService
    }
  }
];



@NgModule({
  declarations: [MyParticipantsComponent, MyParticipantListComponent,
    SelectedBarComponent,
    MainComponent,
    MyParticipantFormComponent],
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
    MatSelectModule ,
    MatToolbarModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [
    MyParticipantsService
  ],
  entryComponents: [
    MyParticipantFormComponent
  ]

})
export class MyParticipantsModule { }
