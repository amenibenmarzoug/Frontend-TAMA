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
  hasSelectedContacts: boolean;
  isIndeterminate: boolean;
  selectedContacts: string[];


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} _disponibilityTrainerService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _disponibilityTrainerService: AllSessionsService,
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
    
    this._disponibilityTrainerService.onSelectedContactsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedContacts => {
        this.selectedContacts = selectedContacts;
        setTimeout(() => {
          this.hasSelectedContacts = selectedContacts.length > 0;
          this.isIndeterminate = (selectedContacts.length !== this._disponibilityTrainerService.contacts.length && selectedContacts.length > 0);
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
  selectAll(): void {
    this._disponibilityTrainerService.selectContacts();
  }

  /**
   * Deselect all
   */
  deselectAll(): void {
    
    this._disponibilityTrainerService.deselectContacts();
  }

  /**
   * Delete selected contacts
   */
  deleteSelectedContacts(): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';

    this.confirmDialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this._disponibilityTrainerService.deleteSelectedContacts();
        }
        this.confirmDialogRef = null;
      });
  }
}
