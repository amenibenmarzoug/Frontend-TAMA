import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


import { ModuleFormComponent } from '../../../../programDetails/tabs/module/module-form/module-form.component';
import{ProgramInstDetailService} from '../../../../program-inst-detail/program-inst-detail.service';
import{ClassesService} from '../../../../classes.service';
import{ClassesDetailService} from '../../../classes-detail.service';
import { ModuleInst } from 'app/main/apps/academy/program-inst-detail/tabs/module-inst/moduleInst.model';
@Component({
  selector: 'app-modules-inst-list',
  templateUrl: './modules-inst-list.component.html',
  styleUrls: ['./modules-inst-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ModulesInstListComponent implements OnInit {

  /*@ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  modules: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'moduleInstanceName', 'nbDaysModuleInst', 'buttons'];
  selectedModules: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  id: number;
  modulInst: ModuleInst[];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _moduleService
   * @param {MatDialog} _matDialog
   */
  /*constructor(
      //private _moduleInstService: ProgramInstDetailService,
      private _moduleInstService: ClassesDetailService,
      private _moduleInstService2:ClassesService,
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
  /*ngOnInit(): void {

  this.dataSource = new FilesDataSource(this._moduleInstService);
      this._moduleInstService2.onmoduleInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modulInst = modules;
        
              this.checkboxes = {};
              modules.map(module => {
                  this.checkboxes[module.id] = false;
              });
          });
          
          this._moduleInstService.onmoduleInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modules = modules;
              console.log("ModuleInst");
              console.log(this.modules);

              this.checkboxes = {};
              modules.map(module => {
                  this.checkboxes[module.id] = false;
              });
          });
         


      this._moduleInstService.onSelectedModulesChanged
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
      this._moduleInstService.onFilterChangedModuleInst
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._moduleInstService.deselectModules();
          });
          


      /*this._moduleInstService.onSelectedModulesChanged
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
      this._moduleInstService.onFilterChangedModuleInst
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._moduleInstService.deselectModules();
          });*/

  //}

  /**
   * On destroy
   */
  /*ngOnDestroy(): void {
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
  /*editModule(module): void {
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
               /*   case 'save':

                     // this._moduleInstService.updateModuleInst(formData.getRawValue(),this._moduleInstService.themeInst,this._moduleInstService.module);

                      break;
                  /**
                   * Delete
                   */
                /*  case 'delete':

                      this.deleteModule(module.id);

                      break;
              }
          });
  }

  /**
   * Delete Module
   */
  /*deleteModule(module): void {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
               this._moduleInstService.deleteModule(module);
          }
          this.confirmDialogRef = null;
      });

  }

  /**
   * On selected change
   *
   * @param contactId
   */
 /* onSelectedChange(moduleId): void {
      this._moduleInstService.toggleSelectedModule(moduleId);
  }

  
}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _moduleService
   */
 /* constructor(
     // private _moduleInstService: ProgramInstDetailService
    // private _moduleInstService2: ClassesService   
     private _moduleInstService: ClassesDetailService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
 /* connect(): Observable<any[]> {
      
      return this._moduleInstService.onmoduleInstChanged;

  }

  /**
   * Disconnect
   */
  /*disconnect(): void {
  }*/



  




  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  modules: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'moduleInstanceName', 'nbDaysModuleInst', 'buttons'];
  selectedModules: any[];
  checkboxes: {};
  dialogRef: any;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  id: number;


  actualDaysNumberAffected : number ; 
  oldDaysAffectedValue: number ; 

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _moduleService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _moduleInstService: ClassesDetailService,
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
   
    this.dataSource = new FilesDataSource(this._moduleInstService);

    this._moduleInstService.onmoduleInstChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(modules => {
        this.modules = modules;
        console.log("ModuleInst");
        console.log(this.modules);

        this.checkboxes = {};
        modules.map(module => {
            this.checkboxes[module.id] = false;
        });
    });
   
this._moduleInstService.onSelectedModulesChanged
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
this._moduleInstService.onFilterChangedModuleInst
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => {
        this._moduleInstService.deselectModules();
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
    this._moduleInstService.getModuleDaysAffected();
    this.oldDaysAffectedValue=module.nbDaysModuleInstance;
    this._moduleInstService.oldDaysAffectedNumber=this.oldDaysAffectedValue;

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
                        /*this.actualDaysNumberAffected=this._moduleInstService.actualDaysAffectedPerModule
                                                    -this.oldDaysAffectedValue+ Number(formData.getRawValue().nbDaysModuleInstance)  ; 
                        // case where the modified days number exceeded the limit
                        if(this.actualDaysNumberAffected > this._moduleInstService.themeInst.nbDaysthemeInst) {
                            
                            this.updateModuleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
                            console.log(`Exceeded`);
                            this._moduleInstService.getModulesInst(); 
                            
                            break; 
                        }*/
                      this._moduleInstService.updateModuleInst(formData.getRawValue(),this._moduleInstService.themeInst,this._moduleInstService.module);

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

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
              this._moduleInstService.deleteModule(module);
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
      this._moduleInstService.toggleSelectedModule(moduleId);
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
      private _moduleInstService: ClassesDetailService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this._moduleInstService.onmoduleInstChanged;

  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }




}
