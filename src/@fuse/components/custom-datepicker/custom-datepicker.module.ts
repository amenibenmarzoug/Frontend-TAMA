import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from'@angular/material-moment-adapter';
import { CustomDatepickerComponent } from './custom-datepicker.component';
import { YearPickerComponentComponent } from './year-picker-component/year-picker-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [CustomDatepickerComponent, YearPickerComponentComponent],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
  ],
  exports: [
    CustomDatepickerComponent,
  ],
})
export class CustomDatepickerModule { }
