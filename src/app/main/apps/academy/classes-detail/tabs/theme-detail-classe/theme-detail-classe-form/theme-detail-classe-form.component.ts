import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { ProgramInstDetailService } from 'app/main/apps/academy/program-inst-detail/program-inst-detail.service';
import { ThemeDetailInst } from 'app/main/apps/academy/program-inst-detail/tabs/theme-detail-inst/themeDetailsInst.model';
import { ClassesDetailService } from '../../../classes-detail.service';

@Component({
  selector: 'app-theme-detail-classe-form',
  templateUrl: './theme-detail-classe-form.component.html',
  styleUrls: ['./theme-detail-classe-form.component.scss']
})
export class ThemeDetailClasseFormComponent {

  action: string;
  themeDetail: ThemeDetailInst;
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
        this.themeDetail = _data.themeDetail;
        this.themeDetail.moduleInstance=_data.themeDetail.moduleInstance ; 
        this._themeDetailsService.moduleInst= this.themeDetail.moduleInstance;
        
    }
    else
    {
        this.dialogTitle = 'Nouveau Theme Detail';
     
        this.themeDetail = new ThemeDetailInst({});


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
        id      : [this.themeDetail.id],
        themeDetailInstName   : [this.themeDetail.themeDetailInstName],
        nbDaysthemeDetailInst : [this.themeDetail.nbDaysthemeDetailInst,[Validators.required, Validators.pattern(nbrPattern)]],
      //  moduleInstance : [this.themeDetail.moduleInstance],
        themeDetail: [this.themeDetail.themeDetail]
       
    });
}

getModuleForm(event){
  this._themeDetailsService.module=event;
  this.themeDetail.themeDetailInstName = event.themeDetailName;
  this.themeDetail.nbDaysthemeDetailInst=event.nbDaysThemeDetail;
  
}

closeNewThemeDetailForm(){
  this.actualDaysNumberAffected = this._themeDetailsService.actualDaysAffectedPerThemeDetail+ Number(this.themeDetail.nbDaysthemeDetailInst)  ; 

  if (this.actualDaysNumberAffected > Number(this._themeDetailsService.module.nbDaysModuleInstance)) {
    this.themeDetailAlert("Vous avez dépassé le nombre des jours du Module concerné");
    console.log(`Exceeded`);
    
  }
  else {
    this.matDialogRef.close(this.themeDetailForm)
  }

}

closeEditThemeDetailForm(){
  this.oldDaysAffectedValue=this._themeDetailsService.oldDaysAffectedNumber
  this.actualDaysNumberAffected=this._themeDetailsService.actualDaysAffectedPerThemeDetail -this.oldDaysAffectedValue+ Number(this.themeDetail.nbDaysthemeDetailInst)  ; 
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected > Number(this._themeDetailsService.module.nbDaysModuleInstance)) {
                          
    this.themeDetailAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total");
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

}
