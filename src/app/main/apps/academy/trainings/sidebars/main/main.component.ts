import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TrainingsService } from 'app/main/apps/academy/trainings.service';
import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy {

  user: any;
    filterBy: string;

    categories: any[];
    courses: any[];
    cursus:any[]; 
    coursesFilteredByCategory: any[];
    filteredCourses: any[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: TrainingsService
    )
    {
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
        this.filterBy = this._contactsService.filterBy || 'all';

        this._contactsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

            this._contactsService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.courses = courses;
                console.log("courses");
                console.log(this.courses);
            });

            this._contactsService.onCursusChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(cursus => {
                this.cursus = cursus;
                console.log("cursus");
                console.log(this.cursus);
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter.id;
        this._contactsService.cursus=filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }

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
                console.log("CURSUS");
                console.log(course.cursus);
                this._contactsService.cursus=course.cursus;
                return course.cursus.cursusName === this.currentCategory;
            });


            console.log("dkhalt fel filter by category")
            console.log(this.currentCategory)
            
            this.filteredCourses = [...this.coursesFilteredByCategory];
            console.log(this.filteredCourses)

        }
        this._contactsService.onContactsChanged.next(this.filteredCourses);

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
        else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.cursusName.toLowerCase().includes(searchTerm);
            });
        }
    }
}

