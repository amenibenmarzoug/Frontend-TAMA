import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';

import { CursusCoursesService } from 'app/main/apps/cursus/courses.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
//import { Router } from '@angular/router';
import { CursusFormComponent } from '../cursus-form/cursus-form.component';
import { Cursus } from '../cursus.model';

import { CursusCoursessService } from './coursess.service';


const USER_KEY = 'auth-user';
@Component({
    selector   : 'cursus-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class CursusCoursesComponent implements OnInit, OnDestroy
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
course: any ;
entreprise : any ;
    // Private
    private _unsubscribeAll: Subject<any>;
    cursus: any;

    /**
     * Constructor
     * @param {MatDialog} dialog
     * @param {CursusCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: CursusCoursesService,
        private serviceCursusId: CursusCoursessService,
        public dialog: MatDialog ,
      //  private router: Router
    )

    
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.entreprise = this._academyCoursesService.entreprise ;
        
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
       // this._unsubscribeAll.next();
       // this._unsubscribeAll.complete();
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
       /* else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.cursusName.toLowerCase().includes(searchTerm);
            });
        }*/
    }

   /* openDialog() {
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
      //}


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
                this._academyCoursesService.saveCourse(response.getRawValue());
               // console.log(`Dialog result after return: ${response}`);

            });
            console.log(`DDETECCTED`); 
       
    }
 

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
    getCursus(course) : void {
      
    // console.log(course.id);
    console.log("sending") ;
    //console.log(this.course.id) ;
     this.course=course ;
     this.serviceCursusId.raiseEvent(this.course.id);
     
 }

 
}
