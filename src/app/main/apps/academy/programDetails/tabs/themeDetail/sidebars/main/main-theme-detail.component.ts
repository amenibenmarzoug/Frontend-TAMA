import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgramDetailsService } from '../../../../programDetails.service';


@Component({
    selector: 'app-main-theme-detail',
    templateUrl: './main-theme-detail.component.html',
    styleUrls: ['./main-theme-detail.component.scss']
})
export class MainThemeDetailComponent implements OnInit, OnDestroy {

    user: any;
    filterBy: string;
    categories: any[];
    themeDetails: any[];
    module: any[];
    themeDetailFilteredByCategory: any[];
    filteredThemeDetails: any[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _themeDetailsService
     */
    constructor(
        private _themeDetailsService: ProgramDetailsService
    ) {
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
        this.filterBy = this._themeDetailsService.filterByThemeDetail || 'all';

      

            this._themeDetailsService.onThemeDetailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themeDetail => {
                this.themeDetails = themeDetail;
            });
            this._themeDetailsService.onmoduleChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(module => {
                this.module = module;
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void {
        this.filterBy = filter.id;
        this._themeDetailsService.module=filter;
        this._themeDetailsService.onFilterChangedThemeDetail.next(this.filterBy);

    }

    filterThemeDetailsByCategory(): void {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.themeDetailFilteredByCategory = this.themeDetails;
            this.filteredThemeDetails = this.themeDetails;
        }
        else
        {

            this.themeDetailFilteredByCategory = this.themeDetails.filter((themeDetail) => {
               
                this._themeDetailsService.module=themeDetail.module;
                return themeDetail.module.moduleName === this.currentCategory;
            });

            this.filteredThemeDetails = [...this.themeDetailFilteredByCategory];

        }
        this._themeDetailsService.onThemeDetailChanged.next(this.filteredThemeDetails);

        // Re-filter by search term
        this.filterThemeDetailsByTerm();
        
    }

    /**
     * Filter courses by term
     */
    filterThemeDetailsByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredThemeDetails = this.themeDetailFilteredByCategory;
        }
        else {
            this.filteredThemeDetails = this.themeDetailFilteredByCategory.filter((module) => {
                return module.moduleName.toLowerCase().includes(searchTerm);
            });
        }
    }
}

