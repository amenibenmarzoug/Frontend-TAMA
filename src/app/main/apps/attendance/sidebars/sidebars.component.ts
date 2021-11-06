import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceService } from 'app/main/apps/attendance/attendance.service';
import { fuseAnimations } from '@fuse/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateAdapter } from '@angular/material/core';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss'],
  
})

export class SidebarsComponent implements OnInit {

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

  /**
   * Constructor
   *
   * @param {AttendanceService} attendanceService
   */
  constructor(
      private attendanceService: AttendanceService,
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

   
  selectSession(session): void {

      this.attendanceService.onFilterChanged.next(session);
      this.checkedAttendance=false ; 
      for ( const markedSession of this.attendanceService.attendanceCheckedSessions )
      {
        if (session.id == markedSession.id ){
            this.checkedAttendance=true ; 
            break
        }  
      } 
      
      if(this.checkedAttendance== false) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        
        this.confirmDialogRef.componentInstance.confirmMessage = "Vous n'avez pas marquer la présence de cette séance, voulez vous créer une fiche de présence?";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                for (const participant of this.participants ){
                this.attendanceService.generateAttendance(session, participant);
                }
            }
            this.confirmDialogRef = null;
        });
      }
  }

}
