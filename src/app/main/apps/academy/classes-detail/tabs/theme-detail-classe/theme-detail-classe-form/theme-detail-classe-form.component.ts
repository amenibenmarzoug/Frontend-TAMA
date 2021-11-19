import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { ThemeDetailInstance } from 'app/shared/models/themeDetailInstance.model';
import Swal from 'sweetalert2';
import { ClassesDetailService } from '../../../classes-detail.service';

@Component({
  selector: 'app-theme-detail-classe-form',
  templateUrl: './theme-detail-classe-form.component.html',
  styleUrls: ['./theme-detail-classe-form.component.scss']
})
export class ThemeDetailClasseFormComponent {

  action: string;
  themeDetailInst: ThemeDetailInstance;
  themeDetailForm: FormGroup;
  dialogTitle: string;

  themedetails:any[];
  actualDaysNumberAffected: number;
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
    public matDialogRef: MatDialogRef<ThemeDetailClasseFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _themeDetailsService : ClassesDetailService ,
    private _matDialog: MatDialog  


)
{
    // Set the defaults
    this.action = _data.action;

    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Modifier Thème de la journée';
        console.log("DATA");
        console.log(_data);
        this.themeDetailInst = _data.themeDetail;
        this.themeDetailInst.moduleInstance=_data.themeDetail.moduleInstance ; 
        this._themeDetailsService.moduleInst= this.themeDetailInst.moduleInstance;
        
    }
    else
    {
        this.dialogTitle = 'Nouveau Theme Detail';
     
        this.themeDetailInst = new ThemeDetailInstance({});


    }

    this.themeDetailForm = this.createThemeDetailForm();
    this.themedetails = this._themeDetailsService.themeDetails;
    console.log(this.themedetails);
}

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------

/**
 * Create contact form
 *
 * @returns {FormGroup}
 */
createThemeDetailForm(): FormGroup
{ const nbrPattern= '^[0-9]*$';
    return this._formBuilder.group({
        id      : [this.themeDetailInst.id],
        themeDetailInstName   : [this.themeDetailInst.themeDetailInstName],
        nbDaysthemeDetailInst : [this.themeDetailInst.nbDaysthemeDetailInst,[Validators.required, Validators.pattern(nbrPattern)]],
      //  moduleInstance : [this.themeDetail.moduleInstance],
        themeDetail: [this.themeDetailInst.themeDetail]
       
    });
}

getModuleForm(event){
  this._themeDetailsService.themeDetailInst=event;
  this.themeDetailInst.themeDetailInstName = event.themeDetailName;
  this.themeDetailInst.nbDaysthemeDetailInst=event.nbDaysthemeDetailInst;
  
}

closeNewThemeDetailForm(){
  this.actualDaysNumberAffected = this._themeDetailsService.actualDaysAffectedPerThemeDetail+ Number(this.themeDetailInst.nbDaysthemeDetailInst)  ; 

  if (this.actualDaysNumberAffected > Number(this._themeDetailsService.moduleInst.nbDaysModuleInstance)) {
    this.themeDetailAlert("Vous avez dépassé le nombre des jours du Module concerné");
    console.log(`Exceeded`);
    
  }
  else {
    this.matDialogRef.close(this.themeDetailForm)
  }

}

closeEditThemeDetailForm(){

  this.oldDaysAffectedValue=this._themeDetailsService.oldDaysAffectedNumber
  console.log(this.oldDaysAffectedValue);

  this.actualDaysNumberAffected=this._themeDetailsService.actualDaysAffectedPerThemeDetail -this.oldDaysAffectedValue+ Number(this.themeDetailForm.value.nbDaysthemeDetailInst)  ; 
 
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected > Number(this._themeDetailsService.moduleInst.nbDaysModuleInstance)) {
                          
    this.ErrorMessage("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total");
    console.log(`Exceeded`);

  }
  else {
    this.matDialogRef.close(['save',this.themeDetailForm])
  }
}


 


themeDetailAlert(message): void {
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
  )}

}
