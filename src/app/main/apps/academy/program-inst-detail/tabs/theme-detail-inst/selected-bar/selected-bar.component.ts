import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ProgramInstDetailService } from '../../../program-inst-detail.service';

@Component({
  selector: 'app-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit,OnDestroy {

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  hasSelectedModules: boolean;
  isIndeterminate: boolean;
  selectedModules: string[];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramInstDetailService} _moduleInstService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _moduleInstService: ProgramInstDetailService,
      public _matDialog: MatDialog
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this._moduleInstService.onSelectedModulesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedModules => {
              this.selectedModules = selectedModules;
              setTimeout(() => {
                  this.hasSelectedModules = selectedModules.length > 0;
                  this.isIndeterminate = (selectedModules.length !== this._moduleInstService.modulesInst.length && selectedModules.length > 0);
              }, 0);
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Select all
   */
  selectAll(): void
  {
     this._moduleInstService.selectModules();
  }

  /**
   * Deselect all
   */
  deselectAll(): void
  {
      this._moduleInstService.deselectModules();
  }

  /**
   * Delete selected contacts
   */
  deleteSelectedModules(): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

      this.confirmDialogRef.afterClosed()
          .subscribe(result => {
              if ( result )
              {
                  this._moduleInstService.deleteSelectedModule();
              }
              this.confirmDialogRef = null;
          });
  }

}
