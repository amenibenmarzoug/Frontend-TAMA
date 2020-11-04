import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, registerLocaleData } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { navigationParticipant } from 'app/navigation/navigationParticipant';
import { navigationEntreprise } from 'app/navigation/navigationEntreprise';
import { navigationTrainer } from 'app/navigation/navigationTrainer';
import { navigationAdmin } from 'app/navigation/navigationAdmin';
import { navigationInstitution} from 'app/navigation/navigationInstitution';


import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { TokenStorageService } from './main/pages/authentication/common-authentication/token-storage.service';
import { Login2Service } from './main/pages/authentication/login-2/login-2.service';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private roles: string[];
    isLoggedIn = false;
    showEntrepBoard = false;
    showPartBoard = false;
    showAdminBoard = false;
    showTrainerBoard = false;
    showInstitutionBoard= false;

    showModeratorBoard = false;
    email: string;

    fuseConfig: any;
    navigation: any;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private tokenStorageService: TokenStorageService,
        private serviceLogin: Login2Service
    ) {
         //setTimeout(() => {
        // this.navigation = navigation;
 
         // Register the navigation to the service
         this._fuseNavigationService.register('test', this.navigation);
 
         // Set the main navigation as our current navigation
         this._fuseNavigationService.setCurrentNavigation('test');
 
         // Add languages
         this._translateService.addLangs(['en', 'tr','fr']);
 
         // Set the default language
         this._translateService.setDefaultLang('fr');
 
         // Set the navigation translations
         this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);
 
         // Use a language
         this._translateService.use('fr'); 
        //}, 1000);


       /* this.serviceLogin.receivedFilter.subscribe((param: string[]) => {
            this.roles = param;
            console.log("Roles")
            console.log(this.roles)


        })*/


        //setTimeout(() => {
        this.isLoggedIn = !!this.tokenStorageService.getToken()
        //}, 1000);


        console.log(this.isLoggedIn);
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            console.log(this.roles);
            this.showEntrepBoard = this.roles.includes('ENTREPRISE');
            this.showAdminBoard = this.roles.includes('MANAGER');
            this.showTrainerBoard = this.roles.includes('TRAINER');
            this.showPartBoard = this.roles.includes('PARTICIPANT');
            this.showInstitutionBoard=this.roles.includes('INSTITUTION');


        }

        console.log("here")
        console.log(this.showEntrepBoard)
        if (this.showEntrepBoard) {//this.showEntrepBoard = this.roles.includes('');

            //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            console.log("entreprise")

            // Get default navigation
            this.navigation = navigationEntreprise;

            // Register the navigation to the service
            this._fuseNavigationService.register('entr', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('entr');

            // Add languages
            this._translateService.addLangs(['en', 'tr','fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Set the navigation translations
            this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

            // Use a language
            this._translateService.use('fr'); 
        }
      

        else if (this.showTrainerBoard) {
            // Get default navigation
            this.navigation = navigationTrainer;

            // Register the navigation to the service
            this._fuseNavigationService.register('trainer', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('trainer');

            // Add languages
            this._translateService.addLangs(['en', 'tr','fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Set the navigation translations
            this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

            // Use a language
            this._translateService.use('fr'); 
        }
        else if (this.showPartBoard) {

            // Get default navigation
            this.navigation = navigationParticipant;

            // Register the navigation to the service
            this._fuseNavigationService.register('participant', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('participant');

            // Add languages
            this._translateService.addLangs(['en', 'tr','fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Set the navigation translations
            this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

            // Use a language
            this._translateService.use('fr'); 
        }
        else if (this.showAdminBoard) {
            console.log("manager")
            // Get default navigation
            this.navigation = navigationAdmin;

            // Register the navigation to the service
            this._fuseNavigationService.register('main', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('main');

            // Add languages
            this._translateService.addLangs(['en', 'tr','fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Set the navigation translations
            this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

            // Use a language
            this._translateService.use('fr'); 


        }
        else if (this.showInstitutionBoard) {

            // Get default navigation
            this.navigation = navigationInstitution;

            // Register the navigation to the service
            this._fuseNavigationService.register('institution', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('institution');

            // Add languages
            this._translateService.addLangs(['en', 'tr','fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Set the navigation translations
            this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

            // Use a language
            this._translateService.use('fr'); 
        }
        /*switch (this.roles) {
       case ["PARTICIPANT"] :{

   //this.showEntrepBoard = this.roles.includes('');

   //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

  
 
 // Get default navigation
 this.navigation = navigationParticipant;

 // Register the navigation to the service
 this._fuseNavigationService.register('main', this.navigation);

 // Set the main navigation as our current navigation
 this._fuseNavigationService.setCurrentNavigation('main');

 // Add languages
 this._translateService.addLangs(['en', 'tr','fr']);

 // Set the default language
 this._translateService.setDefaultLang('fr');

 // Set the navigation translations
 this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

 // Use a language
 this._translateService.use('fr'); }

case ["TRAINER"] :{
 //this.showEntrepBoard = this.roles.includes('');

   //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

 
 
 // Get default navigation
 this.navigation = navigationTrainer;

 // Register the navigation to the service
 this._fuseNavigationService.register('main', this.navigation);

 // Set the main navigation as our current navigation
 this._fuseNavigationService.setCurrentNavigation('main');

 // Add languages
 this._translateService.addLangs(['en', 'tr','fr']);

 // Set the default language
 this._translateService.setDefaultLang('fr');

 // Set the navigation translations
 this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

 // Use a language
 this._translateService.use('fr'); 
break ;
}
case ["ENTREPRISE"] :{
//this.showEntrepBoard = this.roles.includes('');

   //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

  
 
 // Get default navigation
 this.navigation = navigationEntreprise;

 // Register the navigation to the service
 this._fuseNavigationService.register('main', this.navigation);

 // Set the main navigation as our current navigation
 this._fuseNavigationService.setCurrentNavigation('main');

 // Add languages
 this._translateService.addLangs(['en', 'tr','fr']);

 // Set the default language
 this._translateService.setDefaultLang('fr');

 // Set the navigation translations
 this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

 // Use a language
 this._translateService.use('fr'); 
break ;


}
case ["MANAGER"] :{
    //this.showEntrepBoard = this.roles.includes('');

   //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');


 
 // Get default navigation
 this.navigation = navigation

 // Register the navigation to the service
 this._fuseNavigationService.register('main', this.navigation);

 // Set the main navigation as our current navigation
 this._fuseNavigationService.setCurrentNavigation('main');

 // Add languages
 this._translateService.addLangs(['en', 'tr','fr']);

 // Set the default language
 this._translateService.setDefaultLang('fr');

 // Set the navigation translations
 this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

 // Use a language
 this._translateService.use('fr'); 
break ;
}
default : { //this.showEntrepBoard = this.roles.includes('');

//this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');



// Get default navigation
this.navigation = navigation;

// Register the navigation to the service
this._fuseNavigationService.register('main', this.navigation);

// Set the main navigation as our current navigation
this._fuseNavigationService.setCurrentNavigation('main');

// Add languages
this._translateService.addLangs(['en', 'tr','fr']);

// Set the default language
this._translateService.setDefaultLang('fr');

// Set the navigation translations
this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

// Use a language
this._translateService.use('fr'); 
break ;}

        }*/


        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         */

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         * setTimeout(() => {
         * this._translateService.setDefaultLang('fr');
         * this._translateService.setDefaultLang('tr');
         * });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    logout() {
        this.tokenStorageService.signOut();
        //window.location.reload();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
