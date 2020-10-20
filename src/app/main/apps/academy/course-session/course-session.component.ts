import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { DateAdapter } from '@angular/material/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { CourseSessionService } from 'app/main/apps/academy/course-session.service';

import { CourseSessionFormComponent } from './course-session-form/course-session-form.component';
import { CalendarEventModel } from '../../calendar/event.model';
import { CourseSession } from './courseSession.model';
import { EventCourseSession } from './event-courseSession.model';

@Component({
    selector: 'app-course-session',
    templateUrl: './course-session.component.html',
    styleUrls: ['./course-session.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CourseSessionComponent implements OnInit {

    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    cursusId: number;
    filteredTrainings: any[];
    currentTraining: string;
    event: CalendarEventModel;
    courseSession: CourseSession;
    courseSessionAdded: CourseSession;
    courseSessionEvent:EventCourseSession;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    alertDialog: MatDialogRef<AlertDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TrainingsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _contactsService: CourseSessionService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private dateAdapter: DateAdapter<Date>
    ) {
        this.dateAdapter.setLocale('fr');
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
    ngOnDestroy(): void {
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
    newContact(): void {
        this.dialogRef = this._matDialog.open(CourseSessionFormComponent, {
            panelClass: 'training-form-dialog',
            data: {
                action: 'new',
                foreignKeyCourse: this._contactsService.chosenCourse,
                foreignKeyInstitution: this._contactsService.chosenClassRoom
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this.courseSession = response.getRawValue();
                this.courseSession.classRoom = this._contactsService.chosenClassRoom;

                this.event = new CalendarEventModel(null);

          
                this.event.title = this.courseSession.courseSessionName
                this.event.start = this.courseSession.courseSessionBeginDate;
                this.event.end = this.courseSession.courseSessionEndDate;
                /*
                this._contactsService.saveCourseSessionAndEvent(this.courseSession,this.event).then(( 
                    
                )=>{
                   
                });*/
             
            });
    }
    
    addNewCourseSession(): void {

        if ((this._contactsService.chosenCursusId == null) ||(this._contactsService.chosenCursusId == 'all')){
            this.addCourseSessionAlert("Veuillez choisir le Cursus");
        }
        else {

            if ((this._contactsService.chosenCourse == null) ||(this._contactsService.chosenTrainingId == 'all')){
            this.addCourseSessionAlert("Veuillez choisir une formation");
            }
            else{
                if (((this._contactsService.chosenInstitutionId == null) ||(this._contactsService.chosenInstitutionId == 'all')||
                (this._contactsService.chosenClassRoom == null) ||(this._contactsService.chosenClassRoom== 'all'))) {
                    this.addCourseSessionAlert("Veuillez choisir l'institution et la salle où la formaation aura lieu");

                }

                else {
                    //this.addCourseSessionAlert("jaweek behi sahby ahhahaha");
                    this.dialogRef = this._matDialog.open(CourseSessionFormComponent, {
                        panelClass: 'training-form-dialog',
                        data: {
                            action: 'new',
                            foreignKeyCourse: this._contactsService.chosenCourse,
                            foreignKeyInstitution: this._contactsService.chosenClassRoom,
                            //courseDate: this._contactsService.courseDate,
                        }
                    });
            
                    this.dialogRef.afterClosed()
                        .subscribe((response: FormGroup) => {
                            if (!response) {
                              
                                return;
                            }
            
                            this.courseSession = response.getRawValue();
                            this.courseSession.classRoom = this._contactsService.chosenClassRoom;
                           // console.log("data course jett?"); 
                           // console.log(this.courseSession.dateCourse) ; 
                            //this.courseSession.courseSessionBeginDate.setFullYear(this.courseSession.dateCourse.getFullYear()); 
                           // console.log("coursesessionn setineha mel component"); 
                            //console.log(this.courseSession.courseSessionBeginDate) ; 
                            //this.courseSession.courseSessionBeginDate
                            //console.log("date passé au service"); 
                            //console.log(this._contactsService.courseDate);
                            console.log("session to add");
                            console.log(this.courseSession);
            
                            this.event = new CalendarEventModel(null);
            
                      
                            this.event.title = this.courseSession.courseSessionName
                            this.event.start = this.courseSession.courseSessionBeginDate;
                            this.event.end = this.courseSession.courseSessionEndDate;
                      
                            this.confirmAddCourseSession();
                         
                        });
                        

                }
               
                

            }
        
        }

    }

    addCourseSessionAlert(message): void {
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

    confirmAddCourseSession(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les modifications créées?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("ajout scéance avec succès");

                this._contactsService.saveCourseSessionAndEvent(this.courseSession,this.event)
               


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
}



