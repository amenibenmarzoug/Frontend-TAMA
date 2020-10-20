import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ParticipantFormComponent implements OnInit {

  
  ParticipantForm: FormGroup;

  formErrors = {
      'firstName': '',
      'lastName': '',
      'phoneNumber': '',
      'email': '',
      'name': '',
      'webSite': '',
      'userRole': '',
      'password': '',
      'passwordConfirm': '',
      'gender': '',
      'birthdate': ''
  };

  validationMessages = {
      'firstName': {
          'required': 'First Name is required.',
          'minlength': 'First Name must be at least 2 characters long.',

      },
      'lastName': {
          'required': 'Last Name is required.',
          'minlength': 'Last Name must be at least 2 characters long.',

      },
      'phoneNumber': {
          'required': 'Tel. number is required.',
          'pattern': 'Tel. number must contain only numbers.'
      },
      'email': {
          'required': 'Email is required.',
          'email': 'Email not in valid format.'
      },
      'name': {
          'required': 'Name is required.',
          'minlength': 'First Name must be at least 2 characters long.',

      },
      'webSite': {
          'required': 'Website is required.',
          'pattern': 'Please enter a valid URL'

      },
      'userRole': {
          'required': 'User Role is required.',



      },
      'password': {
          'required': 'Password is required.',
          'minlength': 'Password must be at least 6 characters long.',

      },
      'passwordConfirm': {
          'required': 'Password is required.',
          //'confirmPasswordValidator': 'Passwords must match',
          'passwordsNotMatching': 'Passwords must match'

      },
      'gender': {
          'required': 'Gender is required.',

      },
      'birthdate': {
          'required': 'Birthdate is required.',



      },
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder
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
  ngOnInit(): void { }

  createForm() {

      const url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
      const regx = '[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';

     

      this.ParticipantForm = this._formBuilder.group({
         
          firstName: ['', [Validators.required, Validators.minLength(2)]],
          lastName: ['', [Validators.required, Validators.minLength(2)]],
          gender: ['', Validators.required],
          birthdate: ['', Validators.required]
      });

      

      // Update the validity of the 'passwordConfirm' field
      // when the 'password' field changes
      /*this.registerForm.get('password').valueChanges
           .pipe(takeUntil(this._unsubscribeAll))
           .subscribe(() => {
               this.registerForm.get('passwordConfirm').updateValueAndValidity();
           });*/

      this.ParticipantForm.valueChanges
          .subscribe(data => this.onValueChangedP(data));

      //this.onValueChanged();


  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
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
