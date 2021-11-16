import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AddSessionService } from 'app/main/apps/academy/add-session/add-session.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


@Component({
    selector: 'app-trainers-list',
    templateUrl: './trainers-list.component.html',
    styleUrls: ['./trainers-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TrainersListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    courseSessions: any[] = [];
    trainers: any[];
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'email', 'phone'];
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
     * @param {CourseTrainerService} _courseTrainerService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _addSessionService: AddSessionService,
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
        //this.dataSource = null;
        this.dataSource = new FilesDataSource(this._addSessionService);

        this._addSessionService.onTrainersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainers => {



                this.trainers = trainers;
                if (this._addSessionService.selectedDay == null) {
                    this.trainers = [];
                }

                if (this._addSessionService.selectedContacts.length == 0) {
                    this.checkboxes = {};
                }
                else {
                    this.checkboxes = this._addSessionService.checkboxes;
                }

              
            });




        this._addSessionService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this._addSessionService.checkboxes = this.checkboxes;
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;


                    }


                    this.checkboxes[id] = selectedContacts.includes(id.toString());

                }
                this.selectedContacts = selectedContacts;


                //this._addSessionService.checkboxes={};
            });


            


        this._addSessionService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._addSessionService.deselectContacts();
            });
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        //this._courseTrainerService.deselectContacts();
        this._addSessionService.onTrainersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._addSessionService.deselectContacts();
                this._addSessionService.trainers = [];
            });
        this.trainers = [];
        this.dataSource = null;
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
        this._addSessionService.toggleSelectedContact(contactId);
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

    disableCheckbox(id): any {
        if ((this.selectedContacts.length >= 1) && (!this.selectedContacts.includes(id.toString())))
            return true;
        else
            return false;
    }


}


export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {CourseTrainerService} _addSessionService
     */
    constructor(
        private _addSessionService: AddSessionService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._addSessionService.onTrainersChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }

}