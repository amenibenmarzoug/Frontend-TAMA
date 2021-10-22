import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Participant } from 'app/main/apps/participants/participant.model';
import { ClasseParticipantsService } from '../classe-participants.service';

@Component({
    selector: 'classe-participants-list',
    templateUrl: './classe-participant-list.component.html',
    styleUrls: ['./classe-participant-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClasseParticipantListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    // dataSource :any[] ;

    displayedColumns = ['number','name','position', 'company','experience','level','education'];

    checkboxes: {};
    dialogRef: any;
    participant: Participant
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;
    currentYear: number;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ParticipantsService} _participantsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _participantsService: ClasseParticipantsService,
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
        //this._participantsService.getContacts();

        this.dataSource = new FilesDataSource(this._participantsService);
       
        this._participantsService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
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
     * Delete Contact
     */
     deleteParticipant(id): void {
        // this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        //     disableClose: false
        // });

        // this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         console.log(id)
        //         this._participantsService.deleteContact(id);
        //     }
        //     this.confirmDialogRef = null;
        // });

    }

}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ParticipantsService} _participantsService
     */
    constructor(
        private _participantsService: ClasseParticipantsService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._participantsService.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }

}
