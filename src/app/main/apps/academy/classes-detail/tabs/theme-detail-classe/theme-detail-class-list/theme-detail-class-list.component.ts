import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


import { ThemeDetailFormComponent } from '../../../../programDetails/tabs/themeDetail/theme-detail-form/theme-detail-form.component';
import { ProgramDetailsService } from '../../../../programDetails/programDetails.service';
import{ClassesDetailService} from '../../.././classes-detail.service';
@Component({
  selector: 'app-theme-detail-class-list',
  templateUrl: './theme-detail-class-list.component.html',
  styleUrls: ['./theme-detail-class-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThemeDetailClassListComponent implements OnInit {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  themeDetails: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox'/*, 'themeDetailName', 'nbDaysThemeDetail'*/,'ThemeDetailInstName','nbDaysThemeDetailInst','buttons'];
  selectedThemeDetails: any[];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  id: number;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _themeDetailsService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _themeDetailsService: ClassesDetailService,
      public _matDialog: MatDialog
  ) {
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
      this.dataSource = new FilesDataSource(this._themeDetailsService);

      this._themeDetailsService.onThemeDetailInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(themeDetails => {
              this.themeDetails = themeDetails;

              this.checkboxes = {};
              themeDetails.map(themeDetail => {
                  this.checkboxes[themeDetail.id] = false;
              });
          });

      this._themeDetailsService.onSelectedThemeDetailChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedThemeDetails => {
              for (const id in this.checkboxes) {
                  if (!this.checkboxes.hasOwnProperty(id)) {
                      continue;
                  }

                  this.checkboxes[id] = selectedThemeDetails.includes(id.toString());
              }
              this.selectedThemeDetails = selectedThemeDetails;
          });
      this._themeDetailsService.onFilterChangedThemeDetailInst
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._themeDetailsService.deselectThemeDetail();
          });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Edit contact
   *
   * @param contact
   */
  editThemeDetail(themeDetail): void {
      this.dialogRef = this._matDialog.open(ThemeDetailFormComponent, {
          panelClass: 'theme-detail-form-dialog',
          data: {
              themeDetail: themeDetail,
              action: 'edit'
          }
      });

      this.dialogRef.afterClosed()
          .subscribe(response => {
              if (!response) {
                  return;
              }
              const actionType: string = response[0];
              const formData: FormGroup = response[1];
              switch (actionType) {
                  /**
                   * Save
                   */
                  case 'save':

                      this._themeDetailsService.updateThemeDetail(formData.getRawValue(),this._themeDetailsService.module);

                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteThemeDetail(themeDetail.id);

                      break;
              }
          });
  }

  /**
   * Delete Module
   */
  deleteThemeDetail(themeDetail): void {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
              this._themeDetailsService.deleteThemeDetail(themeDetail);
          }
          this.confirmDialogRef = null;
      });

  }

  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(themeDetailId): void {
      this._themeDetailsService.toggleSelectedThemeDetail(themeDetailId);
  }

  
}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _themeDetailsService
   */
  constructor(
      private _themeDetailsService: ClassesDetailService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this._themeDetailsService.onThemeDetailInstChanged;

  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }




}
