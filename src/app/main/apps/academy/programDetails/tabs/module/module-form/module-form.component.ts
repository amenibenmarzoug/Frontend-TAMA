import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
      private _programDetailsService : ProgramDetailsService 

  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Module';
          this.module = _data.module;
          this.module.theme=_data.module.theme ; 
          this._programDetailsService.theme = this.module.theme;
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
      return this._formBuilder.group({
          id      : [this.module.id],
          moduleName   : [this.module.moduleName],
          nbDaysModule : [this.module.nbDaysModule],
        
         
      });
  }
}
