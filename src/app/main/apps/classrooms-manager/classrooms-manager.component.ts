import { MyClasses } from 'app/main/apps/classrooms/classrooms.model';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ClassroomsManagerFormComponent } from './classrooms-manager-form/classrooms-manager-form.component';
import { ClassroomsManagerService } from './classrooms-manager.service';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-classes',
    templateUrl: './classrooms-manager.component.html',
    styleUrls: ['./classrooms-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClassroomsManagerComponent implements OnInit, OnDestroy {
    classes: MyClasses[] = [];;
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    alertDialog: MatDialogRef<AlertDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClassroomsManagerService} _classroomsManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _classroomsManagerService: ClassroomsManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    ) {
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
    ngOnInit(): void {
        this._classroomsManagerService.onSelectedContactsChanged
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
                this._classroomsManagerService.onSearchTextChanged.next(searchText);
            });

            this._classroomsManagerService.institution= null;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Reset the search
        this._classroomsManagerService.onSearchTextChanged.next('');

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

  
    newContact(): void {

        if (this._classroomsManagerService.institution== null){
            this.addModuleAlert("Veuillez choisir une institution");
         }
         else {

        this.dialogRef = this._matDialog.open(ClassroomsManagerFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'new'
            }
        });
            
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                //   console.log(response) ;
                if (!response) {
                    return;
                }

                //  console.log("entreprise button");
                // console.log(this._participantsService.entreprise);

                else {
                this._classroomsManagerService.addClasse(response.getRawValue(), this._classroomsManagerService.institution);
                }
            });
        }
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    addModuleAlert(message): void {
        this.alertDialog = this._matDialog.open(AlertDialogComponent, {
            disableClose: false
        });

        this.alertDialog.componentInstance.dialogMessage = message;

        this.alertDialog.afterClosed().subscribe(result => {
            if (result) {

            }
            this.alertDialog = null;
        });
    }

    ErrorMessage(message): void {
        Swal.fire(
          {
            title: message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#38a9ff',
            //cancelButtonColor: '#d33',
            confirmButtonText: 'Retour'
          }
      )
      
      }

}
