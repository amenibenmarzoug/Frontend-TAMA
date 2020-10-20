import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { MyDisponibilityService } from 'app/main/apps/my-disponibility/mydisponibility.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CourseSession } from 'app/main/apps/disponibility-trainer/courseSession.model';

@Component({
    selector: 'app-disponibility-list',
    templateUrl: './disponibility-list.component.html',
    styleUrls: ['./disponibility-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisponibilityListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    courseSessions:any[]=[];
    contacts: CourseSession[];
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'lieu', 'date', 'time', 'institution', 'seance'];
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
     * @param {MyDisponibilityService} _mydisponibilityService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _mydisponibilityService: MyDisponibilityService,
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
        
       this._mydisponibilityService.onSpecificCourseSessionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {

                this.contacts = contacts;
                //this.courseSessions=contacts;
               
               //this.contacts=this.courseSessions;
               //contacts=this.courseSessions;

             
              ////  console.log("trainer ID Service in list component");
              //  console.log(this._disponibilityTrainerService.trainerId);
             //  console.log("coursesessions exact");
             //   console.log(this.courseSessions);
               // this.courseSessions=this._disponibilityTrainerService.getSpecificCourseSessions(this._disponibilityTrainerService.courseId);
               
              
              this.checkboxes = {};
                this.contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });
            

          /* this._disponibilityTrainerService.onSpecificCourseSessionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {

                this.contacts = contacts;
                this.courseSessions=contacts;
               
               //this.contacts=this.courseSessions;
               //contacts=this.courseSessions;
                console.log("course ID  list Service");
                console.log(this._disponibilityTrainerService.courseId);
                /*console.log("trainer ID Service in list component");
                console.log(this._disponibilityTrainerService.trainerId);
                console.log("coursesessions exact");
                console.log(this.courseSessions);*/
               // this.courseSessions=this._disponibilityTrainerService.getSpecificCourseSessions(this._disponibilityTrainerService.courseId);
             /*   this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });*/

            this.dataSource = new FilesDataSource(this._mydisponibilityService);
        this._mydisponibilityService.onSelectedContactsChanged
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
                    console.log(this.checkboxes[id]);
                }
                this.selectedContacts = selectedContacts;
               // this.checkboxes={};

                console.log(this.selectedContacts);
            });



        this._mydisponibilityService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._mydisponibilityService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._mydisponibilityService.deselectContacts();
            });
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        //this._disponibilityTrainerService.contacts=[];
        this._mydisponibilityService.deselectContacts();
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
        this._mydisponibilityService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    /* toggleStar(contactId): void
     {
         if ( this.user.starred.includes(contactId) )
         {
             this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
         }
         else
         {
             this.user.starred.push(contactId);
         }
   
         this._GroupsService.updateUserData(this.user);
     }*/
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {MyDisponibilityService} _mydisponibilityService
     */
    constructor(
        private _mydisponibilityService: MyDisponibilityService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._mydisponibilityService.onSpecificCourseSessionsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }


}
