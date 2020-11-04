import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl }from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { Contact } from 'app/main/apps/participants/participant.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
  encapsulation: ViewEncapsulation.None 
 
})
export class ParticipantFormComponent{

  action: string;
  contact: Contact;
  contactForm: FormGroup;
  dialogTitle: string;
  entreprises:any[] ;
  groups:any[];
  courses:any[];
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {MatDialogRef<ParticipantFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   * @param {ParticipantsService} _ParticipantsService
   */
  constructor(
      public matDialogRef: MatDialogRef<ParticipantFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder ,
      private _ParticipantsService : ParticipantsService 
  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Participant';
          this.contact = _data.contact;
          this._ParticipantsService.entreprise=this.contact.entreprise;
          this._ParticipantsService.groupe=this.contact.groupe;
          this._ParticipantsService.cursus=this.contact.cursus;
      }
      else
      {
          this.dialogTitle = 'Nouveau Participant';
          this.contact = new Contact({});
      }

      this.contactForm = this.createContactForm();
      this._unsubscribeAll = new Subject();
     this.entreprises=this._ParticipantsService.entreprises;
     this.groups = this._ParticipantsService.groups;
     this.courses=this._ParticipantsService.programs;
     
     
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
          firstNameP    : [this.contact.firstNameP],
          lastNameP: [this.contact.lastNameP],
          level: [this.contact.level, Validators.required],
          gender: [this.contact.gender, Validators.required],
          company : [this.contact.entreprise],
          groupe: [this.contact.groupe],
          cursus:[this.contact.cursus],
          currentPosition: [this.contact.currentPosition],
          email   : [this.contact.email],
          phoneNumber   : [this.contact.phoneNumber],
        //   address : [this.contact.address],
          street :[this.contact.street],
          city    : [this.contact.city],
          postalCode: [this.contact.postalCode],
          birthday: [this.contact.birthday],
          //password :[this.contact.phoneNumber],
          notes   : [this.contact.notes] ,
          educationLevel : [this.contact.educationLevel]

      });



    }
    formErrorsP = {
        'firstNameP': '',
        'lastNameP': '',
        'level' :'' , 
        'gender': '',
        'birthdateP': '' ,
        'educationLevel':''
    };
    
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
            'required': 'Sexe est obligatoire !',

        }

    }
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba','Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan','Kasserine','Sidi Bouzid', 'Gabès', 'Mednine','Tataouine','Gafsa','Tozeur','Kebili'
        
      ];


      getEntrepriseForm(event){
     
        this._ParticipantsService.entreprise=event;          
  }
  getGroupForm(event){
     
    this._ParticipantsService.groupe=event;          
}
getCursusForm(event){
     
  this._ParticipantsService.cursus=event;          
}
  


}