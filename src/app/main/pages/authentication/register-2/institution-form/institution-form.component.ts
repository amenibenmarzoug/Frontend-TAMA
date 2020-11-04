import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/main/pages/authentication/common-authentication/authentication.service'

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class InstitutionFormComponent implements OnInit, OnDestroy {
  cities: String[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

  ];
  specifications: String[] = [
    'Soft Skills', 'Management', 'LEAN'
  ];

  registerForm: FormGroup;
  rForm: FormGroup;
  ParticipantForm: FormGroup;
  TrainerForm: FormGroup;
  EntrepriseForm: FormGroup;
  InstitutionForm: FormGroup;
  participant: string;
  entreprise: string;
  institution: string;
  trainer: string;
  visibParticipant: boolean;
  visibEntreprise: boolean;
  visibInstitution: boolean;
  visibTrainer: boolean;
  selectedOption: any;

  formErrors = {

    'phoneNumber': '',
    'email': '',
    'name': '',
    'userRole': '',
    'password': '',
    'passwordConfirm': '',
    'city': '',
    'street': '',
    'postalCode': '',
    'state': '',

  };

  formErrorsP = {
    'firstNameP': '',
    'lastNameP': '',

    'genderP': '',
    'birthdateP': ''
  };


  formErrorsT = {
    'firstNameT': '',
    'lastNameT': '',
    'specification': '',
    'genderT': '',

  };


  formErrorsE = {

    'nameE': '',
    'webSite': '',

  };


  formErrorsI = {

    'nameI': '',

  };

  validationMessagesP = {
    'firstNameP': {
      'required': 'Le prénom est requis.',
      'minlength': 'La longueur du prénom doit être supérieure à 2.',

    },
    'lastNameP': {
      'required': 'Le nom est requis.',
      'minlength': 'La longueur du nom doit être supérieure à 2.',

    },
    'genderP': {
      'required': 'Le sexe est requis.',

    },

    'birthdateP': {
      'required': 'La date de naissance est requise',



    },
  }

  validationMessagesI = {
    'nameI': {
      'required': 'Le nom de l\'institution est requis.',
      'minlength': 'La longueur du nom doit être supérieure à 2.',

    },
  }

  validationMessagesT = {
    'firstNameT': {
      'required': 'Le prénom est requis.',
      'minlength': 'La longueur du prénom doit être supérieure à 2.',

    },
    'lastNameT': {
      'required': 'Le nom est requis.',
      'minlength': 'La longueur du prénom doit être supérieure à 2.',

    },
    'genderT': {
      'required': 'Le sexe est requis.',

    },
    'specification': {
      'required': 'La spécialité est requise.',
    },
  }

  validationMessagesE = {
    'nameE': {
      'required': 'Le nom de l\'entreprise est requis',
      'minlength': 'La longueur du nom doit être supérieure à 2',

    },

    'webSite': {
      'required': 'Le site web est requis',
      'pattern': 'Veuillez donner une URL valide'

    },
  }


  validationMessages = {


    'phoneNumber': {
      'required': 'Le numéro de télépohne est requis.',
      'pattern': 'Le numéro ne doit contenir que des chiffres.'
    },
    'email': {
      'required': 'L\'adresse email est requise',
      'email': 'Veuillez donner un format valide'
    },

    'userRole': {
      'required': 'Le role d\'utlisateur est requis.',



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


  };

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder, private authService: AuthenticationService
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
    this.registerForm = new FormGroup({

      // Create skills form group
      rForm: new FormGroup({
        phoneNumber: new FormControl(),
        email: new FormControl(),
        name: new FormControl(),
        userRole: new FormControl(),
        password: new FormControl(),
        passwordConfirm: new FormControl(),
        city: new FormControl(),
        street: new FormControl(),
        postalCode: new FormControl(),
        state: new FormControl(),
      }),
      ParticipantForm: new FormGroup({

        firstNameP: new FormControl(),
        lastNameP: new FormControl(),
        genderP: new FormControl(),
        birthdateP: new FormControl(),
      }),
      InstitutionForm: new FormGroup({
        nameI: new FormControl(),
      }),
      TrainerForm: new FormGroup({
        firstNameT: new FormControl(),
        lastNameT: new FormControl(),
        genderT: new FormControl(),
        specification: new FormControl(),
      }),
      EntrepriseForm: new FormGroup({
        nameE: new FormControl(),
        webSite: new FormControl(),
      })
    });
  }

  createForm() {

    const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
    const phone = '^[0-9]*$';
    const code = '^[0-9]*$'
    this.rForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phone)]],
      userRole: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(code)]],

    });

    this.ParticipantForm = this._formBuilder.group({

      firstNameP: ['', [Validators.required, Validators.minLength(2)]],
      lastNameP: ['', [Validators.required, Validators.minLength(2)]],
      genderP: ['', Validators.required],
      birthdateP: ['', Validators.required]
    });

    this.TrainerForm = this._formBuilder.group({

      firstNameT: ['', [Validators.required, Validators.minLength(2)]],
      lastNameT: ['', [Validators.required, Validators.minLength(2)]],
      genderT: ['', Validators.required],
      specification: ['', Validators.required],
    });

    this.EntrepriseForm = this._formBuilder.group({
      nameE: ['', [Validators.required, Validators.minLength(2)]],
      webSite: ['', [Validators.required, Validators.pattern(url)]],
    });

    this.InstitutionForm = this._formBuilder.group({
      nameI: ['', [Validators.required, Validators.minLength(2)]],
    });



    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes


    this.rForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.ParticipantForm.valueChanges
      .subscribe(dataP => this.onValueChangedP(dataP));

    this.TrainerForm.valueChanges
      .subscribe(dataT => this.onValueChangedT(dataT));

    this.EntrepriseForm.valueChanges
      .subscribe(dataE => this.onValueChangedE(dataE));

    this.InstitutionForm.valueChanges
      .subscribe(dataI => this.onValueChangedI(dataI));

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
    if (this.rForm.value.userRole == "Trainer") {
      this.authService.registerTrainer(this.TrainerForm, this.rForm).subscribe(
        data => {
          console.log("data on submit");
          console.log(data);


        });
    }
    else
      if (this.rForm.value.userRole == "Institution") {
        console.log("Institution name");
        console.log(this.InstitutionForm.value.nameI);
        this.authService.registerInstitution(this.InstitutionForm, this.rForm).subscribe(
          data => {
            console.log("data on submit");
            console.log(data);


          });
      }
      else
        if (this.rForm.value.userRole == "Entreprise") {
          this.authService.registerEnterprise(this.EntrepriseForm, this.rForm).subscribe(
            data => {
              console.log("data on submit");
              console.log(data);


            });
        }
        else
          if (this.rForm.value.userRole == "Participant") {
            this.authService.registerParticipant(this.ParticipantForm, this.rForm).subscribe(
              data => {
                console.log("data on submit");
                console.log(data);


              });
          }



    this.rForm.reset({
      phoneNumber: '',
      email: '',
      name: '',
      userRole: '',
      password: '',
      passwordConfirm: '',
      street: '',
      city: '',
      postalCode: '',
    });
    this.ParticipantForm.reset({

      firstNameP: '',
      lastNameP: '',
      genderP: '',
      birthdateP: '',
    });
    this.InstitutionForm.reset({
      nameI: '',
    });
    this.TrainerForm.reset({
      firstNameT: '',
      lastNameT: '',
      genderT: '',
      specification: '',
    });
    this.EntrepriseForm.reset({
      nameE: '',
      webSite: '',
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

  selectedMethod(event): void {

    switch (event.value) {
      case "Participant": {
        this.participant = event.value;
        this.visibParticipant = true;
        this.visibEntreprise = this.visibInstitution = this.visibTrainer = false;

        break;
      }
      case "Entreprise": {
        this.entreprise = event.value;
        this.visibEntreprise = true;
        this.visibParticipant = this.visibInstitution = this.visibTrainer = false;

        break;
      }
      case "Institution": {
        this.institution = event.value;
        this.visibInstitution = true;
        this.visibParticipant = this.visibEntreprise = this.visibTrainer = false;


        break;
      }
      case "Trainer": {
        this.trainer = event.value;
        this.visibTrainer = true;
        this.visibParticipant = this.visibInstitution = this.visibEntreprise = false;


        break;
      }


    }
  }

  formValidation(): any {

    if (this.rForm.valid && ((this.ParticipantForm.valid && this.visibParticipant) || (this.EntrepriseForm.valid && this.visibEntreprise) || (this.InstitutionForm.valid && this.visibInstitution) || (this.TrainerForm.valid && this.visibTrainer))) {

      return true;
    }

    else {

      return false;
    }
  }

  onValueChanged(data?: any) {
    if (!this.rForm) { return; }
    const form = this.rForm;
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
  onValueChangedP(data?: any) {
    if (!this.ParticipantForm) { return; }
    const form = this.ParticipantForm;
    for (const field in this.formErrorsP) {
      if (this.formErrorsP.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorsP[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessagesP[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorsP[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onValueChangedT(data?: any) {
    if (!this.TrainerForm) { return; }
    const form = this.TrainerForm;
    for (const field in this.formErrorsT) {
      if (this.formErrorsT.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorsT[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessagesT[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorsT[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onValueChangedE(data?: any) {
    if (!this.EntrepriseForm) { return; }
    const form = this.EntrepriseForm;
    for (const field in this.formErrorsE) {
      if (this.formErrorsE.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorsE[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessagesE[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorsE[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onValueChangedI(data?: any) {
    if (!this.InstitutionForm) { return; }
    const form = this.InstitutionForm;
    for (const field in this.formErrorsI) {
      if (this.formErrorsI.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorsI[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessagesI[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorsI[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}



/**
* Confirm password validator
*
* @param {AbstractControl} control
* @returns {ValidationErrors | null}
*/
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
