import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AcademyProgramsService } from '../../../programs.service';
import { ProgramFormComponent } from '../../../programs/program-form/program-form.component';
import { ProgramDetailsService } from '../../programDetails.service';
import { ThematiqueFormComponent } from './thematique-form/thematique-form.component';

@Component({
    selector: 'thematique',
    templateUrl: './thematique.component.html',
    styleUrls: ['./thematique.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ThematiqueComponent implements OnInit, OnDestroy {
    categories: any[];
    themes: any[];
    programsFilteredByCategory: any[];
    filteredThemes: any[];
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
     * @param {ProgramDetailsService} _programDetailsService
     */
    constructor(
        private _programDetailsService: ProgramDetailsService,
        public dialog: MatDialog
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

        // Subscribe to courses
        this._programDetailsService.onThemeChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.filteredThemes = this.programsFilteredByCategory = this.themes = courses;
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
            this.programsFilteredByCategory = this.themes;
            this.filteredThemes = this.themes;
        }
        else {
            this.programsFilteredByCategory = this.themes.filter((course) => {

                return course.category === this.currentCategory;
            });

            this.filteredThemes = [...this.programsFilteredByCategory];

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
            this.filteredThemes = this.programsFilteredByCategory;
        }

        //filter with cursusName and cursusCategory 
        else {
            this.filteredThemes = this.programsFilteredByCategory.filter((course) => {
                return course.cursusName.toLowerCase().includes(searchTerm);
            });
        }
    }

    openDialog() {
        let dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });


    }



    //open the dialog of cursus add (not used now)
    openDialog1() {
        this.dialogRef = this.dialog.open(ThematiqueFormComponent, {
            panelClass: 'cursus-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    console.log(`Dialog result before return: ${response}`);

                    return;
                }
                console.log(response.getRawValue());


            });
        console.log(`DDETECCTED`);

    }


    /**
      * Edit contact
      *
      * @param contact
      */
    editTheme(theme): void {
        this.dialogRef = this.dialog.open(ThematiqueFormComponent, {
            panelClass: 'theme-form-dialog',
            data: {
                program: theme,
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

                        console.log("save thème");

                        this._programDetailsService.updateTheme(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteTheme(theme.id);

                        break;
                }
            });
    }

    deleteTheme(theme): void {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._programDetailsService.deleteTheme(theme);
            }
            this.dialogRef = null;
        });

    }
}
