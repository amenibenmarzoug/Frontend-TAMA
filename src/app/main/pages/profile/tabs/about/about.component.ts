import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
    about: any;
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    isTrainer: boolean;
    isParticipant: boolean;
    isInstitution: boolean;
    isEntreprise: boolean;

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
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
        console.log(this._profileService.userRole);
        if (this._profileService.userRole.includes("PARTICIPANT")) { 
            this.isParticipant=true;
            this._profileService.participantOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(participant => {
                this.participant = participant;
            }); }
        if (this._profileService.userRole.includes("TRAINER")) { 
            this.isTrainer=true;
             this._profileService.trainerOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainer => {
                this.trainer = trainer;
            });}
        if (this._profileService.userRole.includes("ENTREPRISE")) {
            this.isEntreprise=true;
            this._profileService.entrepriseOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(entreprise => {
                this.entreprise = entreprise;
            });
         }
        if (this._profileService.userRole.includes("INSTITUTION")) {
            this.isInstitution=true;
              this._profileService.institutionOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(institution => {
                this.institution = institution;
            });}


        console.log(this._profileService.trainerOnChanged);
        console.log(this._profileService.aboutOnChanged);
        console.log(this.trainer);
        console.log(this.about);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
