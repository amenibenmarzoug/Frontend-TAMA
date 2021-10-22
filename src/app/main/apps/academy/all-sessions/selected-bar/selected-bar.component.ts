import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';

@Component({
  selector: 'app-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent  implements OnInit {

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  hasSelectedSessions: boolean;
  isIndeterminate: boolean;
  selectedSessions: string[];


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _allSessionsService: AllSessionsService,
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
    
    this._allSessionsService.onSelectedSessionsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedSessions => {
        this.selectedSessions = selectedSessions;
        setTimeout(() => {
          this.hasSelectedSessions = selectedSessions.length > 0;
          this.isIndeterminate = (selectedSessions.length !== this._allSessionsService.sessions.length && selectedSessions.length > 0);
        }, 0);
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
   * Select all
   */
/*  selectAll(): void {
    this._disponibilityTrainerService.selectContacts();
  }*/

  /**
   * Deselect all
   */
  /*deselectAll(): void {
    
    this._disponibilityTrainerService.deselectContacts();
  }*/

 
}
