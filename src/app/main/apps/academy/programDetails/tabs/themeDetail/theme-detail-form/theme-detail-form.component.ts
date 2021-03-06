import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Module} from 'app/main/apps/academy/programDetails/tabs/module/module.model'
import { ProgramDetailsService } from '../../../programDetails.service';
import {ThemeDetail} from '../theme-detail.model';

@Component({
  selector: 'app-theme-detail-form',
  templateUrl: './theme-detail-form.component.html',
  styleUrls: ['./theme-detail-form.component.scss']
})
export class ThemeDetailFormComponent  {
  action: string;
    themeDetail: ThemeDetail;
    themeDetailForm: FormGroup;
    dialogTitle: string;

  /**
     * Constructor
     *
     * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      public matDialogRef: MatDialogRef<ThemeDetailFormComponent >,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder,
      private _programDetailsService : ProgramDetailsService 

  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Module';
          this.themeDetail = _data.themeDetail;
          this.themeDetail.module=_data.themeDetail.module ; 
          this._programDetailsService.module = this.themeDetail.module;
      }
      else
      {
          this.dialogTitle = 'Nouveau Theme Detail';
       
          this.themeDetail = new ThemeDetail({});


      }

      this.themeDetailForm = this.createThemeDetailForm();
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
          themeDetailName   : [this.themeDetail.themeDetailName],
          nbDaysThemeDetail : [this.themeDetail.nbDaysThemeDetail],
        
         
      });
  }
}
