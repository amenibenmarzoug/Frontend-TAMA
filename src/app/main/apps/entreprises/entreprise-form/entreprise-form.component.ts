import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl }from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntreprisesService } from 'app/main/apps/entreprises/entreprises.service';
import { Entreprise } from 'app/main/apps/entreprises/entreprise.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss'],
  encapsulation: ViewEncapsulation.None 
 
})
export class EntrepriseFormComponent{

  action: string;
  contact: Entreprise;
  contactForm: FormGroup;
  dialogTitle: string;
  entreprises:any[] ;
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {MatDialogRef<ParticipantFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   * @param {EntreprisesService} _ParticipantsService
   */
  constructor(
      public matDialogRef: MatDialogRef<EntrepriseFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder ,
      private _ParticipantsService : EntreprisesService 
  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Entreprise';
          this.contact = _data.contact;
      }
      else
      {
          this.dialogTitle = 'Nouvelle Entreprise';
          this.contact = new Entreprise({});
      }

      this.contactForm = this.createContactForm();
      this._unsubscribeAll = new Subject();
   
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

//ngOnInit() : void {

    //this.entreprises=this._ParticipantsService.entreprises;

    //this._ParticipantsService.onContactsChanged
    //.pipe(takeUntil(this._unsubscribeAll))
    //.subscribe(entreprises => {
      //  this.entreprises = entreprises;
        
    //    console.log(this.entreprises);
  //  });
//}



  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.contact.id],
          enterpriseName :[this.contact.enterpriseName] ,
          email   : [this.contact.email],
          phoneNumber   : [this.contact.phoneNumber],
        //   address : [this.contact.address],
          street :[this.contact.street],
          city    : [this.contact.city],
          postalCode: [this.contact.postalCode],
          website: [this.contact.website],
          //password :[this.contact.phoneNumber],
          notes   : [this.contact.notes] 
       

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
  


