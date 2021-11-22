import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes = [
  {
      path     : 'home2',
      component: LandingPageComponent
  }
];

@NgModule({
  declarations:  [
    LandingPageComponent
],
imports     : [
  CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
]

})
export class LandingPageModule { }
