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

import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import { AttendanceService } from './attendance.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateAdapter } from '@angular/material/core';

registerLocaleData(localeFr, 'fr');
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
  selectedSession: any;
  selectedContacts: any[] = [];
  courseSessions: any[] = [];
  courseSessionsDispon: any[] = [];
  trainersDispo: any[] = [];

  fileName: String;
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
    private sanitizer: DomSanitizer,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Set the defaults
    // this.fileName = "liste_presence.pdf";
    this.dateAdapter.setLocale('fr');
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
    this.attendanceService.onFilterChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedSession => {
        this.selectedSession = selectedSession;
      });

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

  confirm() {
    if (this.selectedSession != null) {
      this.SuccessMessage("Le marquage des présences a été fait avec Succés");
    }
    else{
      this.ErrorMessage("Veuillez choisir une séance!")
    }
  }

  printAttendanceList() {

    if (this.attendanceService.session != null) {
      this.attendanceService.generateReport(this.attendanceService.session.id).then((data) => {

        //const data = 'some text';
        this.fileName = "liste_presence_" + this.attendanceService.session.sessionName + ".pdf"
        //const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(data, "liste_presence_" + this.attendanceService.session.sessionName + ".pdf")

        //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));

      });
    }
    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
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

  SuccessMessage(message): void {
    Swal.fire(
      {
        title: message,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#38a9ff',
        //cancelButtonColor: '#d33',
        confirmButtonText: 'Retour'
      }
    )

  }

}

