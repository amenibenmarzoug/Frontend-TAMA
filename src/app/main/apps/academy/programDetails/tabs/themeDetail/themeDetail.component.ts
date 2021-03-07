import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {ThemeDetailFormComponent} from '../themeDetail/theme-detail-form/theme-detail-form.component';
import { ProgramDetailsService } from '../../programDetails.service';
@Component({
    selector     : 'themeDetail',
    templateUrl  : './themeDetail.component.html',
    styleUrls    : ['./themeDetail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ThemeDetailComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedThemeDetails: boolean;
    searchInput: FormControl;
    moduleId: number;

    // Private
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    alertDialog: MatDialogRef<AlertDialogComponent>;
    themeDetail: any;

    actualDaysNumberAffected : number ; 

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _themeDetailsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _themeDetailsService: ProgramDetailsService,
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
        this._themeDetailsService.onSelectedThemeDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedThemeDetails => {
                this.hasSelectedThemeDetails = selectedThemeDetails.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._themeDetailsService.onSearchTextChangedThemeDetail.next(searchText);
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Reset the search
        this._themeDetailsService.onSearchTextChangedThemeDetail.next('');
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    addNewThemeDetail(): void {
        if ((this._themeDetailsService.module == null )) {
            console.log(this._themeDetailsService.module);
            this.addThemeDetailAlert("Veuillez choisir un Module");
        }

        else {
            this._themeDetailsService.getThemeDetailDaysAffected();
            this.dialogRef = this._matDialog.open(ThemeDetailFormComponent, {
                panelClass: 'theme-detail-form-dialog',
                data: {
                    action: 'new',

                }
            });

            this.dialogRef.afterClosed()
                .subscribe((response: FormGroup) => {
                    if (!response) {

                        return;
                    }
                    this.themeDetail = response.getRawValue();
                    /*this.actualDaysNumberAffected = this._themeDetailsService.actualDaysAffectedPerThemeDetail+ Number(this.themeDetail.nbDaysThemeDetail)  ; 

                    if (this.actualDaysNumberAffected > Number(this._themeDetailsService.module.nbDaysModule)) {
                        this.addThemeDetailAlert("Vous avez dépassé le nombre des jours du Module concerné");
                        console.log(`Exceeded`);
                        return; 
                    }*/

                    this.confirmAddThemeDetail();

                });
        }

    }


    addThemeDetailAlert(message): void {
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

    confirmAddThemeDetail(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les données entrées?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("ajout theme Detail avec succès");

                this._themeDetailsService.addThemeDetail(this.themeDetail, this._themeDetailsService.module);

            }
            this.confirmDialogRef = null;
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
