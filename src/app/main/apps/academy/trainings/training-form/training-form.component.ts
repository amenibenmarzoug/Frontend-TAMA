import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Training } from 'app/main/apps/academy/trainings/training.model';


@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent  {
  action: string;
    contact: Training;
    contactForm: FormGroup;
    dialogTitle: string;

  /**
     * Constructor
     *
     * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      public matDialogRef: MatDialogRef<TrainingFormComponent >,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder
  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Formation';
          this.contact = _data.contact;
           
          this.contact.cursus=_data.contact.cursus ; 
          console.log("cursus eli teba33") ;
          console.log(this.contact.cursus) ;

      }
      else
      {
          this.dialogTitle = 'Nouvelle Formation';
        //  this.contact.cursus=_data.course;
        //  console.log("foreign key te3 hetha") ; 
         // console.log(this.contact.cursus) ; 
          this.contact = new Training({});
         // this.contact.cursus=_data.foreignKeyCursus ; 


      }

      this.contactForm = this.createContactForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.contact.id],
          courseName   : [this.contact.courseName],
          content : [this.contact.content],
          theme: [this.contact.theme],
          nbmaxParticipants  : [this.contact.nbmaxParticipants],
          fees: [this.contact.fees],
          cursus:[this.contact.cursus],
         
      });
  }
}
