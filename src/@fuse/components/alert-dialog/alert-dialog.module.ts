import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';



@NgModule({
  declarations: [AlertDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule
],
entryComponents: [
  AlertDialogComponent
],
})
export class AlertDialogModule { }
