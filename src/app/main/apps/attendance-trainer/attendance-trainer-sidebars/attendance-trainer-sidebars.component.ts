import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceTrainerService } from '../attendance-trainer.service';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateAdapter } from '@angular/material/core';
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-attendance-trainer-sidebars',
  templateUrl: './attendance-trainer-sidebars.component.html',
  styleUrls: ['./attendance-trainer-sidebars.component.scss']
})
export class AttendanceTrainerSidebarsComponent implements OnInit {

  user: any;
  filterByDate: any;
  courseSessions: any[] = [];
  currentTrainer: string;
  selectedSession: any ; 

  attendances : any[] ; 
  participants : any[] ; 
  checkedAttendance : boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;
    selectedDate: any;
    selectedParticipant: any;

  /**
   * Constructor
   *
   * @param {AttendanceService} attendanceService
   */
  constructor(
      private attendanceService: AttendanceTrainerService,
      public _matDialog: MatDialog,
      private dateAdapter: DateAdapter<Date>
  ) {
      // Set the private defaults
      this.dateAdapter.setLocale('fr');
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
      this.filterByDate = this.attendanceService.filterByDate || 'all';

      this.attendanceService.onSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(sessions => {
              this.courseSessions = sessions;
          });
        
          this.attendanceService.onFilterChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedSession => {
              this.selectedSession = selectedSession;
          });

          this.attendanceService.onAttendancesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(attendances => {
              this.attendances = attendances;
          });

          this.attendanceService.onCheckedAttendanceChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(checkedAttendance => {
              this.checkedAttendance = checkedAttendance;
          });

          this.attendanceService.onParticipantsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(participants => {
              this.participants = participants;

          });
  }
    

  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Change the filter
   *
   * @param filter
   */

   selectDate(sessionDate): void {
    this.selectedDate = sessionDate.toDate();
    console.log(this.selectedDate)
    this.attendanceService.onFilterByDateChanged.next(sessionDate);
    }

    selectParticipant(participant): void {
        console.log("selecting Participant")
        this.selectedParticipant = participant;
        console.log(this.selectedParticipant)
        this.attendanceService.onFilterByParticipantChanged.next(participant);
    }

   
    selectSession(session): void {
        this.selectedSession = session
        this.attendanceService.onFilterChanged.next(session);
        this.checkedAttendance = false;
    }

  resetFilters(): void {
    const reset =null ; 
    this.attendanceService.onSearchTextChanged.next(''); 
    this.attendanceService.filterByDate=null ; 
    //this.attendanceService.filterByClasse=null ; 
    this.attendanceService.filterBy=null ; 
    this.attendanceService.filterByParticipant=null  ; 
    this.attendanceService.session=null ; 
    this.ngOnInit();
    this.selectedParticipant=null  ; 
    //this.selectedClass = null ; 
    this.selectedDate = null ; 
    this.selectedSession=null ;
    this.attendanceService.onFilterByParticipantChanged.next(reset);


    /*
    this.attendanceService.onFilterByDateChanged.next(reset);
    this.attendanceService.onFilterByClassChanged.next(reset);
    this.attendanceService.onFilterChanged.next(reset);
    */
   
}

}
