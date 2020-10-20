import { Component, OnInit,OnDestroy } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import{CursusTrainingService} from '../cursus-training.service';
import { TrainingsService } from 'app/main/apps/academy/trainings.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { TrainingFormComponent } from 'app/main/apps/academy/trainings/training-form/training-form.component';




@Component({
  selector: 'app-created-trainings-list',
  templateUrl: './created-trainings-list.component.html',
  styleUrls: ['./created-trainings-list.component.scss']
})
export class CreatedTrainingsListComponent implements OnInit 
  {
    contacts: any;
    dataSource : any[] =[];
    displayedColumns = ['courseName', 'theme', 'nbmaxParticipants', 'fees','content', 'buttons'];
    selectedContacts: any[];
   // checkboxes: {};
    par : any[] ;
    user: any;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;


    private _unsubscribeAll: Subject<any>;
  constructor(private serv: CursusTrainingService,
    private _contactsService: TrainingsService,
        public _matDialog: MatDialog) { 
            this._unsubscribeAll = new Subject();
        }

 
  ngOnInit(): void
  {    
 
    this.serv.receivedFilter.subscribe((param: any[]) => {
        this.par = param;
        this.dataSource=this.par.slice() ;
        

     console.log("par")
       console.log(this.par)
       console.log("Data")
console.log(this.dataSource)
  });

this._contactsService.onContactsChanged
.pipe(takeUntil(this._unsubscribeAll))
.subscribe(contacts => {
    this.contacts = contacts;

  /*  this.checkboxes = {};
    contacts.map(contact => {
        this.checkboxes[contact.id] = false;
    });*/
});

this._contactsService.onSelectedContactsChanged
.pipe(takeUntil(this._unsubscribeAll))
.subscribe(selectedContacts => {
  /*  for ( const id in this.checkboxes )
    {
        if ( !this.checkboxes.hasOwnProperty(id) )
        {
            continue;
        }

        this.checkboxes[id] = selectedContacts.includes(id);
    }*/
    this.selectedContacts = selectedContacts;
});

this._contactsService.onUserDataChanged
.pipe(takeUntil(this._unsubscribeAll))
.subscribe(user => {
    this.user = user;
});

this._contactsService.onFilterChanged
.pipe(takeUntil(this._unsubscribeAll))
.subscribe(() => {
    this._contactsService.deselectContacts();
});
  }




ngOnDestroy(): void
{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
}


editContact(contact): void
{
    this.dialogRef = this._matDialog.open(TrainingFormComponent, {
        panelClass: 'training-form-dialog',
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

                    this._contactsService.updateContact1(formData.getRawValue());

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

/**
 * Delete Contact
 */
deleteContact(contact): void
{
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result )
        {
            this._contactsService.deleteContact(contact);
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
    this._contactsService.toggleSelectedContact(contactId);
}

/**
 * Toggle star
 *
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

    this._contactsService.updateUserData(this.user);
}


}
 


