import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import {Module} from 'app/main/apps/academy/programDetails/tabs/module/module.model'
import { ProgramDetailsService } from '../../../programDetails.service';


@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent  {
  action: string;
    module: Module;
    moduleForm: FormGroup;
    dialogTitle: string;
  actualDaysNumberAffected: any;
  alertDialog: any;
  oldDaysAffectedValue: number;

  /**
     * Constructor
     *
     * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      public matDialogRef: MatDialogRef<ModuleFormComponent >,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder,
      private _moduleService : ProgramDetailsService,
      private _matDialog: MatDialog 

  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Module';
          this.module = _data.module;
          this.module.theme=_data.module.theme ; 
          this._moduleService.theme = this.module.theme;
      }
      else
      {
          this.dialogTitle = 'Nouveau Module';
       
          this.module = new Module({});


      }

      this.moduleForm = this.createModuleForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createModuleForm(): FormGroup
  {
    const nbrPattern= '^[0-9]*$';
      return this._formBuilder.group({
          id      : [this.module.id],
          moduleName   : [this.module.moduleName],
          nbDaysModule : [this.module.nbDaysModule,[Validators.required, Validators.pattern(nbrPattern)]],
          theme:[this.module.theme]
        
         
      });
  }

  closeNewModuleForm(){
   

    this.actualDaysNumberAffected = this._moduleService.actualDaysAffectedPerModule+ Number(this.module.nbDaysModule)  ; 
    /*console.log("actual days number affected ")
    console.log(this.actualDaysNumberAffected)
    console.log("module days in the new form ")
    console.log(this.module.nbDaysModule)*/

    if (this.actualDaysNumberAffected > this._moduleService.theme.nbDaysTheme) {
      this.ModuleAlert("Vous avez dépassé le nombre des jours de la thématique");
      console.log(`Exceeded`);
     // return; 
     }
     else {
      this.matDialogRef.close(this.moduleForm)
     }

  }

  closeEditModuleForm(){
    
    this.oldDaysAffectedValue= this._moduleService.oldDaysAffectedNumber
    this.actualDaysNumberAffected=this._moduleService.actualDaysAffectedPerModule -this.oldDaysAffectedValue+ Number(this.module.nbDaysModule)  ; 
    // case where the modified days number exceeded the limit
    if(this.actualDaysNumberAffected > this._moduleService.theme.nbDaysTheme) {
                            
      this.ModuleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
      console.log(`Exceeded`);

    }
    else 
    {
      this.matDialogRef.close(['save',this.moduleForm])
    }
  }

  ModuleAlert(message): void {
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

