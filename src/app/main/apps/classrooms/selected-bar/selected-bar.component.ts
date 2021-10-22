import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ClassroomsService } from 'app/main/apps/classrooms/classrooms.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedClasssrooms: boolean;
    isIndeterminate: boolean;
    selectedClassrooms: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InstitutionService} _institutionService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _classroomsService: ClassroomsService,
        public _matDialog: MatDialog
    )
    {
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
        this._classroomsService.onSelectedClassroomsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedClassrooms => {
                this.selectedClassrooms = selectedClassrooms;
                setTimeout(() => {
                    this.hasSelectedClasssrooms = selectedClassrooms.length > 0;
                    this.isIndeterminate = (selectedClassrooms.length !== this._classroomsService.classrooms.length && selectedClassrooms.length > 0);
                }, 0);
            });
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
     * Select all
     */
    selectAll(): void
    {
        this._classroomsService.selectClassrooms();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
       this._classroomsService.deselectClassrooms();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._classroomsService.deleteSelectedClassrooms();
                }
                this.confirmDialogRef = null;
            });
    }
}
