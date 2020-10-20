import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import {MatDatepickerModule} from '@angular/material/datepicker'; 

import { FuseSharedModule } from '@fuse/shared.module';

import { Register2Component } from 'app/main/pages/authentication/register-2/register-2.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { EntrepriseFormComponent } from './entreprise-form/entreprise-form.component';
import { InstitutionFormComponent } from './institution-form/institution-form.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes = [
    {
        path     : 'auth/register-2',
        component: Register2Component
    }
];



@NgModule({
    declarations: [
        Register2Component,
        ParticipantFormComponent,
        TrainerFormComponent,
        EntrepriseFormComponent,
        InstitutionFormComponent,
        UserFormComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule ,
        MatStepperModule,
        MatDatepickerModule,
        FuseSharedModule
    ]
})
export class Register2Module
{
}
