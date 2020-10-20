import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { GroupsService } from '../groups.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector     : 'app-group-participants',
    templateUrl  : '././group-participants.component.html',
    styleUrls    : ['./group-participants.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GroupParticipantsComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {GroupsService} _gpService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _gpService: GroupsService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private router: Router
    )
    {
       // this.groupId = this.actRoute.snapshot.params.id;
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

        this._gpService.onSelectedContactsChangeP
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
                this._gpService.onSearchTextChangedP.next(searchText);
            });
            
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Reset the search
        this._gpService.onSearchTextChangedP.next('');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    addParticipantsToGroup(): void{
       this.router.navigate(['./apps/participants']);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // /**
    //  * New contact
    //  */
    // newContact(): void
    // {
    //     this.dialogRef = this._matDialog.open(TrainerFormComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data      : {
    //             action: 'new'
    //         }
    //     });

    //     this.dialogRef.afterClosed()
    //         .subscribe((response: FormGroup) => {
    //             console.log(response) ;
    //             if ( !response )
    //             {
    //                 return;
    //             }

    //             this._trainersService.updateContact(response.getRawValue());
    //         });
    // }

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
