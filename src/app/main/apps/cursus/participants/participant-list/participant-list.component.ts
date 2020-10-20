import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ParticipantsService } from 'app/main/apps/cursus/participants.service';
import { ParticipantFormComponent } from 'app/main/apps/cursus/participants/participant-form/participant-form.component';
import { MyParticipant } from 'app/main/apps/cursus/participants/participant.model';
import { ParticipantsComponent } from '../participants.component';
import { CursusParticipantsComponent } from '../../cursus-participants/cursus-participants.component';
import { CursusParticipantService } from '../../cursus-participants/cursus-participant.service';



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
  //dataSource: FilesDataSource | null;
 dataSource : any[] =[];
  displayedColumns = ['checkbox', 'name', 'email', 'phone', 'currentPosition', 'educationLevel',  'buttons'];
  selectedContacts: any[];
  checkboxes: {};
  dialogRef: any;
  contact : MyParticipant ;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
id : number ;
participants:any[]
  // Private
  par : any[] ;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ParticipantsService} _participantsService
   * @param {ParticipantsComponent} _participantsComponent
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _participantsService: ParticipantsService,
      private serv: CursusParticipantService,
    private  _participantsComponent :CursusParticipantsComponent,
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
 
    this.serv.receivedFilter.subscribe((param: any[]) => {
        this.par = param;
        this.dataSource=this.par.slice() ;
        /*for (let i in this.par ){
            console.log(JSON.stringify(this.par)) ;
      
       d.push(this.par[i]); 
        console.log(this.dataSource) ;
    }*/
   
       // console.log("par")
       // console.log(this.par)
       // console.log("Data")
//console.log(this.dataSource)

    });
    

     // this.dataSource = null;

      this._participantsService.onContactsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {
              this.contacts = contacts;

              this.checkboxes = {};
              contacts.map(contact => {
                  this.checkboxes[contact.id] = false;
              });
          });
        // this.dataSource = new FilesDataSource(this._participantsService);
      this._participantsService.onSelectedContactsChanged
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
