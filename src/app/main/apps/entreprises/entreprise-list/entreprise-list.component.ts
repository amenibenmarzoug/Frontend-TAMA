
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { EntreprisesService } from 'app/main/apps/entreprises/entreprises.service';
import { EntrepriseFormComponent } from 'app/main/apps/entreprises/entreprise-form/entreprise-form.component';
import { Entreprise } from 'app/main/apps/entreprises/entreprise.model';
@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class EntrepriseListComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent')
  dialogContent: TemplateRef<any>;

  contacts: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'name', 'email', 'phone', 'website','phone' , 'buttons'];
  selectedContacts: any[];
  checkboxes: {};
  dialogRef: any;
  contact : Entreprise
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
id : number ;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {EntreprisesService} _entreprisesService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private  _entreprisesService: EntreprisesService,
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
      this.dataSource = new FilesDataSource(this. _entreprisesService);

      this. _entreprisesService.onContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {
              this.contacts = contacts;

              this.checkboxes = {};
              contacts.map(contact => {
                  this.checkboxes[contact.id] = false;
              });
          });

      this. _entreprisesService.onSelectedContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              for ( const id in this.checkboxes )
              {
                  if ( !this.checkboxes.hasOwnProperty(id) )
                  {
                      continue;
                  }

                  this.checkboxes[id] = selectedContacts.includes(id);
              }
              this.selectedContacts = selectedContacts;
          });

      this. _entreprisesService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });

      this. _entreprisesService.onFilterChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this. _entreprisesService.deselectContacts();
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
      this.dialogRef = this._matDialog.open(EntrepriseFormComponent, {
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

                      this._entreprisesService.updateContact1(formData.getRawValue());

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
              this. _entreprisesService.deleteContact(id);
          }
          this.confirmDialogRef = null;
      });

  }

  ValidateContact(contact){
   
    this._entreprisesService.ValidateContact(contact)
  }

  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void
  {
      this. _entreprisesService.toggleSelectedContact(contactId);
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
   * @param {EntreprisesService} _participantsService
   */
  constructor(
      private _participantsService: EntreprisesService
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
