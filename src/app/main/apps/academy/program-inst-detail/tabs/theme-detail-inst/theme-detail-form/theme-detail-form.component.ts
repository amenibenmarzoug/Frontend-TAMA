import { Component, Inject, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Module} from 'app/main/apps/academy/programDetails/tabs/module/module.model'
import { ProgramInstDetailService } from '../../../program-inst-detail.service';
import {ThemeDetailInst} from '../themeDetailsInst.model';
import{ProgramDetailsService} from'../../../../programDetails/programDetails.service';

@Component({
  selector: 'app-theme-detail-form',
  templateUrl: './theme-detail-form.component.html',
  styleUrls: ['./theme-detail-form.component.scss']
})
export class ThemeDetailInstFormComponent  {

  action: string;
  themeDetail: ThemeDetailInst;
  themeDetailForm: FormGroup;
  dialogTitle: string;

  themedetails:any[];

/**
   * Constructor
   *
   * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<ThemeDetailInstFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _programDetailsService : ProgramInstDetailService ,

)
{
    // Set the defaults
    this.action = _data.action;

    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Modifier Module';
        this.themeDetail = _data.themeDetail;
        this.themeDetail.moduleInstance=_data.themeDetail.module ; 
        this._programDetailsService.module = this.themeDetail.moduleInstance;
    }
    else
    {
        this.dialogTitle = 'Nouveau Theme Detail';
     
        this.themeDetail = new ThemeDetailInst({});


    }

    this.themeDetailForm = this.createThemeDetailForm();
    this.themedetails = this._programDetailsService.themeDetails;
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
{
    return this._formBuilder.group({
        id      : [this.themeDetail.id],
        themeDetailInstName   : [this.themeDetail.themeDetailInstName],
        nbDaysthemeDetailInst : [this.themeDetail.nbDaysthemeDetailInst],
      //  moduleInstance : [this.themeDetail.moduleInstance],
        themeDetail: [this.themeDetail.themeDetail]
       
    });
}

getModuleForm(event){
  this._programDetailsService.module=event;
}
}
