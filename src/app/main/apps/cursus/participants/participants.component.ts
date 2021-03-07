import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { SelectedBarComponent } from 'app/main/apps/cursus/participants/selected-bar/selected-bar.component';
import { ParticipantFormComponent } from 'app/main/apps/cursus/participants/participant-form/participant-form.component';

import { ParticipantsService } from '../participants.service';




import { ParticipantListComponent } from 'app/main/apps/cursus/participants/participant-list/participant-list.component';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'] , 
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ParticipantsComponent implements OnInit, OnDestroy {

  dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    participants : any[] =[] ;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
        this.dialogRef = this._matDialog.open(ParticipantFormComponent, {
     *
     * @param {ParticipantsService} ParticipantsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _MyParticipantsService: ParticipantsService,
        // private _ParticipantFormComponent: ParticipantFormComponent,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    )
    {
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
    ngOnInit(): void
    {
        this._MyParticipantsService.onSelectedContactsChanged
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
                this._MyParticipantsService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Reset the search
        this._MyParticipantsService.onSearchTextChanged.next('');

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
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(ParticipantFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });
       
      
        
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
              // 
                this._MyParticipantsService.updateContact2(response.getRawValue());
               // return this.participants ;
            });
    }

    ListParticipants(): void
    {
        this.dialogRef = this._matDialog.open(ParticipantListComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

       /* this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                
                this._groupsService.updateContact(response.getRawValue());
            });*/
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
