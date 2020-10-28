import { Component, OnInit,ViewEncapsulation,ViewChild,ElementRef} from '@angular/core';
import { TrainingsService } from '../trainings.service';
import { fuseAnimations } from '@fuse/animations';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { FuseUtils } from '@fuse/utils';

import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


import { TrainingFormComponent } from './training-form/training-form.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class TrainingsComponent implements OnInit {
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    cursusId: number   ; 

    // Private
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    alertDialog: MatDialogRef<AlertDialogComponent>;
    training: any;

    /**
     * Constructor
     *
     * @param {TrainingsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _contactsService: TrainingsService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

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
        this._contactsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.hasSelectedContacts = selectedContacts.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._contactsService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Reset the search
        this._contactsService.onSearchTextChanged.next('');

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */
  newContact(): void
    {
        this.dialogRef = this._matDialog.open(TrainingFormComponent, {
            panelClass: 'training-form-dialog',
            data      : {
                action: 'new',
                //cursusId: cursusId
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                console.log(`Dialog result after return: ${response}`);

               //this._contactsService.updateContact(response.getRawValue(),this._contactsService.course);
               console.log(this._contactsService.program);
                this._contactsService.updateContact(response.getRawValue(),this._contactsService.program);
                console.log(`Dialog result after return: ${response.getRawValue().data}`);

            });
    }

    addNewCourse(): void {

        if ((this._contactsService.program == null)){
              this.addCourseAlert("Veuillez choisir le Cursus");
          }
         
                  else {
                      //this.addCourseSessionAlert("jaweek behi sahby ahhahaha");
                      this.dialogRef = this._matDialog.open(TrainingFormComponent, {
                          panelClass: 'training-form-dialog',
                          data: {
                              action: 'new',
                              //foreignKeyCourse: this._contactsService.chosenCourse,
                              //foreignKeyInstitution: this._contactsService.chosenClassRoom,
                              //courseDate: this._contactsService.courseDate,
                          }
                      });
              
                      this.dialogRef.afterClosed()
                          .subscribe((response: FormGroup) => {
                              if (!response) {
                                
                                  return;
                              }
                              this.training= response.getRawValue();
                                      
                              this.confirmAddCourse();
                           
                          });
                        }
    }
       
  
      addCourseAlert(message): void {
          this.alertDialog = this._matDialog.open(AlertDialogComponent, {
              disableClose: false
          });
  
          this.alertDialog.componentInstance.dialogMessage = message;
  
          this.alertDialog.afterClosed().subscribe(result => {
              if (result) {
                  console.log("selectionner format");
  
              }
              this.alertDialog = null;
          });
      }
  
      confirmAddCourse(): void {
          this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
              disableClose: false
          });
  
          this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les données entrées?';
  
          this.confirmDialogRef.afterClosed().subscribe(result => {
              if (result) {
                  console.log("ajout formation avec succès");
  
                  this._contactsService.updateContact(this.training,this._contactsService.program);
                    
              }
              this.confirmDialogRef = null;
          });
  
      }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

   
}
