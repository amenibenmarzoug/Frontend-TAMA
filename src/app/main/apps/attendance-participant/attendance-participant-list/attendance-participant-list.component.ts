import { DataSource } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttendanceParticipantService } from '../attendance-participant.service';


@Component({
  selector: 'app-attendance-participant-list',
  templateUrl: './attendance-participant-list.component.html',
  styleUrls: ['./attendance-participant-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AttendanceParticipantListComponent implements OnInit,OnDestroy {


  dataSource: FilesDataSource | null;
  displayedColumns = ['classe','seance', 'date', 'attendanceState'];
  attendances: any[] ; 

  // Private
  private _unsubscribeAll: Subject<any>;
  
  constructor(
    
    private attendanceService: AttendanceParticipantService,
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

}

export class FilesDataSource extends DataSource<any>
{
/**
 * Constructor
 *
 * @param {AttendanceParticipantService} attendanceService
 */
constructor(
    private attendanceService: AttendanceParticipantService
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




