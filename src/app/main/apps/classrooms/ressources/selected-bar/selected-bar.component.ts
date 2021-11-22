import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ClassroomsService } from 'app/main/apps/classrooms/classrooms.service';
import { RessourcesService } from '../ressources.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedEquipments: boolean;
    isIndeterminate: boolean;
    selectedEquipments: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {RessourcesService} _ressourcesService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _ressourcesService: RessourcesService,
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
        this._ressourcesService.onSelectedEquipmentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEquipments => {
                this.selectedEquipments = selectedEquipments;
                setTimeout(() => {
                    this.hasSelectedEquipments = selectedEquipments.length > 0;
                    this.isIndeterminate = (selectedEquipments.length !== this._ressourcesService.equipments.length && selectedEquipments.length > 0);
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
        this._ressourcesService.selectEquipment();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
       this._ressourcesService.deselectEquipments();
    }

    /**
     * Delete selected equipment
     */
    deleteSelectedEquipments(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = "Voulez-vous supprimer les ressources séléctionnées?";

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._ressourcesService.deleteSelectedEquipments();
                }
                this.confirmDialogRef = null;
            });
    }
}
