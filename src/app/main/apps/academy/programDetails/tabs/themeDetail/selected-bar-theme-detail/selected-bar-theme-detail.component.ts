import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ProgramDetailsService } from '../../../programDetails.service';


@Component({
  selector: 'app-selected-bar-theme-detail',
  templateUrl: './selected-bar-theme-detail.component.html',
  styleUrls: ['./selected-bar-theme-detail.component.scss']
})
export class SelectedBarThemeDetailComponent implements OnInit,OnDestroy {

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedThemeDetail: boolean;
    isIndeterminate: boolean;
    selectedThemeDetail: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _themeDetailsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _themeDetailsService: ProgramDetailsService,
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
        this._themeDetailsService.onSelectedThemeDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedThemeDetail => {
                this.selectedThemeDetail = selectedThemeDetail;
                setTimeout(() => {
                    this.hasSelectedThemeDetail = selectedThemeDetail.length > 0;
                    this.isIndeterminate = (selectedThemeDetail.length !== this._themeDetailsService.themeDetails.length && selectedThemeDetail.length > 0);
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
       this._themeDetailsService.selectThemeDetail();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._themeDetailsService.deselectThemeDetail();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedThemeDetail(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._themeDetailsService.deleteSelectedThemeDetail();
                }
                this.confirmDialogRef = null;
            });
    }
}

