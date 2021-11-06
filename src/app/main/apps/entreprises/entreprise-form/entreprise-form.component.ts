import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntreprisesService } from 'app/main/apps/entreprises/entreprises.service';
import { Enterprise } from 'app/shared/models/enterprise.model';
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
    enterprise: Enterprise;
    enterpriseForm: FormGroup;
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
     * @param {EntreprisesService} _EnterprisesService
     */
    constructor(
        public matDialogRef: MatDialogRef<EntrepriseFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _EnterprisesService: EntreprisesService,
       

    ) {
        this.classes = this._EnterprisesService.classes;
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Entreprise';
            this.enterprise = _data.contact;
            console.log("edit");
            console.log( _data)
            this.classe= this.enterprise.programInstance ; 
            this.prestataireDeSalle=this.enterprise.provider
        }
        else {
            this.dialogTitle = 'Nouvelle Entreprise';
            this.enterprise = new Enterprise({});
        }

        this.enterpriseForm = this.createEnterpriseForm();
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
<<<<<<< HEAD
        this.enterpriseForm.get('programInstance').setValue(toSelect);
        console.log(this.enterpriseForm.get('programInstance'))
        }
=======
        this.contactForm.get('programInstance').setValue(toSelect);
        console.log(this.contactForm.get('programInstance'))
        }*/
>>>>>>> 62cac3954dac529c2574018fd5da6e1226874c81
    
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
    createEnterpriseForm(): FormGroup {

        const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
        const phone = '^[0-9]*$';
        const code = '^[0-9]*$';
        console.log("create");
        console.log(this.enterprise)
        return this._formBuilder.group({
            id: [this.enterprise.id],
            enterpriseName: [this.enterprise.enterpriseName, [Validators.required, Validators.minLength(2)]],
            email: [this.enterprise.email, [Validators.required, Validators.email]],
            phoneNumber: [this.enterprise.phoneNumber, [Validators.required, Validators.pattern(phone)]],
            //   address : [this.contact.address],
            managerFirstName: [this.enterprise.managerFirstName, [Validators.required, Validators.minLength(2)]],
            managerLastName: [this.enterprise.managerLastName, [Validators.required, Validators.minLength(2)]],
            managerPosition: [this.enterprise.managerPosition, [Validators.required, Validators.minLength(2)]],
            street: [this.enterprise.street, Validators.required],
            city: [this.enterprise.city, Validators.required],
            programInstance: [this.enterprise.programInstance],
            postalCode: [this.enterprise.postalCode, [Validators.required, Validators.pattern(code)]],
            website: [this.enterprise.website, [Validators.required, Validators.pattern(url)]],
            //password :[this.contact.phoneNumber],
            nbMinParticipants:[this.enterprise.nbMinParticipants, [Validators.pattern(code)]],
            notes: [this.enterprise.notes],
            provider: [this.enterprise.provider, Validators.required],
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
<<<<<<< HEAD
        this._EnterprisesService.classe = event;
=======
        console.log("send classe")
        this._ParticipantsService.classe = event;
        console.log(event);
        this.contactForm.patchValue({programInstance:event});
        console.log(this.contactForm.getRawValue());
>>>>>>> 62cac3954dac529c2574018fd5da6e1226874c81
    }

    selectProvider(event){
        console.log(event);
        this.enterpriseForm.patchValue({provider:event});
    }

    onValueChanged(data?: any) {
        if (!this.enterpriseForm) { return; }
        const form = this.enterpriseForm;
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



