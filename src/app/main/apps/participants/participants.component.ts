import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { ParticipantFormComponent } from 'app/main/apps/participants/participant-form/participant-form.component';
import { Participant } from './participant.model';


@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ParticipantsComponent implements OnInit, OnDestroy {
    participants: Participant[] = [];;
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ParticipantsService} _participantsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _participantsService: ParticipantsService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');

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
        this._participantsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.hasSelectedContacts = selectedContacts.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._participantsService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Reset the search
        this._participantsService.onSearchTextChanged.next('');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */
    newContact(): void {
        this.dialogRef = this._matDialog.open(ParticipantFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                //   console.log(response) ;
                if (!response) {
                    return;
                }

                //  console.log("entreprise button");
                // console.log(this._participantsService.entreprise);

                this._participantsService.addParticipant(response.getRawValue(), this._participantsService.entreprise, this._participantsService.classe);

            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
