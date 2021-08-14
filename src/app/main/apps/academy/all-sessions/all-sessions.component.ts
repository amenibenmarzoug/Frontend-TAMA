import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';
import { Disponibility } from 'app/main/apps/disponibility-trainer/disponibility.model';

import { ParticipantListComponent } from 'app/main/apps/participants/participant-list/participant-list.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AllSessionsComponent implements OnInit, OnDestroy {

  categories = ['Web', 'android'];
  dialogRef: any;
  hasSelectedContacts: boolean;
  searchInput: FormControl;
  selectedContacts: any[] = [];
  courseSessions: any[] = [];
  courseSessionsDispon: any[] = [];
  trainersDispo: any[] = [];
  disponibilities: Disponibility[] = [];
  disponibilitiesAdded: Disponibility[] = [];
  disponibility: Disponibility;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  test: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _allSessionsService: AllSessionsService,
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
      this._allSessionsService.onSelectedContactsChanged
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
              this._allSessionsService.onSearchTextChanged.next(searchText);
          });
  }

  bringList(): any {
      if ((this._allSessionsService.trainerId == null) || (this._allSessionsService.courseId == null))
          return false;
      else
          return true;

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Reset the search
    /*  this._allSessionsService.onSearchTextChanged.next('');
      this._allSessionsService.deselectContacts();
      this._allSessionsService.courseId = null;
      this._allSessionsService.trainer = null;
      this._allSessionsService.filterBy = null;
      this._allSessionsService.contacts = [];*/
      // Unsubscribe from all subscriptions
      this._allSessionsService.filterBy = null;
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * New contact
   */

  buttonSee() {
      this._allSessionsService.getDisponibilities();

      this._allSessionsService.selectedContacts.forEach(select => {
          this.selectedContacts.push(select.toString());

      });
      this.disponibilities = this._allSessionsService.disponibilities;
      this.disponibilities.forEach(disponibility => {
          this.courseSessionsDispon.push(disponibility.courseSession);
          //  this.courseSessions.push(disponibility.courseSession);
          this.trainersDispo.push(disponibility.trainer);

      });

      if ((this._allSessionsService.trainer == null) || (this._allSessionsService.courseId == null)) {
          //this.chooseDispo("Veuillez choisir le formateur et la formation");
          this.ErrorMessage("Veuillez choisir le formateur et la formation");
      }
      else {
          if (this.selectedContacts.length == 0) {
              //this.chooseDispo("Veuillez choisir la/les disponibilité(s)");
              this.ErrorMessage("Veuillez choisir la/les disponibilité(s)");
          }
          else {
              //Adding Trainer's Disponibilities
              console.log(this.disponibilities);

              this._allSessionsService.contacts.forEach(courseSession => {
                  this.test = false;
                  console.log("selected dispo in for");
                  console.log(this.selectedContacts);
                  if (this.disponibilities.length != 0) {
                      if (this.selectedContacts.includes(courseSession.id.toString())) {
                          if ((!this.courseSessions.includes(courseSession))) {// || (this.courseSessions.length == 0)) {
                              this.disponibility = new Disponibility(this._allSessionsService.trainer, courseSession);
                              console.log("avant dispo button");
                              console.log(this.disponibilities);

                              for (let i = 0; i < this.disponibilities.length; i++) {
                                  console.log(courseSession.id + " " + this._allSessionsService.trainer.id);
                                  console.log(this.courseSessionsDispon[i].id + " " + this.trainersDispo[i].id);
                                  if ((this.courseSessionsDispon[i].id.toString() == courseSession.id.toString()) && (this.trainersDispo[i].id.toString() == this._allSessionsService.trainer.id.toString())) {
                                      console.log("IN DISPONIBILITIES!!!");
                                      this.courseSessions = [];
                                      this.disponibilitiesAdded = [];
                                      this.test = true;
                                      break;
                                      //this.existingDispo();
                                  }
                                  else {
                                      if (!this.courseSessions.includes(courseSession)) {
                                          this.courseSessions.push(courseSession);
                                          this.disponibilitiesAdded.push(this.disponibility);
                                          console.log("not in disponibilities");
                                          continue;
                                      }
                                      //this.disponibilities.push(this.disponibility);
                                      // this.confirmDispo(this.disponibility);
                                      //this.courseSessions.push(courseSession);

                                      //console.log("dispo button");
                                      //console.log(this.disponibilities);
                                  }
                              }



                              console.log(this.courseSessionsDispon);
                              console.log(this.trainersDispo);



                          }
                      }
                  } else {
                      this.disponibility = new Disponibility(this._allSessionsService.trainer, courseSession);
                      this.disponibilitiesAdded.push(this.disponibility);
                  }

              });

              console.log("coursesessions included");
              console.log(this.disponibilitiesAdded);
              if (this.disponibilitiesAdded.length == 0)
                  this.existingDispo();
              else
                  this.confirmDispo(this.disponibilitiesAdded);
          }
      }
      this.courseSessions = [];
      this.disponibilities = [];
      this.selectedContacts = [];
      this.courseSessionsDispon = [];
      this.trainersDispo = [];
      this.disponibilitiesAdded = [];
      this._allSessionsService.getDisponibilities();
      // this._allSessionsService.selectedContacts=[];

  }


  existingDispo(): void {
      this.alertDialog = this._matDialog.open(AlertDialogComponent, {
          disableClose: false
      });

      this.alertDialog.componentInstance.dialogMessage = 'Vous avez déjà choisi ces dates';

      this.alertDialog.afterClosed().subscribe(result => {
          if (result) {
              console.log("selectionner");

          }
          this.alertDialog = null;
      });
  }

  chooseDispo(message): void {
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

  confirmDispo(disponibilities): void {
      this._allSessionsService.getDisponibilities();
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer votre disponibilité ?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {
              console.log("ajouter dispo");
              disponibilities.forEach(disponibility => {
                  this._allSessionsService.saveDisponibility(disponibility);
              });


          }
          this.confirmDialogRef = null;
      });

  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
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
