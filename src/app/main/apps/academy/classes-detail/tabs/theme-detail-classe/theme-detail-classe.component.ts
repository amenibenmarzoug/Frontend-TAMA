import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgramDetailsService } from '../../../programDetails/programDetails.service';
import { ModuleInst } from '../../../program-inst-detail/tabs/module-inst/moduleInst.model';
import {ClassesDetailService} from '../../classes-detail.service'
@Component({
  selector: 'app-theme-detail-classe',
  templateUrl: './theme-detail-classe.component.html',
  styleUrls: ['./theme-detail-classe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ThemeDetailClasseComponent implements OnInit {

  dialogRef: any;
  hasSelectedThemeDetails: boolean;
  searchInput: FormControl;
  moduleId: number;

  // Private
  private _unsubscribeAll: Subject<any>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  themeDetail: any;
  selectedModule:ModuleInst;
  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _themeDetailsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _themeDetailsService: ClassesDetailService,
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

  

  

  
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
