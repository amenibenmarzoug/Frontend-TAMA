import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ClassroomsService } from '../classrooms.service';
import { ClassroomsFormComponent } from '../classrooms-form/classrooms-form.component';
import { Router } from '@angular/router';

@Component({
    selector     : 'contacts-contact-list',
    templateUrl  : './classrooms-list.component.html',
    styleUrls    : ['./classrooms-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ClassroomsListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    classrooms: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'capacity','equipments', 'buttons'];
    selectedClasses: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id:number
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClassroomsService} _classroomsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _classroomsService: ClassroomsService,
        public _matDialog: MatDialog,
        private router: Router,

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
        this.dataSource = new FilesDataSource(this._classroomsService);

        this._classroomsService.onClassroomsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(classrooms => {
                this.classrooms = classrooms;

                this.checkboxes = {};
                classrooms.map(classroom => {
                    this.checkboxes[classroom.id] = false;
                });
            });

        this._classroomsService.onSelectedClassroomsChanged
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
                this.selectedClasses = selectedContacts;
            });


        this._classroomsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
              this._classroomsService.deselectClassrooms();
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
    editContact(classroom): void
    {
        this.dialogRef = this._matDialog.open(ClassroomsFormComponent, {
            disableClose: true ,
            panelClass: 'contact-form-dialog',
            data      : {
                classroom: classroom,
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

                        this._classroomsService.updateClassroom(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteClassroom(classroom.id);

                        break;
                }
            });
    }
    goToEquipment(id){
        this.router.navigate(['./apps/ressource', id]);
    }
    /**
     * Delete Contact
     */
    deleteClassroom(id): void
  {
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if ( result )
          { 
              console.log(id)
              this._classroomsService.deleteClassroom(id);
          }
          this.confirmDialogRef = null;
      });

  }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(classroomId): void
    {
        this._classroomsService.toggleSelectedClassroom(classroomId);
    }

    
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ClassroomsService} _classroomsService
     */
    constructor(
        private _classroomsService: ClassroomsService
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
        return this._classroomsService.onClassroomsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
