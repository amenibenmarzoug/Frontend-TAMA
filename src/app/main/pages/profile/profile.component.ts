import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent implements OnInit, OnDestroy {
    
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    name:string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService
    ) {
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
      
        console.log(this._profileService.userRole);
        if (this._profileService.userRole.includes("PARTICIPANT")) { 
            this._profileService.participantOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(participant => {
                this.participant = participant;
            }); 
            this.name=this.participant.firstNameP + " " + this.participant.lastNameP;
        }
        if (this._profileService.userRole.includes("TRAINER")) { 
            
             this._profileService.trainerOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainer => {
                this.trainer = trainer;
            });
            this.name=this.trainer.firstName + " " + this.trainer.lastName;
        
        }
        if (this._profileService.userRole.includes("ENTREPRISE")) {
            this._profileService.entrepriseOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entreprise => {
                this.entreprise = entreprise;
            });
            this.name=this.entreprise.enterpriseName ;
            
         }
        if (this._profileService.userRole.includes("INSTITUTION")) {
              this._profileService.institutionOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(institution => {
                this.institution = institution;
            });
            this.name=this.institution.institutionName;
        
        }


        console.log(this.name);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
       // this._profileService.data=null;
    }
}
