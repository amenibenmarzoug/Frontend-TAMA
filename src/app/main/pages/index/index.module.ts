import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component'
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes = [
  {
      path     : 'home',
      component: IndexComponent
  }
];

@NgModule({
  declarations:  [
    IndexComponent
],
imports     : [
  CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
]

})
export class IndexModule { }
