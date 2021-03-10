import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { Participant } from 'app/main/apps/participants/participant.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-participant-form',
    templateUrl: './participant-form.component.html',
    styleUrls: ['./participant-form.component.scss'],
    encapsulation: ViewEncapsulation.None

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
        private _ParticipantsService: ParticipantsService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Participant';
            this.contact = _data.contact;
            this._ParticipantsService.entreprise = this.contact.entreprise;
            this._ParticipantsService.classe = this.contact.programInstance;
        }
        else {
            this.dialogTitle = 'Nouveau Participant';
            this.contact = new Participant({});
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
        return this._formBuilder.group({
            id: [this.contact.id],
            firstNameP: [this.contact.firstNameP],
            lastNameP: [this.contact.lastNameP],
            level: [this.contact.level, Validators.required],
            gender: [this.contact.gender, Validators.required],
            company: [this.contact.entreprise],
            classe: [this.contact.programInstance],
            currentPosition: [this.contact.currentPosition],
            email: [this.contact.email],
            phoneNumber: [this.contact.phoneNumber],
            street: [this.contact.street],
            city: [this.contact.city],
            postalCode: [this.contact.postalCode],
            birthday: [this.contact.birthday],
            notes: [this.contact.notes],
            educationLevel: [this.contact.educationLevel],
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



}