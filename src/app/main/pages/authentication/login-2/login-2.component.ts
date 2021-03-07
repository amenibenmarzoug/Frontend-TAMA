import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
//import Swal from 'sweetalert2';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from './User';
import { UserService } from './user.service';
import { AuthenticationService } from '../common-authentication/authentication.service';
import { first, takeUntil } from 'rxjs/operators';
import { TokenStorageService } from '../common-authentication/token-storage.service';
import { Login2Service } from './login-2.service';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { navigationEntreprise } from 'app/navigation/navigationEntreprise';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { navigationTrainer } from 'app/navigation/navigationTrainer';
import { navigationParticipant } from 'app/navigation/navigationParticipant';
import { navigationAdmin } from 'app/navigation/navigationAdmin';
import { navigationInstitution } from 'app/navigation/navigationInstitution';


//import {LayoutService} from 'app/layout/layout.service'
import { Subject } from 'rxjs';

const USER_KEY = 'auth-user';
@Component({
  selector: 'login-2',
  templateUrl: './login-2.component.html',
  styleUrls: ['./login-2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class Login2Component implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showEntrepBoard = false;
  showPartBoard = false;
  showAdminBoard = false;
  showTrainerBoard = false;
  showInstitutionBoard = false;


  showModeratorBoard = false;


  fuseConfig: any;
  navigation: any;
  mySubscription: any;

  trainer: any;
  participant: any;
  institution: any;
  entreprise: any;
  name: string;
  email: string;
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,

    private router: Router,
    private userApi: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private serviceLogin: Login2Service,

    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    // private _layoutService: LayoutService,
    //private _platform: Platform,
    private tokenStorageService: TokenStorageService,




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


  }
  password;



  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]

    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.serviceLogin.data = JSON.parse(sessionStorage.getItem(USER_KEY));
      console.log("DATA0 INIT");
      console.log(this.serviceLogin.data);
      this.serviceLogin.userId = this.serviceLogin.data.id;
      this.serviceLogin.userRole = this.serviceLogin.data.roles;
      console.log(this.serviceLogin.userRole) ;
      if (this.serviceLogin.userRole.includes("PARTICIPANT"))
        this.serviceLogin.getParticipantById(this.serviceLogin.userId);
      if (this.serviceLogin.userRole.includes("TRAINER"))
        this.serviceLogin.getTrainerById(this.serviceLogin.userId);
      if (this.serviceLogin.userRole.includes("ENTREPRISE"))
        this.serviceLogin.getEntrepriseById(this.serviceLogin.userId);
      if (this.serviceLogin.userRole.includes("INSTITUTION"))
        this.serviceLogin.getInstitutionById(this.serviceLogin.userId);
      console.log(this.serviceLogin.userId);
      console.log(this.serviceLogin.userRole);
      if (this.serviceLogin.userRole.includes("PARTICIPANT")) {
        this.serviceLogin.participantOnChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(participant => {
            this.participant = participant;
            this.serviceLogin.name = this.participant.firstNameP + " " + this.participant.lastNameP;
            this.serviceLogin.email = this.participant.email;
          });

      }
      if (this.serviceLogin.userRole.includes("TRAINER")) {

        this.serviceLogin.trainerOnChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(trainer => {
            this.trainer = trainer;
            console.log(this.trainer);
            this.serviceLogin.name = this.trainer.firstName + " " + this.trainer.lastName;
            this.serviceLogin.email = this.trainer.email;
          });
        console.log("TRAINER IN LOGIN COMPONENT");
        console.log(this.trainer);
        // this.name=this.trainer.firstName + " " + this.trainer.lastName;

      }
      if (this.serviceLogin.userRole.includes("ENTREPRISE")) {
        this.serviceLogin.entrepriseOnChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(entreprise => {
            this.entreprise = entreprise;
            this.serviceLogin.name = this.entreprise.enterpriseName;
            this.serviceLogin.email = this.entreprise.email;
          });


      }
      if (this.serviceLogin.userRole.includes("INSTITUTION")) {
        this.serviceLogin.institutionOnChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(institution => {
            this.institution = institution;
            this.serviceLogin.name = this.institution.institutionName;
            this.serviceLogin.email = this.institution.email;
          });


      }

    }



    //this._profileService.data = JSON.parse(sessionStorage.getItem(USER_KEY));
  }





  onSubmit() {
    console.log(this.loginForm);
    this.authenticationService.login(this.loginForm).subscribe(
      data => {

        console.log("LOGIN IS OKAY");
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.serviceLogin.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        console.log("DATA0");
        console.log(this.serviceLogin.data);
        this.serviceLogin.userId = this.serviceLogin.data.id;
        this.serviceLogin.userRole = this.serviceLogin.data.roles;
        if (this.serviceLogin.userRole.includes("PARTICIPANT"))
          this.serviceLogin.getParticipantById(this.serviceLogin.userId);
        if (this.serviceLogin.userRole.includes("TRAINER"))
          this.serviceLogin.getTrainerById(this.serviceLogin.userId);
        if (this.serviceLogin.userRole.includes("ENTREPRISE"))
          this.serviceLogin.getEntrepriseById(this.serviceLogin.userId);
        if (this.serviceLogin.userRole.includes("INSTITUTION"))
          this.serviceLogin.getInstitutionById(this.serviceLogin.userId);
        console.log(this.serviceLogin.userId);
        console.log(this.serviceLogin.userRole);
        if (this.serviceLogin.userRole.includes("PARTICIPANT")) {

          this.serviceLogin.getParticipantById(this.serviceLogin.userId).then(() => {
          this.serviceLogin.name = this.serviceLogin.participant.firstNameP + " " + this.participant.lastNameP;
          this.serviceLogin.email = this.serviceLogin.participant.email;

        });
        }
        if (this.serviceLogin.userRole.includes("TRAINER")) {

          this.serviceLogin.getTrainerById(this.serviceLogin.userId).then(() => {
            console.log(this.serviceLogin.trainer);
            this.serviceLogin.name = this.serviceLogin.trainer.firstName + " " + this.serviceLogin.trainer.lastName;
            this.serviceLogin.email = this.serviceLogin.trainer.email;
            });
          
           
     

          

          console.log("TRAINER IN LOGIN COMPONENT");
          console.log(this.trainer);
          // this.name=this.trainer.firstName + " " + this.trainer.lastName;

        }
        if (this.serviceLogin.userRole.includes("ENTREPRISE")) {
          this.serviceLogin.getEntrepriseById(this.serviceLogin.userId).then(() => {
          this.serviceLogin.name = this.serviceLogin.entreprise.enterpriseName;
          this.serviceLogin.email = this.serviceLogin.entreprise.email;
        });


        }
        if (this.serviceLogin.userRole.includes("INSTITUTION")) {
          this.serviceLogin.getInstitutionById(this.serviceLogin.userId).then(() => {
          this.serviceLogin.name = this.serviceLogin.institution.institutionName;
          this.serviceLogin.email = this.serviceLogin.institution.email;
        });


        }
        console.log(this.roles);

        this.serviceLogin.raiseEvent(this.roles);

        console.log(this.isLoggedIn);
        this.loadingNavbar();
        // setTimeout(() => {
        if (this.roles.includes('INSTITUTION'))
          this.router.navigate(['pages/profile']);
        else
          this.router.navigate(['/apps/calendar']);
        //.then(() => {
        //window.location.reload();
        //})

        // }, 100);

      },
      err => {
        console.log("LOGIN FAILED");
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }

  loadingNavbar() {

    this._fuseNavigationService.register('test', this.navigation);

    this._fuseNavigationService.setCurrentNavigation('test');

    this._translateService.addLangs(['en', 'tr']);

    this._translateService.setDefaultLang('en');

    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

    this._translateService.use('en');

    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles);
      this.showEntrepBoard = this.roles.includes('ENTREPRISE');
      this.showAdminBoard = this.roles.includes('MANAGER');
      this.showTrainerBoard = this.roles.includes('TRAINER');
      this.showPartBoard = this.roles.includes('PARTICIPANT');
      this.showInstitutionBoard = this.roles.includes('INSTITUTION');

    }

    console.log("here")
    console.log(this.showEntrepBoard)
    if (this.showEntrepBoard) {

      console.log("entreprise");
      // this._layoutService.getEntrepriseById();

      // Get default navigation
      this.navigation = navigationEntreprise;

      // Register the navigation to the service
      this._fuseNavigationService.register('entr', this.navigation);

      // Set the main navigation as our current navigation
      this._fuseNavigationService.setCurrentNavigation('entr');

      // Add languages
      this._translateService.addLangs(['en', 'tr']);

      // Set the default language
      this._translateService.setDefaultLang('en');

      // Set the navigation translations
      this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

      // Use a language
      this._translateService.use('en');
    }

    else if (this.showTrainerBoard) {
      this.navigation = navigationTrainer;

      this._fuseNavigationService.register('trainer', this.navigation);

      this._fuseNavigationService.setCurrentNavigation('trainer');

      this._translateService.addLangs(['en', 'tr']);

      this._translateService.setDefaultLang('en');

      this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

      this._translateService.use('en');
    }
    else if (this.showPartBoard) {

      this.navigation = navigationParticipant;

      this._fuseNavigationService.register('participant', this.navigation);

      this._fuseNavigationService.setCurrentNavigation('participant');

      this._translateService.addLangs(['en', 'tr']);

      this._translateService.setDefaultLang('en');

      this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);


      this._translateService.use('en');
    }
    else if (this.showAdminBoard) {
      console.log("manager")
      this.navigation = navigationAdmin;

      this._fuseNavigationService.register('main', this.navigation);

      this._fuseNavigationService.setCurrentNavigation('main');

      this._translateService.addLangs(['en', 'tr']);

      this._translateService.setDefaultLang('en');

      this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

      this._translateService.use('en');


    }
    else if (this.showInstitutionBoard) {

      // Get default navigation
      this.navigation = navigationInstitution;

      // Register the navigation to the service
      this._fuseNavigationService.register('institution', this.navigation);

      // Set the main navigation as our current navigation
      this._fuseNavigationService.setCurrentNavigation('institution');

      // Add languages
      this._translateService.addLangs(['en', 'tr']);

      // Set the default language
      this._translateService.setDefaultLang('en');

      // Set the navigation translations
      this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

      // Use a language
      this._translateService.use('en');
    }
  }

  reloadPage() {
    window.location.reload();
  }
}