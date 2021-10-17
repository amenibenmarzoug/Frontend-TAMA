import { Component, Inject, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProgramSpecDetailService  } from '../../../program-spec-detail.service';
import {ThemeDetail} from 'app/shared/models/themeDetail.model';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-theme-detail-spec-form',
  templateUrl: './theme-detail-spec-form.component.html',
  styleUrls: ['./theme-detail-spec-form.component.scss']
})
export class ThemeDetailSpecFormComponent {

  action: string;
  themeDetail: ThemeDetail;
  themeDetailForm: FormGroup;
  dialogTitle: string;

  themedetails:any[];
  allThemeDtails : any [];
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
    public matDialogRef: MatDialogRef<ThemeDetailSpecFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _themeDetailsService : ProgramSpecDetailService,
    private _matDialog: MatDialog  


)
{
    // Set the defaults
    this.action = _data.action;

    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Modifier Thème de la journée';
        this.themeDetail = _data.themeDetail;
        this.themeDetail.module=_data.themeDetail.module ; 
        this._themeDetailsService.module = this.themeDetail.module;
        
    }
    else
    {
        this.dialogTitle = 'Nouveau Theme Detail';
     
        this.themeDetail = new ThemeDetail({});


    }

    this.themeDetailForm = this.createThemeDetailForm();
    this.themedetails = this._themeDetailsService.themeDetails;
    this.allThemeDtails = this._themeDetailsService.allThemeDtails;
    
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
        themeDetailName   : [this.themeDetail.themeDetailName],
        nbDaysThemeDetail : [this.themeDetail.nbDaysThemeDetail,[Validators.required, Validators.pattern(nbrPattern)]],
      //  moduleInstance : [this.themeDetail.moduleInstance],
      //  themeDetail: [this.themeDetail.themeDetail]
       
    });
}

getModuleForm(event){
  this._themeDetailsService.themeDetail=event;
  this.themeDetail.themeDetailName = event.themeDetailName;
  this.themeDetail.nbDaysThemeDetail=event.nbDaysThemeDetail;
  
}

closeNewThemeDetailForm(){
  this.actualDaysNumberAffected = this._themeDetailsService.actualDaysAffectedPerThemeDetail+ Number(this.themeDetail.nbDaysThemeDetail)  ; 

  if (this.actualDaysNumberAffected > Number(this._themeDetailsService.module.nbDaysModule)) {
    this.themeDetailAlert("Vous avez dépassé le nombre des jours du Module concerné");
    console.log(`Exceeded`);
    
  }
  else {
    this.matDialogRef.close(this.themeDetailForm)
  }

}

closeEditThemeDetailForm(){
  this.oldDaysAffectedValue=this._themeDetailsService.oldDaysAffectedNumber
  this.actualDaysNumberAffected=this._themeDetailsService.actualDaysAffectedPerThemeDetail -this.oldDaysAffectedValue+ Number(this.themeDetail.nbDaysThemeDetail)  ; 
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected > Number(this._themeDetailsService.module.nbDaysModule)) {
                          
    this.themeDetailAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du module");
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
