import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ParticipantsService } from 'app/main/apps/participants/participants.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit, OnDestroy {

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedContacts: boolean;
    isIndeterminate: boolean;
    selectedContacts: string[];
    classes: any[];
    entreprise: any;



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
        public _matDialog: MatDialog,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.classes = this._participantsService.classes;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._participantsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.selectedContacts = selectedContacts;
                setTimeout(() => {
                    this.hasSelectedContacts = selectedContacts.length > 0;
                    this.isIndeterminate = (selectedContacts.length !== this._participantsService.participants.length && selectedContacts.length > 0);
                }, 0);
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
     * Select all
     */
    selectAll(): void {
        this._participantsService.selectContacts();
    }

    addToClasse(id): void {
        var nombreParticipantsClasse = 0;
        var selectedparticipant = 0;
        this._participantsService.id = +id;
        console.log(this._participantsService.participants.length)
        // this._participantsService.participants.map(contact => {
        for (let index = 0; index < this._participantsService.participants.length; index++) {
            if (this._participantsService.participants[index].programInstance.id == id && this._participantsService.participants[index].status == "ACCEPTED") {

                nombreParticipantsClasse++;
            }
        }
        // })

        this._participantsService.participants.map(contact => {
            for (let index = 0; index < this.selectedContacts.length; index++) {
                if (contact.id == Number(this.selectedContacts[index])) {

                    this._participantsService.selectedContactsList.push(contact);
                    if (contact.programInstance == null) {
                        selectedparticipant++;
                    }
                    console.log("hedha 1 " + nombreParticipantsClasse)
                    console.log("hedha 2 " + selectedparticipant)
                    console.log("gadesh " + (nombreParticipantsClasse + selectedparticipant))
                    if ((selectedparticipant + nombreParticipantsClasse) > 15) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Le nombre de participants dans ce classe va dépasser le 15!',
                            text: 'Veuillez vous continuer?',
                            showCancelButton: true,
                            confirmButtonText: 'OUI',
                            cancelButtonText: 'NON'
                        }).then((result) => {
                            if (result.value) {
                                this._participantsService.updateClasse(contact);
                                Swal.fire(
                                    'Confirmation',
                                    'Les participants ont été ajoutés avec succès au groupe.',
                                    'success'
                                )
                            }
                            else {
                                Swal.fire(
                                    'Annulation',
                                    'Aucun participant n\'a été ajouté dans le groupe.',
                                    'error'
                                )
                            }
                        }
                        )
                    }
                    else {
                        this._participantsService.updateClasse(contact);
                    }

                }
            }


        });

        this._participantsService.selectedContactsList = [];
        this.deselectAll();

    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this._participantsService.deselectContacts();
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes vous sûr de la suppression des participants séléctionnés?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this._participantsService.deleteSelectedContacts();
                }
                this.confirmDialogRef = null;
            });
    }



}
