import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {ResetPasswordProfileComponent} from './reset-password.component';
//import { FuseSharedModule } from '@fuse/shared.module';



const routes = [
    {
        path     : 'auth/reset-password',
        component: ResetPasswordProfileComponent
    }
];

@NgModule({
    declarations: [
        ResetPasswordProfileComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

       // FuseSharedModule
    ]
})
export class ResetPasswordProfileModule
{
}
