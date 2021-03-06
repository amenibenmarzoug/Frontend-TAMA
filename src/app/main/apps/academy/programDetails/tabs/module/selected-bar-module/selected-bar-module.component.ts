import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ProgramDetailsService } from '../../../programDetails.service';



@Component({
  selector: 'app-selected-bar-module',
  templateUrl: './selected-bar-module.component.html',
  styleUrls: ['./selected-bar-module.component.scss']
})
export class SelectedBarModuleComponent implements OnInit,OnDestroy {

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedModules: boolean;
    isIndeterminate: boolean;
    selectedModules: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _moduleService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _moduleService: ProgramDetailsService,
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
        this._moduleService.onSelectedModulesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedModules => {
                this.selectedModules = selectedModules;
                setTimeout(() => {
                    this.hasSelectedModules = selectedModules.length > 0;
                    this.isIndeterminate = (selectedModules.length !== this._moduleService.modules.length && selectedModules.length > 0);
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
       this._moduleService.selectModules();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._moduleService.deselectModules();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedModules(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._moduleService.deleteSelectedModule();
                }
                this.confirmDialogRef = null;
            });
    }
}

