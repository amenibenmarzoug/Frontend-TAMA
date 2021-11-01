
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { EntreprisesService } from 'app/main/apps/entreprises/entreprises.service';
import { EntrepriseFormComponent } from 'app/main/apps/entreprises/entreprise-form/entreprise-form.component';
import { Enterprise } from 'app/shared/models/enterprise.model';
@Component({
    selector: 'app-entreprise-list',
    templateUrl: './entreprise-list.component.html',
    styleUrls: ['./entreprise-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EntrepriseListComponent implements OnInit, OnDestroy {

    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    alertDialog: MatDialogRef<AlertDialogComponent>;
    enterprises: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'nameP', 'email', 'phone', 'website', 'classe', 'buttons'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    enterprise: Enterprise
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    id: number;
    disabled: boolean = false
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EntreprisesService} _entreprisesService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _entreprisesService: EntreprisesService,
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
        this.dataSource = new FilesDataSource(this._entreprisesService);

        this._entreprisesService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.enterprises = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        this._entreprisesService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id);
                }
                this.selectedContacts = selectedContacts;
            });

        this._entreprisesService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._entreprisesService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._entreprisesService.deselectContacts();
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
     * Edit contact
     *
     * @param contact
     */
    editEnterprise(contact): void {
        this.dialogRef = this._matDialog.open(EntrepriseFormComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                contact: contact,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':
                        /*  this._entreprisesService.updateContact1(formData.getRawValue(), this._entreprisesService.classe).then(response => {
                              console.log("RESULTAT");
                              console.log(response);
                              //resolve(res);
                          })
                              .catch(err => {
                                  console.log("ERREUR");
                                  
                                  console.log(err);
                                  // reject(err); // Here.
                              });*/
                              console.log("ENTERPRISE");
                              console.log(new Enterprise(formData.getRawValue()));
                        //this._entreprisesService.updateContact1(new Entreprise(formData.getRawValue()), this._entreprisesService.classe).subscribe(
                            this._entreprisesService.updateEnterprise1(new Enterprise(formData.getRawValue())).subscribe(

                            data => {
                                this._entreprisesService.getEnterprises();
                                console.log("data on submit");



                            },
                            err => {


                                this.addAlert(err.error.message, formData);

                            });

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

    addAlert(message, formValue): void {
        this.alertDialog = this._matDialog.open(AlertDialogComponent, {
            disableClose: false
        });

        this.alertDialog.componentInstance.dialogMessage = message;

        this.alertDialog.afterClosed().subscribe(result => {
            if (result) {

            }
            this.dialogRef = this._matDialog.open(EntrepriseFormComponent, {
                panelClass: 'contact-form-dialog',
                data: {
                    contact: formValue.value,
                    action: 'edit'
                }
            });
            this.alertDialog = null;
        });
    }
    /**
     * Delete Contact
     */
    deleteContact(id): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(id)
                this._entreprisesService.deleteContact(id);
            }
            this.confirmDialogRef = null;
        });

    }

    ValidateContact(contact) {
        this.disabled = true;

        this._entreprisesService.ValidateContact(contact)
    }

    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId): void {
        this._entreprisesService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void {
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
