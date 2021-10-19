import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import {Module} from 'app/shared/models/module.model' ;
import { Subject } from 'rxjs';
import { ProgramSpecDetailService } from '../../../program-spec-detail.service';


@Component({
  selector: 'app-module-spec-form',
  templateUrl: './module-spec-form.component.html',
  styleUrls: ['./module-spec-form.component.scss']
})
export class ModuleSpecFormComponent  {

  action: string;
    moduleSpec: Module;
    moduleInstForm: FormGroup;
    dialogTitle: string;
    modules:any[];
    allModules : any[];
    private _unsubscribeAll: Subject<any>;
  actualDaysNumberAffected: any;
  oldDaysAffectedValue: number;
  alertDialog: any;

  /**
     * Constructor
     *
     * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      public matDialogRef: MatDialogRef<ModuleSpecFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder,
      private _moduleService : ProgramSpecDetailService,
      private _matDialog: MatDialog 
 

  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Module';
          this.moduleSpec = _data.module;
          this.moduleSpec.theme=_data.module.theme ; 
          this._moduleService.theme = this.moduleSpec.theme;
          //this._moduleService.module = this.moduleSpec.module;
      }
      else
      {
          this.dialogTitle = 'Nouveau Module Dédié';
       
          this.moduleSpec = new Module({});


      }

      this.moduleInstForm = this.createModuleInstForm();
      this._unsubscribeAll = new Subject();
      this.modules = this._moduleService.modules;
      this.allModules= this._moduleService.allModules; 
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createModuleInstForm(): FormGroup
  {
    const nbrPattern= '^[0-9]*$';
      return this._formBuilder.group({
          id      : [this.moduleSpec.id],
          moduleName  : [this.moduleSpec.moduleName],
          nbDaysModule : [this.moduleSpec.nbDaysModule,[Validators.required, Validators.pattern(nbrPattern)]],
          theme:[this.moduleSpec.theme],
         // module : [this.moduleInst.module]
        
         
      });
  }
  getModuleForm(event){
    this._moduleService.module=event;
    this.moduleSpec.moduleName=event.moduleName;
    this.moduleSpec.nbDaysModule=event.nbDaysModule;
  }

  closeNewModuleForm(){
   

    this.actualDaysNumberAffected = this._moduleService.actualDaysAffectedPerModule+ Number(this.moduleSpec.nbDaysModule)  ; 
    /*console.log("actual days number affected ")
    console.log(this.actualDaysNumberAffected)
    console.log("module days in the new form ")
    console.log(this.module.nbDaysModule)*/

    if (this.actualDaysNumberAffected > this._moduleService.theme.nbDaysTheme) {
      this.moduleAlert("Vous avez dépassé le nombre des jours de la thématique");
      console.log(`Exceeded`);
     // return; 
     }
     else {
      this.matDialogRef.close(this.moduleInstForm)
     }

  }

  closeEditModuleForm(){
    
    this.oldDaysAffectedValue= this._moduleService.oldDaysAffectedNumber
    this.actualDaysNumberAffected=this._moduleService.actualDaysAffectedPerModule -this.oldDaysAffectedValue+ Number(this.moduleSpec.nbDaysModule)  ; 
    // case where the modified days number exceeded the limit
    if(this.actualDaysNumberAffected > this._moduleService.theme.nbDaysTheme) {
                            
      this.moduleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
      console.log(`Exceeded`);

    }
    else 
    {
      this.matDialogRef.close(['save',this.moduleInstForm])
    }
  }

  moduleAlert(message): void {
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
}
