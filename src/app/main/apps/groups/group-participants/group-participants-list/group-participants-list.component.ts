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
import { Participant } from 'app/main/apps/participants/participant.model';
import { GroupsService } from '../../groups.service';
import { ActivatedRoute } from '@angular/router';
import { take, forEach } from 'lodash';

@Component({
    selector     : 'contacts-contact-list',
    templateUrl  : './group-participants-list.component.html',
    styleUrls    : ['./group-participants-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class GroupParticipantsListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    
    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'email', 'phone','company', 'level', 'abandon','buttons'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id:number;
    groupId: number;
    private sub:any;
    participants: any[];
    list:any[]
    
    


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {GroupsService} _gpService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _gpService: GroupsService,
        public _matDialog: MatDialog,
        private route: ActivatedRoute
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
        //this._gpService.getGroupsParticipants();
        this.sub = this.route.params.subscribe(params =>{
            this.groupId = +params['id'];
           
        });
        this._gpService.groupId = this.groupId;
        console.log(this.groupId);
        
        //this.dataSource = null;
        this._gpService.getGroupsParticipants();
         this._gpService.onContactsChangedP
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {
              this.contacts = contacts;

              this.checkboxes = {};
              contacts.map(contact => {
                  this.checkboxes[contact.id] = false;
              });
          });
         this.dataSource = new FilesDataSource(this._gpService);
          this._gpService.onSelectedContactsChangeP
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedContacts => {
              for ( const id in this.checkboxes )
              {
                  if ( !this.checkboxes.hasOwnProperty(id) )
                  {
                      continue;
                  }

                  this.checkboxes[id] = selectedContacts.includes(id.toString());
                  //console.log("hahom checkbox" + this.checkboxes)
              }
              this.selectedContacts = selectedContacts;
              //console.log("hahom selected contacts" + this.selectedContacts)
          });

      this._gpService.onUserDataChangeP
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.participants = user;
          });

      this._gpService.onFilterChangedP
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this._gpService.deselectParticipant();
          });
    }

    
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
      this.sub.unsubscribe();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
   
    
    /**
     * Delete Contact
     */
    
    deleteContact(id): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Êtes-vous sûr de vouloir supprimer?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          { 
              console.log(id)
              this._gpService.deleteParticipant(id);
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
        this._gpService.toggleSelectedParticipant(contactId);
    }

//     /**
//      * Toggle star
//      *
//      * @param contactId
//      */
//     toggleStar(contactId): void
//     {
//         if ( this.user.starred.includes(contactId) )
//         {
//             this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
//         }
//         else
//         {
//             this.user.starred.push(contactId);
//         }

//     }
 }

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {GroupParticipantsService} _gpService
     */
    constructor(
        private _gpService: GroupsService
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
        //return this._gpService.onContactsChangedP;
        return this._gpService.onContactsChangedP;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
