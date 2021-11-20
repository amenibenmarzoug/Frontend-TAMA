import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollspyDirective } from './scrollspy.directive';
import { ServicesComponent } from './services/services.component';
import { FeaturesComponent } from './features/features.component';
//import { ClientComponent } from './client/client.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { SwitcherComponent } from './switcher/switcher.component';



@NgModule({
  declarations: [ServicesComponent, FeaturesComponent, TeamComponent, FaqComponent, PricingComponent, ContactComponent, FooterComponent, SwitcherComponent, ScrollspyDirective],
  imports: [
    CommonModule,
   
  ],
  exports: [ServicesComponent, FeaturesComponent, TeamComponent, FaqComponent, PricingComponent, ContactComponent, FooterComponent, SwitcherComponent, ScrollspyDirective]
})
export class HomePageComponentsModule { }
