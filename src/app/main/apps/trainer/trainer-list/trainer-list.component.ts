import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { TrainerService } from 'app/main/apps/trainer/trainer.service';
import { TrainerFormComponent } from 'app/main/apps/trainer/trainer-form/trainer-form.component';

@Component({
    selector     : 'app-trainer-list',
    templateUrl  : './trainer-list.component.html',
    styleUrls    : ['./trainer-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TrainerListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'email', 'phone', 'specification', 'address', 'buttons'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id:number ;
    disabled:boolean=false
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TrainerService} _trainersService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _trainersService: TrainerService,
        public _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._trainersService);

        this._trainersService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        this._trainersService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id.toString());
                }
                this.selectedContacts = selectedContacts;
            });
            console.log(this.contacts);
        this._trainersService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.contacts = user;
            });

        this._trainersService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
              this._trainersService.deselectContacts();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
    editContact(contact): void
    {
        this.dialogRef = this._matDialog.open(TrainerFormComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                contact: contact,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':
                        console.log(formData.getRawValue());
                        this._trainersService.updateContact1(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(contact.id);

                        break;
                }
            });
    }
    ValidateContact(contact){
        this.disabled=true ;
        this._trainersService.ValidateContact(contact) ;
       // document.getElementById('botton').disabled = 'disabled';
      
    
      }
    /**
     * Delete Contact
     */
    deleteContact(id): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          { 
              console.log(id)
              this._trainersService.deleteContact(id);
          }
          this.confirmDialogRef = null;
      });

  }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId): void
    {
        this._trainersService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void
    {
        if ( this.user.starred.includes(contactId) )
        {
            this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
        }
        else
        {
            this.user.starred.push(contactId);
        }

       this._trainersService.updateUserData(this.user);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {TrainerService} _trainersService
     */
    constructor(
        private _trainersService: TrainerService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._trainersService.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }

  
}
