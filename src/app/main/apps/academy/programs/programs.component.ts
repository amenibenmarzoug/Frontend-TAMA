import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';

import { ProgramsService } from 'app/main/apps/academy/programs.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

import { ProgramFormComponent } from '../programs/program-form/program-form.component';
import { Router } from '@angular/router';


@Component({
    selector: 'academy-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.scss'],
    animations: fuseAnimations
})
export class ProgramsComponent implements OnInit, OnDestroy {
    categories: any[];
    programs: any[];
    programsFilteredByCategory: any[];
    programId: any;
    filteredPrograms: any[];
    currentCategory: string;
    searchTerm: string;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    duration: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramsService} _academyCoursesService
     */
    constructor(
        private _academyProgramsService: ProgramsService,
        public dialog: MatDialog,
        private router: Router,
    ) {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

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
        // Subscribe to categories
        this._academyProgramsService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._academyProgramsService.onProgramsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.filteredPrograms = this.programsFilteredByCategory = this.programs = courses;
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
     * Filter courses by category
     */
    filterCoursesByCategory(): void {
        // Filter
        if (this.currentCategory === 'all') {
            this.programsFilteredByCategory = this.programs;
            this.filteredPrograms = this.programs;
        }
        else {
            this.programsFilteredByCategory = this.programs.filter((course) => {

                return course.category === this.currentCategory;
            });

            this.filteredPrograms = [...this.programsFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredPrograms = this.programsFilteredByCategory;
        }

        //filter with cursusName and cursusCategory 
        else {
            this.filteredPrograms = this.programsFilteredByCategory.filter((program) => {
                return program.programName.toLowerCase().includes(searchTerm);
            });
        }
    }


    /**
     * New program
     */
    newProgram(): void {
        this.dialogRef = this.dialog.open(ProgramFormComponent, {
            panelClass: 'program-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._academyProgramsService.addProgram(response.getRawValue());
            });
    }


    /**
      * Edit program
      *
      * @param program
      */
    editProgram(program): void {
        this.dialogRef = this.dialog.open(ProgramFormComponent, {
            panelClass: 'cursus-form-dialog',
            data: {
                program: program,
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

                        this._academyProgramsService.updateProgram(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteProgram(program.id);

                        break;
                }
            });
    }
    goToProgramModule(id) {
        this.router.navigate(['/apps/academy/programDetails', id]);
        console.log("program id" + id)
    }

    deleteProgram(program): void {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._academyProgramsService.deleteProgram(program);
            }
            this.dialogRef = null;
        });

    }
}
