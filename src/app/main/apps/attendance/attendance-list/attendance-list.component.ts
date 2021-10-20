import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Router } from '@angular/router';
import { AttendanceService } from 'app/main/apps/attendance/attendance.service';


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
  courseSessions: any[] = [];
  contacts: any[];
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['seance', 'date', 'time', 'timeFin', 'institution', 'buttons'];
  selectedContacts: any[];
  coursesId: any[] = [];
  checkboxes: {};
  places: {};
  dialogRef: any;
  //session: Session;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {MatDialog} _matDialog
   */
  constructor(
    /*
      private _allSessionsService: AllSessionsService,
      private editService: EditSessionService,
      public _matDialog: MatDialog,
      private router: Router,
      */
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
     /* this.dataSource = null;
      this._allSessionsService.onSpecificCourseSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {

              this.contacts = contacts;


              this.checkboxes = {};
              this.places = {};
              this.contacts.map(contact => {
                  this.checkboxes[contact.id] = false;
                  let pl = JSON.parse(contact.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
                  console.log(pl)
                  if (pl != null) {
                      this.places[contact.id] = pl.name;
                  }

              });
          });
      console.log("PLACES");
      console.log(this.places);
      this.dataSource = new FilesDataSource(this._allSessionsService);

      this._allSessionsService.onSpecificCourseSessionsChanged.subscribe(contacts => {

          this.contacts = contacts;



          this.contacts.map(contact => {
              let pl = JSON.parse(contact.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
              console.log(pl)
              if (pl != null) {
                  this.places[contact.id] = pl.name;
                  console.log("PLACES");
                  console.log(this.places);
              }

          });
      });


      this._allSessionsService.onSelectedContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              for (const id in this.checkboxes) {
                  if (!this.checkboxes.hasOwnProperty(id)) {
                      continue;
                  }


                  this.checkboxes[id] = selectedContacts.includes(id.toString());

              }
              this.selectedContacts = selectedContacts;
              // this.checkboxes={};

              console.log(this.selectedContacts);
          });



      this._allSessionsService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });

      this._allSessionsService.onFilterChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._allSessionsService.deselectContacts();
          });
          */
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


  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void {
    /*
      this._allSessionsService.toggleSelectedContact(contactId);
      */
  }

  goToSession(id) {
     
    /*this.router.navigate(['/apps/academy/editSession', id]);
      console.log("SESSION id" + id);
      this.editService.getSessionsById(id);
      //this.session=new Session(this.editService.session);

      this.editService.getSessionsById(id).then(() => {
          this.session = new Session(this.editService.session);
          console.log("SESSION IN ALL");
          console.log(this.session);
          localStorage.setItem('sessionId', id);
          localStorage.setItem('session', JSON.stringify(this.session));
      });

      */

  }

}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} _allSessionsService
   */
  constructor(
      private _allSessionsService: AllSessionsService
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

