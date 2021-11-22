import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from './home-page.component'
import { RouterModule } from '@angular/router';
import { HomePageHeaderComponent } from './home-page-header/home-page-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes = [
  {
      path     : 'home',
      component: HomePageComponent
  }
];


@NgModule({
  declarations: [HomePageComponent, HomePageHeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatToolbarModule
  ]
})
export class HomePageModule { }
