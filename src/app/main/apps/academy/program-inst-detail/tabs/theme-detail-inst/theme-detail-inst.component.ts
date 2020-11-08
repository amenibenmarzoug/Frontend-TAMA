import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {ThemeDetailFormComponent} from '../../../programDetails/tabs/themeDetail/theme-detail-form/theme-detail-form.component';
import { ProgramDetailsService } from '../../../programDetails/programDetails.service';

@Component({
  selector: 'app-theme-detail-inst',
  templateUrl: './theme-detail-inst.component.html',
  styleUrls: ['./theme-detail-inst.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ThemeDetailInstComponent implements OnInit {

  dialogRef: any;
  hasSelectedThemeDetails: boolean;
  searchInput: FormControl;
  moduleId: number;

  // Private
  private _unsubscribeAll: Subject<any>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  themeDetail: any;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _themeDetailsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _themeDetailsService: ProgramDetailsService,
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
      this._themeDetailsService.onSelectedThemeDetailChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedThemeDetails => {
              this.hasSelectedThemeDetails = selectedThemeDetails.length > 0;
          });

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this._themeDetailsService.onSearchTextChangedThemeDetail.next(searchText);
          });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Reset the search
      this._themeDetailsService.onSearchTextChangedThemeDetail.next('');
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  addNewThemeDetail(): void {
      if ((this._themeDetailsService.module == null)) {
          this.addThemeDetailAlert("Veuillez choisir le Module");
      }

      else {
          this.dialogRef = this._matDialog.open(ThemeDetailFormComponent, {
              panelClass: 'theme-detail-form-dialog',
              data: {
                  action: 'new',

              }
          });

          this.dialogRef.afterClosed()
              .subscribe((response: FormGroup) => {
                  if (!response) {

                      return;
                  }
                  this.themeDetail = response.getRawValue();

                  this.confirmAddThemeDetail();

              });
      }

  }


  addThemeDetailAlert(message): void {
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

  confirmAddThemeDetail(): void {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les données entrées?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
              console.log("ajout theme Detail avec succès");

              this._themeDetailsService.addThemeDetail(this.themeDetail, this._themeDetailsService.module);

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

}
