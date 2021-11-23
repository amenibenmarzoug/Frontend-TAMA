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
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

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
    displayedColumns = ['checkbox', 'moduleName', 'nbDaysModule', 'theme', 'buttons'];
    selectedModules: any[];
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
            disableClose: true ,
            panelClass: 'module-form-dialog',
            data: {
                module: module,
                action: 'edit'
            }
        });

        this._moduleService.getModuleDaysAffected();
        this.oldDaysAffectedValue = module.nbDaysModule;
        this._moduleService.oldDaysAffectedNumber = this.oldDaysAffectedValue;

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
                        /*this.actualDaysNumberAffected=this._moduleService.actualDaysAffectedPerModule
                                                     -this.oldDaysAffectedValue+ Number(formData.getRawValue().nbDaysModule)  ; 
                         // case where the modified days number exceeded the limit
                         if(this.actualDaysNumberAffected > this._moduleService.theme.nbDaysTheme) {
                             
                             this.updateModuleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
                             console.log(`Exceeded`);
                             this._moduleService.getModules(); 
                             
                             break; 
                         }*/
                        this._moduleService.updateModule(formData.getRawValue(), this._moduleService.theme);
                        

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteModule(module);

                        break;
                }
            });
    }
    updateModuleAlert(message): void {
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
     * Delete Module
     */
    deleteModule(module): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage =  'Etes vous sûr de supprimer le module' + module.moduleName+' ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                //this._moduleService.deleteModule(module.id);
                this._moduleService.omitModule(module.id);

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
