import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent  {

  public dialogMessage: string;

 
    /**
     * Constructor
     *
     * @param {MatDialogRef<AlertDialogComponent>} dialogRef
     */
    constructor(
      public dialogRef: MatDialogRef<AlertDialogComponent>
  )
  {
  }

}
