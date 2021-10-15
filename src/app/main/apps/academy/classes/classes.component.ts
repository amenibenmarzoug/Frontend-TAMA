import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

import { Router } from '@angular/router';
import { ClassesService } from '../../academy/classes.service';
import { ClassFormComponent } from './class-form/class-form.component';
import { ModuleInst } from '../program-inst-detail/tabs/module-inst/moduleInst.model';
import { Module } from '../programDetails/tabs/module/module.model';
import { ThematiqueInst } from '../program-inst-detail/tabs/thematique-inst/thematiqueInst.model';
import { ClasseParticipantsService } from './classe-participants/classe-participants.service';
import { ClasseParticipantsComponent } from './classe-participants/classe-participants.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { ProgramInst } from '../programInst.model';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.scss'],
    animations: fuseAnimations

})
export class ClassesComponent implements OnInit {

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

    themes: any[];
    lastprogInst: any;


    themesFilteredByCategory: any[];
    filteredThemes: any[];

    modulesInst: ModuleInst[];

    modules: Module[];
    hasSelectedModules: boolean;
    modulesOfTheme: Module[];
    lastThemeInst: ThematiqueInst;
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];

    // Private
    private _unsubscribeAll: Subject<any>;



    /**
     * Constructor
     *
     * @param {ProgramsInstService} _academyProgramsInstService
     */
    constructor(
        //  private _academyProgramsInstService:ProgramsInstService,
        private _academyProgramsInstService: ClassesService,
        public dialog: MatDialog,
        private router: Router,
        private _participantService: ClasseParticipantsService

    ) {
        // Set the defaults
        this.currentCategory = 'Toutes';
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
        this._academyProgramsInstService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._academyProgramsInstService.onProgramsInstChanged
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
    filterClassesByCategory(): void {
        // Filter
        if (this.currentCategory === 'Toutes') {
            this.programsFilteredByCategory = this.programs;
            this.filteredPrograms = this.programs;
        }
        else {
            if (this.currentCategory === 'Non confirmées') {
                this.programsFilteredByCategory = this.programs.filter((course) => {
                    if (course.validated == false) {
                        return course;
                    }
                });
            }
            else {
                this.programsFilteredByCategory = this.programs.filter((course) => {
                    if (course.validated == true) {
                        return course;
                    }
                });
            }
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

        // filter with cursusName and cursusCategory 
        else {
            this.filteredPrograms = this.programsFilteredByCategory.filter((program) => {
                return program.programInstName.toLowerCase().includes(searchTerm);
            });
        }
    }





    filterThemesByCategory(): void {
        // Filter
        if (this.currentCategory === 'all') {
            this.themesFilteredByCategory = this.themes;
            this.filteredThemes = this.themes;
        }
        else {
            this.themesFilteredByCategory = this.themes.filter((theme) => {

            });

            this.filteredThemes = [...this.themesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterThemesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterThemesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredThemes = this.themesFilteredByCategory;
        }

        // filter with cursusName and cursusCategory 
        else {
            this.filteredThemes = this.themesFilteredByCategory.filter((theme) => {
                return theme.themeName.toLowerCase().includes(searchTerm);
            });
        }
    }


    /**
     * New contact
     */
    newProgram(): void {
        this.dialogRef = this.dialog.open(ClassFormComponent, {
            panelClass: 'classe-form-dialog',
            data: {
                action: 'new',
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._academyProgramsInstService.addClass(response.getRawValue(), this._academyProgramsInstService.program);

            });
    }


    choosePlace(programInst):void{
        this.dialogRef = this.dialog.open(PlaceFormComponent, {
            height: '50%',
            width: '30%',
            panelClass: 'contact-form-dialog',
            data: {
                programInst: programInst,
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
            })
    }


    listeDesParticipants(programInst): void {
        this._participantService.classeId = programInst;
        this.dialogRef = this.dialog.open(ClasseParticipantsComponent, {
            height: '80%',
            width: '60%',
            panelClass: 'contact-form-dialog',
            data: {
                //programInst: programInst,
                //action: 'edit'
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
            })

    }
    /**
      * Edit contact
      *
      * @param contact
      */
    editProgramInst(programInst): void {
        this.dialogRef = this.dialog.open(ClassFormComponent, {
            panelClass: 'cursus-form-dialog',
            data: {
                programInst: programInst,
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
                        console.log("this program inst")
                        console.log(programInst)
                        let newProgramInst=new ProgramInst(formData.getRawValue());
                        newProgramInst.id=programInst.id;
                        newProgramInst.place=programInst.place;
                        newProgramInst.program=programInst.program;
                        newProgramInst.validated=programInst.validated;
                        this._academyProgramsInstService.updateProgramInst(newProgramInst);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteCursus(programInst.id);

                        break;
                }
            });
    }
    goToProgramModuleInst(id) {
        this.router.navigate(['/apps/academy/classeDetail', id]);
    }



    confirmClass(programInst): void {
        this._academyProgramsInstService.confirmProgramInst(programInst);
    }

    cancelClass(programInst): void {
        this._academyProgramsInstService.cancelProgramInst(programInst);
    }

    deleteCursus(contact): void {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._academyProgramsInstService.deleteProgramInst(contact);
            }
            this.dialogRef = null;
        });

    }

}
