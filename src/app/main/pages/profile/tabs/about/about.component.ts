import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantFormComponent } from 'app/main/apps/participants/participant-form/participant-form.component';
import { Participant } from 'app/shared/models/participant.model';
import { FormGroup } from '@angular/forms';
import { ResetPasswordComponent } from 'app/main/pages/authentication/reset-password/reset-password.component';
import { ResetPassword2Component } from 'app/main/pages/authentication/reset-password-2/reset-password-2.component';

import { ResetPasswordProfileComponent } from '../reset-password/reset-password.component';

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
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService ,
        private _matDialog: MatDialog
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


        
    }

    setPassword(): void {
     
            this.dialogRef = this._matDialog.open(ResetPasswordProfileComponent, {
                panelClass: 'contact-form-dialog',
               /*  data: {
                    action: 'new'
                } */
            });
    
            this.dialogRef.afterClosed()
                .subscribe((response: FormGroup) => {
                    if (!response) {
                        return;
                    }
               
                  this._profileService.resetPassword(response[0].value) ;
                  //  let participant=new Participant();
                   // participant.status='WAITING';
                   // this._participantsService.addParticipant(participant, this._participantsService.entreprise, this._participantsService.classe);
    
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
}