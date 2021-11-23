import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations'; 
import { AllSessionsParticipantService } from '../all-sessions-participant.service';
import { Session } from 'app/shared/models/session.model';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-all-sessions-participant-list',
  templateUrl: './all-sessions-participant-list.component.html',
  styleUrls: ['./all-sessions-participant-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations

})
export class AllSessionsParticipantListComponent  implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;
    sessions: any[];
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['seance', 'date', 'time', 'timeFin', 'institution'];
    selectedSessions: any[];
    coursesId: any[] = [];
    checkboxes: {};
    places: {};
    dialogRef: any;
    session: Session;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AllSessionsService} _allSessionsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _allSessionsService: AllSessionsParticipantService,
        public _matDialog: MatDialog,
    ) {
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
        //this.dataSource = new FilesDataSource(this._allSessionsService);
        this.dataSource = null;
        this._allSessionsService.onSpecificCourseSessionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(sessions => {

                this.sessions = sessions;


                this.checkboxes = {};
                this.places = {};
                this.sessions.map(session => {
                    this.checkboxes[session.id] = false;
                    let pl = JSON.parse(session.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
                    if (pl != null) {
                        this.places[session.id] = pl.name;
                    }

                });
                this.paginator.firstPage();
            });
        
        this.dataSource = new FilesDataSource(this._allSessionsService,this.paginator);

        this._allSessionsService.onSpecificCourseSessionsChanged.subscribe(sessions => {

            this.sessions = sessions;



            this.sessions.map(session => {
                let pl = JSON.parse(session.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
               
                if (pl != null) {
                    this.places[session.id] = pl.name;
                   
                }

            });
        });


        this._allSessionsService.onSelectedSessionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedSessions => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }


                    this.checkboxes[id] = selectedSessions.includes(id.toString());

                }
                this.selectedSessions = selectedSessions;
                // this.checkboxes={};

            });



        this._allSessionsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

     /*    this._allSessionsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._allSessionsService.deselectSessions();
            }); */
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
    filteredData: Session[];

    /**
     * Constructor
     *
     * @param {DisponibilityTrainerService} _allSessionsService
     */
 
    constructor(
        private _allSessionsService: AllSessionsParticipantService,
        private _matPaginator: MatPaginator,
    ) {
        super();
        this.filteredData = this._allSessionsService.sessions;

    }
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._allSessionsService.onSpecificCourseSessionsChanged,
            this._matPaginator.page,
            // this._filterChange,
            //this._matSort.sortChange
        ];
        //return this._participantsService.onContactsChanged;
        return merge(...displayDataChanges).pipe(map(() => {

            let data = this._allSessionsService.sessions.slice();


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
