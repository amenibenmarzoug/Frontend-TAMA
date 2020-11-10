import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


import { ModuleFormComponent } from '../module-form/module-form.component';
import { ProgramDetailsService } from '../../../programDetails.service';

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html',
    styleUrls: ['./module-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations

})
export class ModuleListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    modules: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'moduleName', 'nbDaysModule','theme', 'buttons'];
    selectedModules: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;

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
        this.dataSource = new FilesDataSource(this._moduleService);

        this._moduleService.onmoduleChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modules => {
                this.modules = modules;

                this.checkboxes = {};
                modules.map(module => {
                    this.checkboxes[module.id] = false;
                });
            });

        this._moduleService.onSelectedModulesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedModules => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedModules.includes(id.toString());
                }
                this.selectedModules = selectedModules;
            });
        this._moduleService.onFilterChangedModule
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._moduleService.deselectModules();
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
    editModule(module): void {
        this.dialogRef = this._matDialog.open(ModuleFormComponent, {
            panelClass: 'module-form-dialog',
            data: {
                module: module,
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

                        this._moduleService.updateModule(formData.getRawValue(),this._moduleService.theme);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteModule(module.id);

                        break;
                }
            });
    }

    /**
     * Delete Module
     */
    deleteModule(module): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._moduleService.deleteModule(module);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(moduleId): void {
        this._moduleService.toggleSelectedModule(moduleId);
    }

    
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _moduleService
     */
    constructor(
        private _moduleService: ProgramDetailsService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._moduleService.onmoduleChanged;

    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
