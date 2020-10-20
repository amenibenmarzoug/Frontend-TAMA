import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { TokenStorageService } from 'app/main/pages/authentication/common-authentication/token-storage.service';
//import {ToolbarService} from 'app/layout/components/toolbar/toolbar.service'

import { Login2Service } from 'app/main/pages/authentication/login-2/login-2.service';
@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    name:string;
    email:string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _loginService: Login2Service,
    //    private _toolbarService: ToolbarService,

    private router: Router,
        private tokenStorageService: TokenStorageService
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon : 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon : 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon : 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

       // this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {   this.name = this._loginService.name;
        // Subscribe to the config changes
        this._fuseConfigService.config
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((settings) => {
            this.horizontalNavbar = settings.layout.navbar.position === 'top';
            this.rightNavbar = settings.layout.navbar.position === 'right';
            this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });

      /*  console.log(this._toolbarService.userId);
        console.log(this._toolbarService.userRole);
        if (this._toolbarService.userRole.includes("PARTICIPANT")) { 
            this._toolbarService.participantOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(participant => {
                this.participant = participant;
                this.name=this.participant.firstNameP + " " + this.participant.lastNameP;
                this.email=this.participant.email;
            }); 
           
        }
        if (this._toolbarService.userRole.includes("TRAINER")) { 
            
             this._toolbarService.trainerOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainer => {
                this.trainer = trainer;
                console.log(this.trainer);
                this.name=this.trainer.firstName + " " + this.trainer.lastName;
                this.email=this.trainer.email;
            });
            console.log(this.trainer);
           // this.name=this.trainer.firstName + " " + this.trainer.lastName;
        
        }
        if (this._toolbarService.userRole.includes("ENTREPRISE")) {
            this._toolbarService.entrepriseOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entreprise => {
                this.entreprise = entreprise;
                this.name=this.entreprise.enterpriseName ;
                this.email=this.entreprise.email;
            });
            
            
         }
        if (this._toolbarService.userRole.includes("INSTITUTION")) {
              this._toolbarService.institutionOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(institution => {
                this.institution = institution;
                this.name=this.institution.institutionName;
                this.email=this.institution.email;
            });
           
        
        }*/
     
       // this.name=
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        this.tokenStorageService.signOut();
        //sessionStorage.clear();
    
      setTimeout( () => { this.router.navigate(['/auth/login-2'] ).then(() => {
            window.location.reload();
          });},10);
       // window.location.reload();
      }
}
