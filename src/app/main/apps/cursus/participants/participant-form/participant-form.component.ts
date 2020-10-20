import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl }from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

  
import { MyParticipant } from 'app/main/apps/cursus/participants/participant.model';
@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
  encapsulation: ViewEncapsulation.None


})
export class ParticipantFormComponent{

  action: string;
  contact:MyParticipant;
  contactForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialogRef<MyParticipantFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      public matDialogRef: MatDialogRef<ParticipantFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder
  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Participant ';
          this.contact = _data.contact;
      }
      else
      {
          this.dialogTitle = 'Ajouter Participant';
          this.contact = new MyParticipant({});
          
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
          firstNameP    : [this.contact.firstNameP, Validators.required],
          lastNameP: [this.contact.lastNameP, Validators.required],
          level: [this.contact.level, Validators.required],
          gender: [this.contact.gender, Validators.required],
          company : [this.contact.entreprise],
          currentPosition: [this.contact.currentPosition, Validators.required],
          email   : [this.contact.email, Validators.required],
          phoneNumber   : [this.contact.phoneNumber, Validators.required],
        //   address : [this.contact.address],
          street :[this.contact.street, Validators.required],
          city    : [this.contact.city, Validators.required],
          postalCode: [this.contact.postalCode, Validators.required],
          birthday: [this.contact.birthday, Validators.required],
          //password :[this.contact.phoneNumber],
          notes   : [this.contact.notes] ,
          educationLevel : [this.contact.educationLevel, Validators.required]

      });



    }
    formErrorsP = {
        'firstNameP': '',
        'lastNameP': '',
        'level' :'' , 
        'gender': '',
        'birthdateP': ''
    };
     // console.log(this.contact.phoneNumber) ;
     onValueChangedP(data?: any) {
        if (! this.contactForm) { return; }
        const form =  this.contactForm;
        for (const field in  this.contactForm) {
            if ( this.contactForm.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.contactForm[field] = '';
                const control = form.get(field);
               // console.log(control)
                if (control && (control.dirty || control.touched) && !control.valid) {
                    const messages = this.validationMessagesP[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.contactForm[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    } 
    validationMessagesP = {

        'genderP': {
            'required': 'Gender is required.',

        }
    }
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba','Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan','Kasserine','Sidi Bouzid', 'Gabès', 'Mednine','Tataouine','Gafsa','Tozeur','Kebili'
        
      ];

  }
  



