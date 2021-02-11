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
import { CourseSession } from 'app/main/apps/disponibility-trainer/courseSession.model';
@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SessionsListComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;
  courseSessions:any[]=[];
  contacts: CourseSession[];
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['seance','date','time','timeFin','institution'];
  selectedContacts: any[];
  coursesId: any[] = [];
  checkboxes: {};
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} _disponibilityTrainerService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _disponibilityTrainerService: AllSessionsService,
      public _matDialog: MatDialog
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
      //this.dataSource = new FilesDataSource(this._disponibilityTrainerService);
      this.dataSource = null;
     this._disponibilityTrainerService.onSpecificCourseSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {

              this.contacts = contacts;
              
            
            this.checkboxes = {};
              this.contacts.map(contact => {
                  this.checkboxes[contact.id] = false;
              });
          });
          
          this.dataSource = new FilesDataSource(this._disponibilityTrainerService);

        

 
      this._disponibilityTrainerService.onSelectedContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              for (const id in this.checkboxes) {
                  if (!this.checkboxes.hasOwnProperty(id)) {
                      continue;
                  }

                  console.log("id id id");
                  console.log(id);
                  this.checkboxes[id] = selectedContacts.includes(id.toString());
                  console.log("checkbox");
                  console.log(this.checkboxes);
              }
              this.selectedContacts = selectedContacts;
             // this.checkboxes={};

              console.log(this.selectedContacts);
          });



      this._disponibilityTrainerService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });

      this._disponibilityTrainerService.onFilterChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._disponibilityTrainerService.deselectContacts();
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


  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void {
      this._disponibilityTrainerService.toggleSelectedContact(contactId);
  }


 
}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} _disponibilityTrainerService
   */
  constructor(
      private _disponibilityTrainerService: AllSessionsService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this._disponibilityTrainerService.onSpecificCourseSessionsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}
