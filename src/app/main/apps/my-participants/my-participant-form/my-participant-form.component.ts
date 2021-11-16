import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { Participant } from 'app/shared/models/participant.model';
import { MyParticipantsService } from '../my-participants.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-my-participant-form',
  templateUrl: './my-participant-form.component.html',
  styleUrls: ['./my-participant-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],


})
export class MyParticipantFormComponent {

  action: string;
  contact: Participant;
  contactForm: FormGroup;
  dialogTitle: string;
  chosenYearDate: Date;
  currentDate: Date;
  classes: any[];



  /**
   * Constructor
   *
   * @param {MatDialogRef<MyParticipantFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<MyParticipantFormComponent>,
    private _participantsService: MyParticipantsService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Set the defaults
    this.action = _data.action;
    this.dateAdapter.setLocale('fr');
    this.currentDate = new Date()

    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier Participant ';
      this.contact = _data.contact;
      this.chosenYearDate= this.contact.birthday

    }
    else {
      this.dialogTitle = 'Ajouter Participant';
      this.contact = new Participant({});

    }
    this._participantsService.onClassesChanged.subscribe(classes=>{
      this.classes=classes;
    })

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
  createContactForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.contact.id],
      firstNameP: [this.contact.firstNameP, Validators.required],
      lastNameP: [this.contact.lastNameP, Validators.required],
      level: [this.contact.level, Validators.required],
      gender: [this.contact.gender, Validators.required],
      company: [this.contact.entreprise],
      currentPosition: [this.contact.currentPosition, Validators.required],
      email: [this.contact.email, Validators.required],
      phoneNumber: [this.contact.phoneNumber, Validators.required],
      programInstance: [this.contact.programInstance],
      //   address : [this.contact.address],
      street: [this.contact.street, Validators.required],
      city: [this.contact.city, Validators.required],
      postalCode: [this.contact.postalCode, Validators.required],
      birthday: [this.contact.birthday, Validators.required],
      //password :[this.contact.phoneNumber],
      notes: [this.contact.notes],
      educationLevel: [this.contact.educationLevel, Validators.required]

    });



  }

  getClasseForm(event) {

    this.contactForm.patchValue({ classe: event });
    console.log(this.contactForm.getRawValue())
    //this._ParticipantsService.classe = event;
  }

  formErrorsP = {
    'firstNameP': '',
    'lastNameP': '',
    'level': '',
    'gender': '',
    'birthdateP': ''
  };
  // console.log(this.contact.phoneNumber) ;
  onValueChangedP(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
    for (const field in this.contactForm) {
      if (this.contactForm.hasOwnProperty(field)) {
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

  chosenYearHandler(event, input) {
    let { _d } = event;
    this.contactForm["birthday"] = _d;
    this.chosenYearDate = _d
    this.chosenYearDate.setMonth(1);
    this.contactForm["birthday"] = this.chosenYearDate;
    console.log(this.contactForm["birthday"])
    console.log(_d)
    input._destroyPopup()
  }
  validationMessagesP = {

    'genderP': {
      'required': 'Gender is required.',

    }
  }
  cities: String[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

  ];

}



