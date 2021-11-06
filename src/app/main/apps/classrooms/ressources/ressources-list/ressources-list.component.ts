import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { RessourcesService } from '../ressources.service';
import { RessourcesFormComponent } from '../ressources-form/ressources-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'contacts-contact-list',
    templateUrl: './ressources-list.component.html',
    styleUrls: ['./ressources-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RessourcesListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    equipments: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'quantity'];
    selectedEquipments: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;
    equipmentId: number;
    private sub: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClassroomsService} _classroomsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _ressourcesService: RessourcesService,
        public _matDialog: MatDialog,
        private route: ActivatedRoute

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
        this.sub = this.route.params.subscribe(params => {
            this.equipmentId = +params['id'];

        });
        this._ressourcesService.equipmentId = this.equipmentId;
        console.log(this.equipmentId);
        this._ressourcesService.getEquipments();
        this.dataSource = new FilesDataSource(this._ressourcesService);

        this._ressourcesService.onEquipmentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(equipments => {
                this.equipments = equipments;

                this.checkboxes = {};
                equipments.map(equipment => {
                    this.checkboxes[equipment.id] = false;
                });
            });

        this._ressourcesService.onSelectedEquipmentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEquipments => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedEquipments.includes(id.toString());
                }
                this.selectedEquipments = selectedEquipments;
            });



        this._ressourcesService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._ressourcesService.deselectEquipments();
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
     * Edit equipment
     *
     * @param equipment
     */
    editEquipment(equipment): void {
        this.dialogRef = this._matDialog.open(RessourcesFormComponent, {
            disableClose: true,
            panelClass: 'equipment-form-dialog',
            data: {
                equipment: equipment,
                action: 'edit'
            }
        });

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

                        this._ressourcesService.updateEquipment(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEquipment(equipment.id);

                        break;
                }
            });
    }

    /**
     * Delete equipment
     */
    deleteEquipment(id): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(id)
                this._ressourcesService.deleteEquipment(id);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param equipmentId
     */
    onSelectedChange(equipmentId): void {
        this._ressourcesService.toggleSelectedEquipment(equipmentId);
    }


}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {RessourcesService} _ressourcesService
     */
    constructor(
        private _classroomsService: RessourcesService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._classroomsService.onEquipmentsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
