
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


import { ThemeDetailSpecFormComponent } from '../theme-detail-spec-form/theme-detail-spec-form.component';
import { ProgramSpecDetailService } from '../../../../program-spec-detail/program-spec-detail.service';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';


@Component({
    selector: 'app-theme-detail-spec-list',
    templateUrl: './theme-detail-spec-list.component.html',
    styleUrls: ['./theme-detail-spec-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ThemeDetailSpecListComponent implements OnInit {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    themeDetails: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'themeDetailName', 'nbDaysThemeDetail', 'buttons'];
    selectedThemeDetails: any[];
    checkboxes: {};
    dialogRef: any;
    alertDialog: MatDialogRef<AlertDialogComponent>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;

    actualDaysNumberAffected: number;
    oldDaysAffectedValue: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _themeDetailsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _themeDetailsService: ProgramSpecDetailService,
        public _matDialog: MatDialog
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
        this.dataSource = new FilesDataSource(this._themeDetailsService);

        this._themeDetailsService.onThemeDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themeDetails => {
                this.themeDetails = themeDetails;

                this.checkboxes = {};
                themeDetails.map(themeDetail => {
                    this.checkboxes[themeDetail.id] = false;
                });
            });

        this._themeDetailsService.onSelectedThemeDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedThemeDetails => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedThemeDetails.includes(id.toString());
                }
                this.selectedThemeDetails = selectedThemeDetails;
            });
        this._themeDetailsService.onFilterChangedThemeDetail
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._themeDetailsService.deselectThemeDetail();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit contact
     *
     * @param contact
     */
    editThemeDetail(themeDetail): void {
        this.dialogRef = this._matDialog.open(ThemeDetailSpecFormComponent, {
            disableClose: true,
            panelClass: 'theme-detail-form-dialog',
            data: {
                themeDetail: themeDetail,
                action: 'edit'
            }
        });
        this._themeDetailsService.getThemeDetailDaysAffected();
        this.oldDaysAffectedValue = themeDetail.nbDaysThemeDetail;
        this._themeDetailsService.oldDaysAffectedNumber = this.oldDaysAffectedValue;

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':


                        this._themeDetailsService.updateThemeDetail(formData.getRawValue(), this._themeDetailsService.module);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteThemeDetail(themeDetail);

                        break;
                }
            });
    }


    /**
     * Delete Module
     */
    deleteThemeDetail(themeDetail): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sûr de supprimer le theme detail ' + themeDetail.themeName +' ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._themeDetailsService.deleteThemeDetail(themeDetail.id);
            }
            this.confirmDialogRef = null;
        });

    }
    updateThemeDetailAlert(message): void {
        this.alertDialog = this._matDialog.open(AlertDialogComponent, {
            disableClose: false
        });

        this.alertDialog.componentInstance.dialogMessage = message;

        this.alertDialog.afterClosed().subscribe(result => {
            if (result) {

            }
            this.alertDialog = null;
        });
    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(themeDetailId): void {
        this._themeDetailsService.toggleSelectedThemeDetail(themeDetailId);
    }


}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _themeDetailsService
     */
    constructor(
        private _themeDetailsService: ProgramSpecDetailService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._themeDetailsService.onThemeDetailChanged;

    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }

}
