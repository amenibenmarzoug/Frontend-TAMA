import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Router } from '@angular/router';
import { AttendanceService } from 'app/main/apps/attendance/attendance.service';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { Attendance } from 'app/shared/models/attendance.model';

registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AttendanceListComponent implements OnInit  {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
  courseSessions: any[] = [];
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['date', 'participant', 'attendanceState', 'action1', 'action2'];
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
      this.dataSource = new FilesDataSource(this.attendanceService, this.paginator);
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

  markPresent(attendance){
      this.attendanceService.markPresent(attendance) ; 
  }

  markAbsent(attendance){
    this.attendanceService.markAbsent(attendance) ; 
}

markJustifiedAbsent(attendance){
    this.attendanceService.markJustifiedAbsent(attendance) ; 
}

}

export class FilesDataSource extends DataSource<any>
{
    filteredData: Attendance[];
  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} attendanceService
   */
  constructor(
      private attendanceService: AttendanceService,
      private _matPaginator: MatPaginator,
  ) {
      super();
      this.filteredData = this.attendanceService.attendances;
      console.log("data here")
        console.log(this.filteredData)
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
        this.attendanceService.onAttendancesChanged,
        this._matPaginator.page,
       // this._filterChange,
        //this._matSort.sortChange
    ];
    //return this._participantsService.onContactsChanged;
    return merge(...displayDataChanges).pipe(map(() => {

        let data = this.attendanceService.attendances.slice();
        console.log("data here")
        console.log(data)

        //data = this.filterData(data);

        this.filteredData = [...data];

        //data = this.sortData(data);

        // Grab the page's slice of data.
        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
        return data.splice(startIndex, this._matPaginator.pageSize);
    })
);
     
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}

