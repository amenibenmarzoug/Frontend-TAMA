import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgramInstDetailService } from '../../../program-inst-detail.service';
import { ModuleInst } from '../moduleInst.model';


@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleInstFormComponent {
  action: string;
  moduleInst: ModuleInst;
  moduleInstForm: FormGroup;
  dialogTitle: string;
  modules: any[];
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
    public matDialogRef: MatDialogRef<ModuleInstFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _moduleService: ProgramInstDetailService,
    private _matDialog: MatDialog


  ) {
    // Set the defaults
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier Module';
      this.moduleInst = _data.module;
      this.moduleInst.themeInstance = _data.module.themeInstance;
      this._moduleService.themeInst = this.moduleInst.themeInstance;
      this._moduleService.module = this.moduleInst.module;
    }
    else {
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
  createModuleInstForm(): FormGroup {
    const nbrPattern = '^[0-9]*$';
    return this._formBuilder.group({
      id: [this.moduleInst.id],
      moduleInstanceName: [this.moduleInst.moduleInstanceName],
      nbDaysModuleInstance: [this.moduleInst.nbDaysModuleInstance, [Validators.required, Validators.pattern(nbrPattern)]],
      themeInstance: [this.moduleInst.themeInstance],
      module: [this.moduleInst.module]


    });
  }
  getModuleForm(event) {
    this._moduleService.module = event;
    this.moduleInst.moduleInstanceName = event.moduleName;
    this.moduleInst.nbDaysModuleInstance = event.nbDaysModule;
  }

  closeNewModuleForm() {


    this.actualDaysNumberAffected = this._moduleService.actualDaysAffectedPerModule + Number(this.moduleInst.nbDaysModuleInstance);
    
    if (this.actualDaysNumberAffected > this._moduleService.themeInst.nbDaysthemeInst) {
      this.ErrorMessage("Vous avez dépassé le nombre des jours de la thématique")
      console.log(`Exceeded`);
      // return; 
    }
    else {
      this.matDialogRef.close(this.moduleInstForm)
    }

  }

  closeEditModuleForm() {

    this.oldDaysAffectedValue = this._moduleService.oldDaysAffectedNumber
    this.actualDaysNumberAffected = this._moduleService.actualDaysAffectedPerModule - this.oldDaysAffectedValue + Number(this.moduleInst.nbDaysModuleInstance);
    // case where the modified days number exceeded the limit
    if (this.actualDaysNumberAffected > this._moduleService.themeInst.nbDaysthemeInst) {

      // this.moduleAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
      this.ErrorMessage("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme")
      console.log(`Exceeded`);

    }
    else {
      this.matDialogRef.close(['save', this.moduleInstForm])
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
