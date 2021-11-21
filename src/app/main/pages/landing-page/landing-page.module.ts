import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LandingPageComponent } from './landing-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicProgramsComponent } from './public-programs/public-programs.component';
import { PublicProgramsDetailsComponent } from './public-programs-details/public-programs-details.component';
import { LandingPageService } from './landing-page.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { PublicProgramsDetailsService } from './public-programs-details/public-programs-details.service';


const routes = [
  {
    path: 'home2',
    component: LandingPageComponent,
    resolve:{ landingPage:LandingPageService}
  },
  {
    path: 'home2/programs',
    component: PublicProgramsComponent,
    resolve:{ landingPage:LandingPageService}
  },
  {
    path: 'home2/programs/:courseId/:courseSlug',
    component: PublicProgramsDetailsComponent,
    resolve:{ publicService:PublicProgramsDetailsService}
  },

  {
    path      : '**',
    redirectTo: 'home2'
}
];

@NgModule({
  declarations: [
    LandingPageComponent,
    PublicProgramsComponent,
    PublicProgramsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  providers: [LandingPageService,PublicProgramsDetailsService]
})
export class LandingPageModule { }
