import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntreprisesService } from 'app/main/apps/entreprises/entreprises.service';
import { Entreprise } from 'app/main/apps/entreprises/entreprise.model';
import { Subject } from 'rxjs';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-entreprise-form',
    templateUrl: './entreprise-form.component.html',
    styleUrls: ['./entreprise-form.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EntrepriseFormComponent implements OnInit {
    alertDialog: MatDialogRef<AlertDialogComponent>;
    action: string;
    contact: Entreprise;
    contactForm: FormGroup;
    dialogTitle: string;
    entreprises: any[];
    classes: any[];
    classe : any ; 
    prestataireDeSalle: any ; 
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
        private _formBuilder: FormBuilder,
        private _ParticipantsService: EntreprisesService,
       

    ) {
        this.classes = this._ParticipantsService.classes;
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Entreprise';
            this.contact = _data.contact;
            console.log("edit");
            console.log( _data)
            this.classe= this.contact.programInstance ; 
            this.prestataireDeSalle=this.contact.provider
        }
        else {
            this.dialogTitle = 'Nouvelle Entreprise';
            this.contact = new Entreprise({});
        }

        this.contactForm = this.createContactForm();
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
    
        /*console.log("onInit")
        console.log("this.classee  in init")
        console.log(this.classe)
        console.log (this.prestataireDeSalle)
        if ((this.classe !== undefined) &&(this.classe!=null))
        {
        const toSelect = this.classes.find(p => p.id == this.classe.id);
        this.contactForm.get('programInstance').setValue(toSelect);
        console.log(this.contactForm.get('programInstance'))
        }*/
    
      }
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
    createContactForm(): FormGroup {

        const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
        const phone = '^[0-9]*$';
        const code = '^[0-9]*$';
        console.log("create");
        console.log(this.contact)
        return this._formBuilder.group({
            id: [this.contact.id],
            enterpriseName: [this.contact.enterpriseName, [Validators.required, Validators.minLength(2)]],
            email: [this.contact.email, [Validators.required, Validators.email]],
            phoneNumber: [this.contact.phoneNumber, [Validators.required, Validators.pattern(phone)]],
            //   address : [this.contact.address],
            managerFirstName: [this.contact.managerFirstName, [Validators.required, Validators.minLength(2)]],
            managerLastName: [this.contact.managerLastName, [Validators.required, Validators.minLength(2)]],
            managerPosition: [this.contact.managerPosition, [Validators.required, Validators.minLength(2)]],
            street: [this.contact.street, Validators.required],
            city: [this.contact.city, Validators.required],
            programInstance: [this.contact.programInstance],
            postalCode: [this.contact.postalCode, [Validators.required, Validators.pattern(code)]],
            website: [this.contact.website, [Validators.required, Validators.pattern(url)]],
            //password :[this.contact.phoneNumber],
            nbMinParticipants:[this.contact.nbMinParticipants, [Validators.pattern(code)]],
            notes: [this.contact.notes],
            provider: [this.contact.provider, Validators.required],
            /*   id: [this.contact.id],
             enterpriseName: [this.contact.enterpriseName, [Validators.required, Validators.minLength(2)]],
             email: [this.contact.email],
             phoneNumber: [this.contact.phoneNumber],
             //   address : [this.contact.address],
             managerFirstName: [this.contact.managerFirstName],
             managerLastName: [this.contact.managerLastName],
             street: [this.contact.street],
             city: [this.contact.city],
             classe:[this.contact.programInstance],
             postalCode: [this.contact.postalCode],
             website: [this.contact.website],
             //password :[this.contact.phoneNumber],
             notes: [this.contact.notes]  */


        });



    }
    formErrors = {
        'managerFirstName': '',
        'managerLastName': '',
        'phoneNumber': '',
        'email': '',
        'enterpriseName': '',
        'classe': '',
        'password': '',
        'passwordConfirm': '',
        'city': '',
        'street': '',
        'postalCode': '',
        'state': '',
        'nameE': '',
        'webSite': '',
        'positionM':'',
        'participNumber':'',

    };

  

    validationMessages = {
        'managerFirstName': {
            'required': 'Le prénom est requis.',
            'minlength': 'La longueur du prénom doit être supérieure à 2.',

        },
        'managerLastName': {
            'required': 'Le nom est requis.',
            'minlength': 'La longueur du nom doit être supérieure à 2.',

        },
        'positionM': {
            'required': 'Le poste est requis',
            'minlength': 'La longueur du poste doit être supérieure à 2',
      
          },
        'enterpriseName': {
            'required': 'Le nom de l\'entreprise est requis',
            'minlength': 'La longueur du nom doit être supérieure à 2',

        },

        'webSite': {
            'required': 'Le site web est requis',
            'pattern': 'Veuillez donner une URL valide'

        },

        'phoneNumber': {
            'required': 'Le numéro de télépohne est requis.',
            'pattern': 'Le numéro ne doit contenir que des chiffres.'
        },
        'email': {
            'required': 'L\'adresse email est requise',
            'email': 'Veuillez donner un format valide'
        },


        'password': {
            'required': 'Le mot de passe est requis.',
            'minlength': 'Le mot de passe doit contenir au moins six caractères.',

        },
        'passwordConfirm': {
            'required': 'Le mot de passe est requis.',
            //'confirmPasswordValidator': 'Passwords must match',
            'passwordsNotMatching': 'Veuillez vérifier le mot de passe'

        },
        'city': {
            'required': 'La ville est requise.',
        },
        'street': {
            'required': 'La rue est requise.',
        },
        'postalCode': {
            'required': 'Le code postal est requis.',
            'pattern': 'Le code postal ne doit contenir que des chiffres.'
        },
        'classe': {
            'required': 'La classe est requise.',
        },
        'participNumber':{
            'required': 'Le nombre de participants est requis.',
            'pattern': 'Le nombre de participants ne doit contenir que des chiffres.'
          }

    };

    sendClasse(event) {
        console.log("send classe")
        this._ParticipantsService.classe = event;
        console.log(event);
        this.contactForm.patchValue({programInstance:event});
        console.log(this.contactForm.getRawValue());
    }

    selectProvider(event){
        console.log(event);
        this.contactForm.patchValue({provider:event});
    }

    onValueChanged(data?: any) {
        if (!this.contactForm) { return; }
        const form = this.contactForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && (control.dirty || control.touched) && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];

}



