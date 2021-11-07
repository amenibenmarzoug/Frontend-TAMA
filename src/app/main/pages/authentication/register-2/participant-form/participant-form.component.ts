import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/main/pages/authentication/common-authentication/authentication.service'
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service'


@Component({
    selector: 'app-participant-form',
    templateUrl: './participant-form.component.html',
    styleUrls: ['./participant-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ParticipantFormComponent implements OnInit {
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];
    registerForm: FormGroup;
    rForm: FormGroup;
    ParticipantForm: FormGroup;
    errorMessage = '';
    isSuccessful = false;
    isFailed = false;
    classes: any[];
    particpantType: string;
    formErrors = {
        'firstNameP': '',
        'lastNameP': '',
        'phoneNumber': '',
        'email': '',
        'gender': '',
        'birthday': '',
        'street':'',
        'city':'',
        'postalCode':'',
        'experience':'',
        'classe':'',
        'educationLevel':'',
        'currentPosition':'',
        'level':''
    };

    validationMessages = {
        'firstNameP': {
            'required': 'Le prénom est requis.',
            'minlength': 'La longueur du prénom doit être supérieure à 2.',
      
          },
          'lastNameP': {
            'required': 'Le nom est requis.',
            'minlength': 'La longueur du nom doit être supérieure à 2.',
      
        },
       
       
      
          'phoneNumber': {
            'required': 'Le numéro de télépohne est requis.',
            'pattern': 'Le numéro ne doit contenir que des chiffres.'
          },
          'email': {
            'required': 'L\'adresse email est requise',
            'email': 'Veuillez donner un format valide'
          },
      
          'gender': {
            'required': 'Le sexe est requis.',
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
          'birthday': {
            'required': 'La date de naissance est requise.',
          },
          'classe': {
            'required': 'La classe est requise.',
          },
          'level': {
            'required': 'Le niveau management est requis.',
          },
          'educationlevel': {
            'required': 'Le niveau d\'éducation est requis.',
          },
          'currentPosition': {
            'required': 'Le poste professionnel est requis.',
          },
          'experience': {
            'required': 'Le nombre d\'années d\'expérience profesionnelle est requis.',
          },
         
        };

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private registerService: Register2Service,
        private authService: AuthenticationService,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerService.getClasses();
        this.registerForm = new FormGroup({

            // Create skills form group
            rForm: new FormGroup({
                firstNameP: new FormControl(),
                lastNameP: new FormControl(),
                phoneNumber: new FormControl(),
                email: new FormControl(),
                gender: new FormControl(),
                classe: new FormControl(),
                city: new FormControl(),
                street: new FormControl(),
                postalCode: new FormControl(),
                state: new FormControl(),
                birthday: new FormControl(),
                educationLevel: new FormControl(),
                currentPosition: new FormControl(),
                experience: new FormControl(),
                level: new FormControl(),
            }),

        });

        this.registerService.onClassesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(classes => {
                this.classes = classes;
            });
    }

    /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
    createForm(): void {
        const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
        const phone = '^[\+]?[0-9]*$';
        const code = '^[0-9]*$'
        this.rForm = this._formBuilder.group({
            firstNameP: ['', [Validators.required, Validators.minLength(2)]],
            lastNameP: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern(phone)]],
            street: ['', Validators.required],
            gender: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.pattern(code)]],
            classe: ['', Validators.required],
            birthday: ['', Validators.required],
            educationLevel: ['', Validators.required],
            currentPosition: ['', Validators.required],
            experience: ['', Validators.required],
            level: ['', Validators.required]

        });







        this.rForm.valueChanges
            .subscribe(data => this.onValueChangedP(data));

        //this.onValueChanged();


    }

    onSubmit() {
        /*this.feedback = this.feedbackForm.value;
        console.log(this.feedback);
        this.feedbackservice.submitFeedback(this.feedback)
        .subscribe(feedback => {
          this.feedback = feedback; 
        });
            console.log(this.TrainerForm.value);
            console.log("data TRAINER FORM");
            console.log(this.TrainerForm);*/
        console.log("data USER FORM");
        console.log(this.rForm);

        this.authService.registerParticipant(this.rForm).subscribe(
            data => {
                console.log("data on submit");
                console.log(data);
                this.isSuccessful = true;
                this.isFailed = false;
                this.rForm.reset({
                    phoneNumber: '',
                    email: '',
                    street: '',
                    city: '',
                    postalCode: '',
                    firstNameP: '',
                    lastNameP: '',
                    classe: ''
                });

            },
            err => {
                console.log("Request FAILED");
                this.errorMessage = err.error.message;
                this.isSuccessful = false;
                this.isFailed = true;
            });


            

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    sendClasse(event) { }


    formValidation(): any {

        if (this.rForm.valid) {
            return true;
        }

        else {

            return false;
        }
    }

    onValueChangedP(data?: any) {
        if (!this.ParticipantForm) { return; }
        const form = this.ParticipantForm;
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


}
