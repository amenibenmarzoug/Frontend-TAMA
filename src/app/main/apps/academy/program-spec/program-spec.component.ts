import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgramSpecService } from '../program-spec.service';
import { ProgramSpecFormComponent } from './program-spec-form/program-spec-form.component';

@Component({
    selector: 'app-program-spec',
    templateUrl: './program-spec.component.html',
    styleUrls: ['./program-spec.component.scss'],
    animations: fuseAnimations
})
export class ProgramSpecComponent implements OnInit {

    categories: any[];
    programs: any[];
    programsFilteredByCategory: any[];
    programId: any;
    filteredPrograms: any[];
    currentCategory: string;
    searchTerm: string;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;





    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramsInstService} _academyProgramsInstService
     */
    constructor(
        private _academyProgramsSpecService: ProgramSpecService,
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
        this._academyProgramsSpecService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._academyProgramsSpecService.onProgramsChanged
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
                return program.programInstName.toLowerCase().includes(searchTerm);
            });
        }
    }


    /**
     * New contact
     */
    newProgram(): void {
        this.dialogRef = this.dialog.open(ProgramSpecFormComponent, {
            disableClose: true,
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

                this._academyProgramsSpecService.addProgramSpec(response.getRawValue());
            });
    }


    /**
      * Edit contact
      *
      * @param contact
      */

    editProgram(program): void {
        this.dialogRef = this.dialog.open(ProgramSpecFormComponent, {
            disableClose: true,
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



                        this._academyProgramsSpecService.updateProgram(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteProgramSpec(program);

                        break;
                }
            });
    }
    goToProgramModule(id) {
        this.router.navigate(['/apps/academy/programSpecDetails', id]);
        console.log("programInst id" + id)
    }

    deleteProgramSpec(programSpec): void {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.confirmMessage = 'Etes vous sûr de supprimer la classe ' + programSpec.programName +' ?';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                    this._academyProgramsSpecService.deleteProgram(programSpec);
            }
            this.dialogRef = null;
        });

    }


}
