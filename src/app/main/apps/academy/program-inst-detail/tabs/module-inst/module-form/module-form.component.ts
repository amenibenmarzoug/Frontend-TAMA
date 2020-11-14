import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Module} from 'app/main/apps/academy/programDetails/tabs/module/module.model'
import { Subject } from 'rxjs';
import { ProgramInstDetailService } from '../../../program-inst-detail.service';
import { ModuleInst } from '../moduleInst.model';


@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleInstFormComponent  {
  action: string;
    moduleInst: ModuleInst;
    moduleInstForm: FormGroup;
    dialogTitle: string;
    modules:any[];
    private _unsubscribeAll: Subject<any>;

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
      private _programDetailsService : ProgramInstDetailService 

  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Modifier Module';
          this.moduleInst = _data.module;
          this.moduleInst.themeInstance=_data.module.themeInstance ; 
          this._programDetailsService.themeInst = this.moduleInst.themeInstance;
          this._programDetailsService.module = this.moduleInst.module;
      }
      else
      {
          this.dialogTitle = 'Nouveau Module Dédié';
       
          this.moduleInst = new ModuleInst({});


      }

      this.moduleInstForm = this.createModuleInstForm();
      this._unsubscribeAll = new Subject();
      this.modules = this._programDetailsService.modules;
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
      return this._formBuilder.group({
          id      : [this.moduleInst.id],
          moduleInstanceName   : [this.moduleInst.moduleInstanceName],
          nbDaysModuleInstance : [this.moduleInst.nbDaysModuleInstance],
          themeInstance:[this.moduleInst.themeInstance],
          module : [this.moduleInst.module]
        
         
      });
  }
  getModuleForm(event){
    this._programDetailsService.module=event;
    this.moduleInst.moduleInstanceName=event.moduleName;
    this.moduleInst.nbDaysModuleInstance=event.nbDaysModule;
  }
}
