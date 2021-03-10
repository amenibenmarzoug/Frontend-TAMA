import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {MatRadioModule} from '@angular/material/radio';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';


import { ParticipantsComponent } from './participants.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { MainComponent } from './sidebars/main/main.component';
import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [
  {
      path     : '**',
      component: ParticipantsComponent,
      resolve  : {
          contacts: ParticipantsService
      }
  }
];

@NgModule({
  declarations: [ParticipantsComponent, ParticipantFormComponent, ParticipantListComponent, SelectedBarComponent, MainComponent],
  imports: [
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
    MatRadioModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers      : [
    ParticipantsService
],
entryComponents: [
  ParticipantFormComponent
]
})
export class ParticipantsModule { }
