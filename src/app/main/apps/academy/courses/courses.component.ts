import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';

import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

import { CursusFormComponent } from '../cursus-form/cursus-form.component';


@Component({
    selector   : 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class AcademyCoursesComponent implements OnInit, OnDestroy
{
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    cursusId:any;
    filteredCourses: any[];
    currentCategory: string;
    searchTerm: string;
    dialogRef: any ; 
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    duration: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        public dialog: MatDialog
    )

    
    {
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
    ngOnInit(): void
    {
        // Subscribe to categories
        this._academyCoursesService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
       this._academyCoursesService.onCoursesChanged
        .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(courses => {
               this.filteredCourses = this.coursesFilteredByCategory = this.courses = courses;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
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
    filterCoursesByCategory(): void
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else
        {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                
                return course.category === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.coursesFilteredByCategory;
        }

        //filter with cursusName and cursusCategory 
       else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.cursusName.toLowerCase().includes(searchTerm);
            });
        }
    }

    openDialog() {
        let dialogRef = this.dialog.open(FuseConfirmDialogComponent,{
            disableClose: false});
            dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });

       /* this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });*/
      }



//open the dialog of cursus add (not used now)
      openDialog1() {
        this.dialogRef = this.dialog.open(CursusFormComponent, {
            panelClass: 'cursus-form-dialog',
            data      : {
                action: 'new'
            }
        });
        
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )

                {
                    console.log(`Dialog result before return: ${response}`);

                    return;
                }
                console.log(response.getRawValue());

                //this._academyCoursesService.create(response.getRawValue());
               // this._academyCoursesService.saveCourse(response.getRawValue());
               // console.log(`Dialog result after return: ${response}`);

            });
            console.log(`DDETECCTED`); 
       
    }
 /*   editCourse(course): void
    {
        console.log("eni fel ediiitdialog");
        this.dialogRef = this.dialog.open(CursusFormComponent, {
            panelClass: 'cursus-form-dialog',
            data      : {
                course:course,
                action : 'edit'
            }
            
        })
        //console.log(Action);

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                console.log("action edit");
                console.log(actionType);
                switch ( actionType )
                {
                    /**
                     * Save
                     */
              /*     case 'save':

                        this._academyCoursesService.updateCourse1(formData.getRawValue());
                        console.log("saaaaaaaaaaaaave");
                        console.log(course.id);
                        console.log("response");
                        console.log(response);

                        console.log("form data");
                        console.log(formData.getRawValue());


                        break;
                    /**
                     * Delete
                     */
                /*   case 'delete':
                         console.log(course.id);


                       this.deleteCursus(course.id);
                       console.log("deleeeeeeeeeeeete");

                        break;
                }
            });
    }*/

   /**
     * Edit contact
     *
     * @param contact
     */
    editCourse(course): void
    {
        this.dialogRef = this.dialog.open(CursusFormComponent, {
            panelClass: 'cursus-form-dialog',
            data      : {
                course: course,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        console.log("save cursus");

                        this._academyCoursesService.updateCourse1(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteCursus(course.id);

                        break;
                }
            });
    }

    deleteCursus(contact): void
    {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.dialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._academyCoursesService.deleteCursus(contact);
            }
            this.dialogRef = null;
        });

    }
}
