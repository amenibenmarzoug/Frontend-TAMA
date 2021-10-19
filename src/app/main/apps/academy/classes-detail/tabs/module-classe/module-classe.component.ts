
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ModuleInstFormComponent } from '../../../program-inst-detail/tabs/module-inst/module-form/module-form.component';
import{ClassesDetailService} from '../../classes-detail.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-module-classe',
  templateUrl: './module-classe.component.html',
  styleUrls: ['./module-classe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ModuleClasseComponent implements OnInit {

  dialogRef: any;
  hasSelectedModules: boolean;
  searchInput: FormControl;
  

  // Private
  private _unsubscribeAll: Subject<any>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  module: any;

  /**
   * Constructor
   *
   * @param {ProgramInstDetailService} _moduleService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _moduleInstService: ClassesDetailService,
      private _fuseSidebarService: FuseSidebarService,
      private _matDialog: MatDialog
  ) {
      // Set the defaults
      this.searchInput = new FormControl('');

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
      this._moduleInstService.onSelectedModulesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedModules => {
              this.hasSelectedModules = selectedModules.length > 0;
          });

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this._moduleInstService.onSearchTextChangedModuleInst.next(searchText);
          });

       

          
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Reset the search
      this._moduleInstService.onSearchTextChangedModuleInst.next('');
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  addNewModule(): void {
      if ((this._moduleInstService.themeInst == null)) {
          //this.addModuleAlert("Veuillez choisir le thèmeInst");
          this.ErrorMessage("Veuillez choisir la thématique")
          
      }

      else {
          this.dialogRef = this._matDialog.open(ModuleInstFormComponent, {
              panelClass: 'module-form-dialog',
              data: {
                  action: 'new',

              }
          });

          this.dialogRef.afterClosed()
              .subscribe((response: FormGroup) => {
                  if (!response) {

                      return;
                  }
                  this.module = response.getRawValue();

                  this.confirmAddModule();

              });
      }

  }


  addModuleAlert(message): void {
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

  confirmAddModule(): void {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les données entrées?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
              console.log("ajout module avec succès");

              this._moduleInstService.addModuleInst(this.module, this._moduleInstService.themeInst,this._moduleInstService.module);

          }
          this.confirmDialogRef = null;
      });

  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
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
