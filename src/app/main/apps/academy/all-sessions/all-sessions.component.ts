import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';
import { Disponibility } from 'app/main/apps/disponibility-trainer/disponibility.model';

import { ParticipantListComponent } from 'app/main/apps/participants/participant-list/participant-list.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AllSessionsComponent implements OnInit, OnDestroy {

  dialogRef: any;
  hasSelectedSessions: boolean;
  searchInput: FormControl;
  selectedSessions: any[] = [];
 
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  test: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _allSessionsService: AllSessionsService,
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
      this._allSessionsService.onSelectedSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedSessions => {
              this.hasSelectedSessions = selectedSessions.length > 0;
          });

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this._allSessionsService.onSearchTextChanged.next(searchText);
          });
  }



  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Reset the search
    /*  this._allSessionsService.onSearchTextChanged.next('');
      this._allSessionsService.deselectContacts();
      this._allSessionsService.courseId = null;
      this._allSessionsService.trainer = null;
      this._allSessionsService.filterBy = null;
      this._allSessionsService.contacts = [];*/
      // Unsubscribe from all subscriptions
      this._allSessionsService.filterBy = null;
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------



  chooseDispo(message): void {
      this.alertDialog = this._matDialog.open(AlertDialogComponent, {
          disableClose: false
      });

      this.alertDialog.componentInstance.dialogMessage = message;

      this.alertDialog.afterClosed().subscribe(result => {
          if (result) {
              console.log("selectionner format");

          }
          this.alertDialog = null;
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
