import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProfileService } from 'app/main/pages/profile/profile.service';
//import {LayoutService} from 'app/layout/layout.service'
import { Login2Service } from 'app/main/pages/authentication/login-2/login-2.service';
//import {Style1Service} from 'app/layout/components/navbar/vertical/style-1/style1.service';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    name: string;
    email: string;
    isTrainer: boolean;
    isParticipant: boolean;
    isInstitution: boolean;
    isEntreprise: boolean;
    isManager: boolean;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _loginService: Login2Service,
   //     private _styleService: Style1Service,
        private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, { static: true })
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                });
            }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.name = this._loginService.name;
        this.email = this._loginService.email;
      
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._fuseSidebarService.getSidebar('navbar')) {
                    this._fuseSidebarService.getSidebar('navbar').close();
                }
            }
            );

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });
        console.log("name in STYLE");
   
    /*    console.log(this.name);
        console.log(this._styleService.userId);
        console.log(this._styleService.userRole);
        if (this._styleService.userRole.includes("PARTICIPANT")) { 
            this._styleService.participantOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(participant => {
                this.participant = participant;
                this.name=this.participant.firstNameP + " " + this.participant.lastNameP;
                this.email=this.participant.email;
            }); 
           
        }
        if (this._styleService.userRole.includes("TRAINER")) { 
            
             this._styleService.trainerOnChanged
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
        if (this._styleService.userRole.includes("ENTREPRISE")) {
            this._styleService.entrepriseOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entreprise => {
                this.entreprise = entreprise;
                this.name=this.entreprise.enterpriseName ;
                this.email=this.entreprise.email;
            });
            
            
         }
        if (this._styleService.userRole.includes("INSTITUTION")) {
              this._styleService.institutionOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(institution => {
                this.institution = institution;
                this.name=this.institution.institutionName;
                this.email=this.institution.email;
            });
           
        
        }*/
      
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.name = this._loginService.name;
        this.email = this._loginService.email;
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
