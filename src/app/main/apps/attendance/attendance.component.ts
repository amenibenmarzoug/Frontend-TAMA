import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';
import { FuseConfirmDialogComponent } from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '../../../../@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';



import Swal from 'sweetalert2';
import { AttendanceService } from './attendance.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],

  animations: fuseAnimations
})
export class AttendanceComponent implements OnInit {

  categories = ['Web', 'android'];
  dialogRef: any;
  hasSelectedContacts: boolean;
  searchInput: FormControl;
  selectedContacts: any[] = [];
  courseSessions: any[] = [];
  courseSessionsDispon: any[] = [];
  trainersDispo: any[] = [];

  fileName: String ; 
  /*
  disponibilities: Disponibility[] = [];
  disponibilitiesAdded: Disponibility[] = [];
  disponibility: Disponibility;
  */
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  test: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;
    fileUrl: any;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private attendanceService: AttendanceService,
      private _fuseSidebarService: FuseSidebarService,
      private _matDialog: MatDialog,
      private sanitizer: DomSanitizer
  ) {
      // Set the defaults
      this.fileName="file1.txt"
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

    /*
      this._allSessionsService.onSelectedContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              this.hasSelectedContacts = selectedContacts.length > 0;
          }); */

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this.attendanceService.onSearchTextChanged.next(searchText);
          });

          
  }

  printAttendanceList() {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    //console.log(this.fileUrl)
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


      /*
      this._allSessionsService.filterBy = null;
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();*/

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // ----------------------------------------------------------------------------------------------------

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

