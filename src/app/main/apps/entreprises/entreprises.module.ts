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
import { EntreprisesComponent } from './entreprises.component';

import { EntrepriseListComponent } from 'app/main/apps/entreprises/entreprise-list/entreprise-list.component';
import { SelectedBarComponent } from 'app/main/apps/entreprises/selected-bar/selected-bar.component';
import { MainComponent } from 'app/main/apps/entreprises/sidebars/main/main.component';
import { EntrepriseFormComponent } from 'app/main/apps/entreprises/entreprise-form/entreprise-form.component';

import { EntreprisesService } from './entreprises.service';
import { MatSelectModule } from '@angular/material/select';
import { CompanyRegistrationListComponent } from './company-registration-list/company-registration-list.component';



const routes: Routes = [
  {
    path: '**',
    component: EntreprisesComponent,
    resolve: {
      contacts: EntreprisesService
    }
  }
];



@NgModule({
  declarations: [EntreprisesComponent, EntrepriseListComponent,
    SelectedBarComponent,
    MainComponent,
    EntrepriseFormComponent,
    CompanyRegistrationListComponent],
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
    MatSelectModule ,
   
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [
    EntreprisesService
  ],
  entryComponents: [
    EntrepriseFormComponent
  ]

})
export class EntreprisesModule { }
