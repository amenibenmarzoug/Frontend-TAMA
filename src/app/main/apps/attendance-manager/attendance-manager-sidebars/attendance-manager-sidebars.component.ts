import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceManagerService } from '../attendance-manager.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-attendance-manager-sidebars',
  templateUrl: './attendance-manager-sidebars.component.html',
  styleUrls: ['./attendance-manager-sidebars.component.scss']
})
export class AttendanceManagerSidebarsComponent implements OnInit {

  
  user: any;
  filterByDate: any;
  courseSessions: any[] = [];
  currentTrainer: string;
  selectedSession: any ; 

  attendances : any[] ; 
  participants : any[] ; 
  checkedAttendance : boolean;

  // Private
  private _unsubscribeAll: Subject<any>;
    selectedDate: any;
    selectedParticipant: any;
    selectedClass: any;
    classes: any;

  /**
   * Constructor
   *
   * @param {AttendanceService} attendanceService
   */
  constructor(
      private attendanceService: AttendanceManagerService,
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
      this.courseSessions=this.attendanceService.attendanceCheckedSessions || []; 

      this.attendanceService.onAttendanceCheckedSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(sessions => {
              console.log("sessionsto showw")
              
              this.courseSessions = sessions;
              console.log(this.courseSessions)
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

          this.attendanceService.onClassesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(classes => {
              this.classes = classes;
              console.log("this classes")
              console.log(this.classes)

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
        console.log(this.selectedDate)
        this.attendanceService.onFilterByParticipantChanged.next(participant);
    }

    selectClass(group): void {
        this.selectedClass = group
        console.log(this.selectedDate)
        this.attendanceService.onFilterByClassChanged.next(group);
    }



    selectSession(session): void {

        this.attendanceService.onFilterChanged.next(session);
        this.checkedAttendance = false;
    }

}

