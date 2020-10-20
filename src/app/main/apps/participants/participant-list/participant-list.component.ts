import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { ParticipantFormComponent } from 'app/main/apps/participants/participant-form/participant-form.component';
import { Contact } from 'app/main/apps/participants/participant.model';
@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ParticipantListComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  contacts: any;
  user: any;
  dataSource: FilesDataSource | null;
 // dataSource :any[] ;
  displayedColumns = ['checkbox', 'name', 'email', 'phone', 'currentPosition', 'level','company' ,'groupe','cursus',  'buttons'];
  selectedContacts: any[];
  checkboxes: {};
  dialogRef: any;
  contact : Contact
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
id : number ;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ParticipantsService} _participantsService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _participantsService: ParticipantsService,
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

      this._participantsService.onSelectedContactsChanged
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

      this._participantsService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.contacts = user;
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
     
      this.dialogRef = this._matDialog.open(ParticipantFormComponent, {
          
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
                      this._participantsService.updateContact1(formData.getRawValue(),this._participantsService.entreprise,this._participantsService.groupe,this._participantsService.cursus);
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
              this._participantsService.deleteContact(id);
          }
          this.confirmDialogRef = null;
      });

  }

  ValidateContact(contact){
    contact.validated=true ; 
    this._participantsService.ValidateContact(contact)
  }

  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void
  {
      this._participantsService.toggleSelectedContact(contactId);
  }

  /**
   * Toggle star
   *
   * @param contactId
   */
  toggleStar(contactId): void
  {
       //if(this.contact.abandon=true) {this._participantsService.updateUserData(this.contact)}
      
      // else {this._participantsService.updateUserData(this.contact);}
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
      private _participantsService: ParticipantsService
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
      return this._participantsService.onContactsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void
  {
  }

}
