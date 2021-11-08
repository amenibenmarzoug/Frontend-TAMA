import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Router } from '@angular/router';
import { AttendanceTrainerService } from '../attendance-trainer.service';
import { DateAdapter } from '@angular/material/core';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-attendance-trainer-list',
  templateUrl: './attendance-trainer-list.component.html',
  styleUrls: ['./attendance-trainer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AttendanceTrainerListComponent implements OnInit {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;
  courseSessions: any[] = [];
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['date','seance', 'participant', 'attendanceState'];
  selectedContacts: any[];
  coursesId: any[] = [];
  checkboxes: {};
  places: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  attendances: any[] ; 

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AttendanceService} attendanceService
   * @param {MatDialog} _matDialog
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
      this.dataSource = new FilesDataSource(this.attendanceService);
      this.attendanceService.onAttendancesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(attendances => {
              this.attendances = attendances;
              this.checkboxes = {};

              this.attendances.map(attendance => {
                  this.checkboxes[attendance.id] = false;
              });  
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
   * Edit contact
   *
   * @param contact
   */



}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} attendanceService
   */
  constructor(
      private attendanceService: AttendanceTrainerService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this.attendanceService.onAttendancesChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}

