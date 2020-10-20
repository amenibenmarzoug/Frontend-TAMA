import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CourseTrainerService } from 'app/main/apps/course-trainer/coursetrainer.service';
import { Disponibility } from 'app/main/apps/disponibility-trainer/disponibility.model';

@Component({
    selector: 'app-course-trainer',
    templateUrl: './course-trainer.component.html',
    styleUrls: ['./course-trainer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CourseTrainerComponent implements OnInit, OnDestroy {

    //@ViewChild('dialogContent')
    //dialogContent: TemplateRef<any>;
    categories = ['Web', 'android'];
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    selectedTrainer: any;
    selectedCourse: any;
    selectedContacts: any[] = [];
    courseSessions: any[] = [];
    disponibilities: Disponibility[] = [];
    disponibility: Disponibility;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    alertDialog:MatDialogRef<AlertDialogComponent>;
    messageChange:string;
    messageAdd:string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CourseTrainerService} _courseTrainerService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _courseTrainerService: CourseTrainerService,
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
        //this._courseTrainerService.getDisponibilities();
        this._courseTrainerService.onSelectedContactsChanged
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
                this._courseTrainerService.onSearchTextChanged.next(searchText);
            });
    }

    bringList(): any {
        if ((this._courseTrainerService.trainerId == null) || (this._courseTrainerService.courseId == null))
            return false;
        else
            return true;

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Reset the search
        this._courseTrainerService.onSearchTextChanged.next('');

        // Unsubscribe from all subscriptions
        this._courseTrainerService.selectedContacts=[];
        this.selectedCourse=null;
        this._courseTrainerService.filterBy=null;
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */


    buttonEnable(): any {
        if ((this.selectedCourse == null) || (this.selectedTrainer == null))
         return false;
        else
            return true;
    }

    buttonSee() {


        this._courseTrainerService.selectedContacts.forEach(select => {
            this.selectedContacts.push(select.toString());

        });

        console.log("selected contacts");
        console.log(this.selectedContacts);
        console.log(this._courseTrainerService.trainers);

        this._courseTrainerService.trainers.forEach(trainer => {

            if (this.selectedContacts.includes(trainer.id.toString())) {
                this.selectedTrainer = trainer;

            }

        });
        this._courseTrainerService.courses.forEach(course => {

            if (course.id == this._courseTrainerService.courseId) {
                this.selectedCourse = course;

            }

        });
        console.log("selected trainer");
        console.log(this.selectedTrainer);
        console.log("selected course");
        console.log(this.selectedCourse);
        if((this.selectedCourse == null) || (this.selectedTrainer == null)){
            console.log("Veuillez séléctionner la formation et le formateur concernés !")
            this.selectOptions();
        
        }
        else {if (this.selectedCourse.trainer == null) {
            this.messageAdd='Voulez vous ajouter ce formateur à la formation '+ this.selectedCourse.courseName+ ' ?';
            this.changeTrainer(this.selectedCourse,this.selectedTrainer,this.messageAdd);
        }
        else {
            console.log("Vous ne pouvez pas ajouter un formateur");
            this.messageChange='Cette formation a déjà '+this.selectedCourse.trainer.firstName+ ' '+this.selectedCourse.trainer.lastName+' comme formateur, voulez vous le changer ?'
            this.changeTrainer(this.selectedCourse,this.selectedTrainer,this.messageChange);
        }}
        this.courseSessions = [];
        this.disponibilities = [];
        this.selectedContacts = [];
        this.selectedCourse=null;
        this.selectedTrainer=null;
        //this._courseTrainerService.selectedContacts = [];

    }


    selectOptions():void{
        this.alertDialog = this._matDialog.open(AlertDialogComponent, {
            disableClose: false
        });

        this.alertDialog.componentInstance.dialogMessage = 'Veuillez selectionner la formation et le formateur concernés';

        this.alertDialog.afterClosed().subscribe(result => {
            if (result) {
                console.log("selectionner");
               
            }
            this.alertDialog = null;
        });
    }

    changeTrainer(course,trainer,message): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = message;

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("changer formateur");
                course.trainer = trainer;


                this._courseTrainerService.updateCourse(course);
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
