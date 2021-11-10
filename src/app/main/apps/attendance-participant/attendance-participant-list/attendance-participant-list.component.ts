import { DataSource } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { Attendance } from 'app/shared/models/attendance.model';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AttendanceParticipantService } from '../attendance-participant.service';


@Component({
    selector: 'app-attendance-participant-list',
    templateUrl: './attendance-participant-list.component.html',
    styleUrls: ['./attendance-participant-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AttendanceParticipantListComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;
    dataSource: FilesDataSource | null;
    displayedColumns = ['classe', 'seance', 'date', 'attendanceState'];
    attendances: any[];

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
        this.dataSource = new FilesDataSource(this.attendanceService,this.paginator);
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
    filteredData: Attendance[];

    /**
     * Constructor
     *
     * @param {AttendanceParticipantService} attendanceService
     */
    constructor(
        private attendanceService: AttendanceParticipantService,
        private _matPaginator: MatPaginator,
        ) {
            super();
            this.filteredData = this.attendanceService.attendances;
            
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




