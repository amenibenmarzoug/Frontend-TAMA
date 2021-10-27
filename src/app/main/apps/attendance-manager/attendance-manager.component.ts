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
import { AttendanceManagerService } from './attendance-manager.service';



@Component({
  selector: 'app-attendance-manager',
  templateUrl: './attendance-manager.component.html',
  styleUrls: ['./attendance-manager.component.scss'],
  animations: fuseAnimations

})
export class AttendanceManagerComponent implements OnInit {

  dialogRef: any;
  hasSelectedContacts: boolean;
  searchInput: FormControl;
  selectedContacts: any[] = [];
  courseSessions: any[] = [];
  courseSessionsDispon: any[] = [];
  trainersDispo: any[] = [];

  fileName: String;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  test: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;
  fileUrl: any;
  //stats
  presencesNumber: any;
  absencesNumber: any ; 
  justifiedAbsencesNumber : any ; 
  selectedParticipant : any  ; 

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private attendanceService: AttendanceManagerService,
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    // Set the defaults
   // this.fileName = "liste_presence.pdf";
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

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.attendanceService.onSearchTextChanged.next(searchText);
      });

    this.attendanceService.onPresenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.presencesNumber = number;
    });
    
    this.attendanceService.onAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.absencesNumber = number;
    });

    this.attendanceService.onJustifiedAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.justifiedAbsencesNumber = number;
    });

    this.attendanceService.onFilterByParticipantChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(participant => {
      this.selectedParticipant = participant;
      console.log("this.selected parii")
      console.log(this.selectedParticipant)
    });


  }

  printAttendanceList() {

    if (this.attendanceService.session != null) {
      this.attendanceService.generateReport(this.attendanceService.session.id).then((data) => {
        console.log("REPORT");
        console.log(data);
        //const data = 'some text';
        this.fileName="liste_presence_"+this.attendanceService.session.sessionName+".pdf"
        //const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(data, "liste_presence_"+this.attendanceService.session.sessionName+".pdf")
        
        //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));

      });
    }
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


