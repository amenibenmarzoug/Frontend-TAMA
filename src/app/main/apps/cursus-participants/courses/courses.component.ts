import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { Router } from '@angular/router';

import { CursusCoursessPartService } from './coursess.service';
import { CursusCoursesPartService } from '../courses.service';


const USER_KEY = 'auth-user';
@Component({
    selector   : 'cursus-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class CursusCoursesPartComponent implements OnInit, OnDestroy
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
participant : any ;
    // Private
    private _unsubscribeAll: Subject<any>;
    cursus: any;

    /**
     * Constructor
     * @param {MatDialog} dialog
     * @param {CursusCoursesPartService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: CursusCoursesPartService,
        private serviceCursusId: CursusCoursessPartService,
        public dialog: MatDialog ,
      //  private router: Router
    )

    
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.participant = this._academyCoursesService.participant ;
        console.log ("la")
        console.log (this.participant)
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

 
    getCursus(course) : void {
      
    // console.log(course.id);
    console.log("sending") ;
    //console.log(this.course.id) ;
     this.course=course ;
     this.serviceCursusId.raiseEvent(this.course.id);
     
 }

 
}
