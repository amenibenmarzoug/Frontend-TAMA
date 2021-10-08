import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { ProgramInstDetailService } from 'app/main/apps/academy/program-inst-detail/program-inst-detail.service';
import { ModuleInstFormComponent } from 'app/main/apps/academy/program-inst-detail/tabs/module-inst/module-form/module-form.component';
import { ModuleInst } from 'app/main/apps/academy/program-inst-detail/tabs/module-inst/moduleInst.model';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ClassesDetailService } from '../../../classes-detail.service';

@Component({
  selector: 'app-module-class-form',
  templateUrl: './module-class-form.component.html',
  styleUrls: ['./module-class-form.component.scss']
})
export class ModuleClassFormComponent  {

  action: string;
  moduleInst: ModuleInst;
  moduleInstForm: FormGroup;
  dialogTitle: string;
  modules:any[];
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
    public matDialogRef: MatDialogRef<ModuleInstFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _moduleService : ClassesDetailService,
    private _matDialog: MatDialog 


)
{
    // Set the defaults
    this.action = _data.action;

    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Modifier Module';
        this.moduleInst = _data.module;
        this.moduleInst.themeInstance=_data.module.themeInstance ; 
        this._moduleService.themeInst = this.moduleInst.themeInstance;
        this._moduleService.module = this.moduleInst.module;
    }
    else
    {
        this.dialogTitle = 'Nouveau Module Dédié';
     
        this.moduleInst = new ModuleInst({});


    }

    this.moduleInstForm = this.createModuleInstForm();
    this._unsubscribeAll = new Subject();
    this.modules = this._moduleService.modules;
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
        id      : [this.moduleInst.id],
        moduleInstanceName   : [this.moduleInst.moduleInstanceName],
        nbDaysModuleInstance : [this.moduleInst.nbDaysModuleInstance,[Validators.required, Validators.pattern(nbrPattern)]],
        themeInstance:[this.moduleInst.themeInstance],
        module : [this.moduleInst.module]
      
       
    });
}
getModuleForm(event){
  this._moduleService.module=event;
  this.moduleInst.moduleInstanceName=event.moduleName;
  this.moduleInst.nbDaysModuleInstance=event.nbDaysModule;
}

closeNewModuleForm(){
 

  this.actualDaysNumberAffected = this._moduleService.actualDaysAffectedPerModule+ Number(this.moduleInst.nbDaysModuleInstance)  ; 
  /*console.log("actual days number affected ")
  console.log(this.actualDaysNumberAffected)
  console.log("module days in the new form ")
  console.log(this.module.nbDaysModule)*/

  if (this.actualDaysNumberAffected > this._moduleService.themeInst.nbDaysthemeInst) {
    //this.moduleAlert("Vous avez dépassé le nombre des jours de la thématique");
    this.ErrorMessage("Vous avez dépassé le nombre des jours de la thématique")
    console.log(`Exceeded`);
   // return; 
   }
   else {
    this.matDialogRef.close(this.moduleInstForm)
   }

}

closeEditModuleForm(){
  
  this.oldDaysAffectedValue= this._moduleService.oldDaysAffectedNumber
  this.actualDaysNumberAffected=this._moduleService.actualDaysAffectedPerModule -this.oldDaysAffectedValue+ Number(this.moduleInst.nbDaysModuleInstance)  ; 
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected > this._moduleService.themeInst.nbDaysthemeInst) {
                          
   // this.moduleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
   this.ErrorMessage("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme")
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

ErrorMessage(message): void {
Swal.fire(
  {
    title: message,
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#38a9ff',
    //cancelButtonColor: '#d33',
    confirmButtonText: 'Retour'
  }
)

}

}
