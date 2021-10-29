import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations'; 
import { Session } from 'app/shared/models/session.model';
import { AllSessionsTrainerService } from '../all-sessions-trainer.service';
@Component({
  selector: 'app-all-sessions-trainer-list',
  templateUrl: './all-sessions-trainer-list.component.html',
  styleUrls: ['./all-sessions-trainer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AllSessionsTrainerListComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;
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
   * @param {AllSessionsTrainerService} _allSessionsService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _allSessionsService: AllSessionsTrainerService,
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
          });
      
      this.dataSource = new FilesDataSource(this._allSessionsService);

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
  /**
   * Constructor
   *
   * @param {AllSessionsTrainerService} _allSessionsService
   */
  constructor(
      private _allSessionsService: AllSessionsTrainerService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this._allSessionsService.onSpecificCourseSessionsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}

