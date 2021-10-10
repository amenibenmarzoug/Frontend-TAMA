import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/main/pages/authentication/common-authentication/authentication.service'
import { Register2Service } from 'app/main/pages/authentication/register-2/register-2.service'


@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EntrepriseFormComponent implements OnInit, OnDestroy {
  cities: String[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

  ];
  registerForm: FormGroup;
  rForm: FormGroup;
  errorMessage = '';
  isSuccessful = false;
  isFailed = false;
  
  participant: string;
  entreprise: string;
  institution: string;
  trainer: string;
  visibParticipant: boolean;
  visibEntreprise: boolean;
  visibInstitution: boolean;
  visibTrainer: boolean;
  selectedOption: any;
  classes: any[];

  formErrors = {
    'firstNameP': '',
    'lastNameP': '',
    'phoneNumber': '',
    'email': '',
    'name': '',
    'classe':'',
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
    'provider':''

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
    'positionM': {
      'required': 'Le poste est requis',
      'minlength': 'La longueur du poste doit être supérieure à 2',

    },
    'nameE': {
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
    'provider': {
      'required': 'Ce champ est requis.',
    },
    'participNumber':{
      'required': 'Le nombre de participants est requis.',
      'pattern': 'Le nombre de participants ne doit contenir que des chiffres.'
    }
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder, private authService: AuthenticationService, 
    private registerService:Register2Service
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
        name: new FormControl(),
        classe: new FormControl(),
        password: new FormControl(),
        passwordConfirm: new FormControl(),
        city: new FormControl(),
        street: new FormControl(),
        postalCode: new FormControl(),
        state: new FormControl(),
        nameE: new FormControl(),
        webSite: new FormControl(),
        positionM:new FormControl(),
        participNumber:new FormControl(),
        provider: new FormControl(),
      
      }),

    });

    this.registerService.onClassesChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(classes => {
        this.classes = classes;
    });
  }

  createForm() {

    const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
    const phone = '^[0-9]*$';
    const code = '^[0-9]*$'
    this.rForm = this._formBuilder.group({
      firstNameP: ['', [Validators.required, Validators.minLength(2)]],
      lastNameP: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phone)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(code)]],
      positionM: ['', [Validators.required, Validators.minLength(2)]],
      nameE: ['', [Validators.required, Validators.minLength(2)]],
      webSite: ['', [Validators.required, Validators.pattern(url)]],
      classe: ['',Validators.required],
      participNumber:['', [Validators.required, Validators.pattern(code)]],
      provider: ['',Validators.required],
    });




    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes


    this.rForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    //this.onValueChanged();


  }

  sendClasse(event) { 
    this.rForm.patchValue({class:event});
  }

  selectProvider(event){
    this.rForm.patchValue({provider:event});
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

    this.authService.registerEnterprise(this.rForm, this.rForm).subscribe(
      data => {
        console.log("data on submit");
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        this.rForm.reset({
          phoneNumber: '',
          email: '',
          name: '',
          password: '',
          passwordConfirm: '',
          street: '',
          city: '',
          postalCode: '',
          firstNameP: '',
          lastNameP: '',
          nameE: '',
          webSite: '',
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



  formValidation(): any {

    if (this.rForm.valid) {
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