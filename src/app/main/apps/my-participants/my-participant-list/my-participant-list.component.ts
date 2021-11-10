import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { MyParticipantsService } from 'app/main/apps/my-participants/my-participants.service';
import { MyParticipantFormComponent } from 'app/main/apps/my-participants/my-participant-form/my-participant-form.component';
import { MyParticipant } from 'app/main/apps/my-participants/my-participant.model';
import { MatPaginator } from '@angular/material/paginator';
@Component({
    selector: 'app-my-participant-list',
    templateUrl: './my-participant-list.component.html',
    styleUrls: ['./my-participant-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MyParticipantListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'email', 'phone', 'currentPosition', 'educationLevel'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    contact: MyParticipant;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MyParticipantsService} _participantsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _participantsService: MyParticipantsService,
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
        this.dataSource = null;

        this._participantsService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });
        this.dataSource = new FilesDataSource(this._participantsService,this.paginator);
        this._participantsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id);
                }
                this.selectedContacts = selectedContacts;
            });

        this._participantsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._participantsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._participantsService.deselectContacts();
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
    editContact(contact): void {
        this.dialogRef = this._matDialog.open(MyParticipantFormComponent, {
            disableClose: true ,
            panelClass: 'contact-form-dialog',
            data: {
                contact: contact,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this._participantsService.updateContact1(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(contact.id);
                        // this._participantsService.updateContact1(formData.getRawValue());
                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteContact(id): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(id)
                this._participantsService.deleteContact(id);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId): void {
        this._participantsService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void {
        //if(this.contact.abandon=true) {this._participantsService.updateUserData(this.contact)}

        // else {this._participantsService.updateUserData(this.contact);}
    }
}

export class FilesDataSource extends DataSource<any>
{
    filteredData: MyParticipant[];

    /**
     * Constructor
     *
     * @param {ParticipantsService} _participantsService
     */
    constructor(
        private _participantsService: MyParticipantsService,
        private _matPaginator: MatPaginator,
        ) {
            super();
            this.filteredData = this._participantsService.participants;
        }
    

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._participantsService.onContactsChanged,
            this._matPaginator.page,
           // this._filterChange,
            //this._matSort.sortChange
        ];
        //return this._participantsService.onContactsChanged;
        return merge(...displayDataChanges).pipe(map(() => {

            let data = this._participantsService.participants.slice();

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
