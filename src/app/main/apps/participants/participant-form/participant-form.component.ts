import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { Participant } from 'app/main/apps/participants/participant.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
    selector: 'app-participant-form',
    templateUrl: './participant-form.component.html',
    styleUrls: ['./participant-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
    
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],

})
export class ParticipantFormComponent {

    formErrorsP = {
        'firstNameP': '',
        'lastNameP': '',
        'level': '',
        'gender': '',
        'birthdateP': '',
        'educationLevel': ''
    };
    validationMessagesP = {

        'genderP': {
            'required': 'Sexe est obligatoire !',

        }

    }
    cities: string[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];


    action: string;
    contact: Participant;
    contactForm: FormGroup;
    dialogTitle: string;
    entreprises: any[];
    classes: any[];
    courses: any[];
    particpantType:string;
    chosenYearDate: Date;
    currentDate: Date ; 
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
        private _formBuilder: FormBuilder,
        private _ParticipantsService: ParticipantsService,
        private dateAdapter: DateAdapter<Date>

    ) {
        // Set the defaults
        this.action = _data.action;
        this.dateAdapter.setLocale('fr');
        this.currentDate=new Date()
        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Participant';
            this.contact = _data.contact;
            this._ParticipantsService.entreprise = this.contact.entreprise;
            this._ParticipantsService.classe = this.contact.programInstance;
            this.chosenYearDate= this.contact.birthday
        }
        else {
            this.dialogTitle = 'Nouveau Participant';
            this.contact = new Participant({});
            console.log("contact birthday")
            console.log(this.contact)


        
        }

        this.contactForm = this.createContactForm();
        this._unsubscribeAll = new Subject();
        this.entreprises = this._ParticipantsService.entreprises;
        this.classes = this._ParticipantsService.classes;
        console.log("FORM");
        console.log(this.contactForm.value)
        // this.courses = this._ParticipantsService.programs;


    }




    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        console.log("CONTACT");
        console.log(this.contact);
        return this._formBuilder.group({
            id: [this.contact.id],
            firstNameP: [this.contact.firstNameP,Validators.required],
            lastNameP: [this.contact.lastNameP,Validators.required],
            level: [this.contact.level, Validators.required],
            gender: [this.contact.gender, Validators.required],
            company: [this.contact.entreprise],
            classe: [this.contact.programInstance],
            currentPosition: [this.contact.currentPosition,Validators.required],
            experience : [this.contact.experience],
            email: [this.contact.email,Validators.required],
            phoneNumber: [this.contact.phoneNumber,Validators.required],
            street: [this.contact.street],
            city: [this.contact.city],
            postalCode: [this.contact.postalCode],
            birthday: [this.contact.birthday],
            notes: [this.contact.notes],
            educationLevel: [this.contact.educationLevel,Validators.required],
            particType:[''],

        });



    }

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


    // tslint:disable-next-line:typedef
    getEntrepriseForm(event) {

        this._ParticipantsService.entreprise = event;
    }
    // getGroupForm(event) {

    //     this._ParticipantsService.groupe = event;
    // }
    // tslint:disable-next-line:typedef
    getClasseForm(event) {

        this._ParticipantsService.classe = event;
    }

    sendType(event){
        this.contactForm.value.particType;
        this.particpantType=event;
        console.log( this.particpantType);
        this._ParticipantsService.participantType=event;
    }
    // getCursusForm(event) {

    //     this._ParticipantsService.cursus = event;
    // }
    chosenYearHandler(event, input){
        let { _d } = event;
        this.contactForm["birthday"] = _d;
        this.chosenYearDate=_d
        
        console.log(this.contactForm["birthday"])
        console.log(_d)
        input._destroyPopup()
      }





}