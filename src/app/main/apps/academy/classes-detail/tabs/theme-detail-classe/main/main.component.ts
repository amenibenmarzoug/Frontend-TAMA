

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClassesDetailService } from '../../../classes-detail.service';

@Component({
  selector: 'app-main4',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent4 implements OnInit,OnDestroy {

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
        private _themeDetailsService: ClassesDetailService
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

      

            this._themeDetailsService.onThemeDetailInstChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themeDetail => {
                this.themeDetails = themeDetail;
            });
            this._themeDetailsService.onmoduleInstChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(module => {
                this.module = module;
                console.log("module changed in sidebar instance??")
                console.log(this.module)
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
        this._themeDetailsService.onFilterChangedThemeDetailInst.next(this.filterBy);

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
               // this._moduleInstService.themeInst = module.themeInstance;
                //this._themeDetailsService.th=themeDetail.module;
                this._themeDetailsService.module=themeDetail.module;
                return themeDetail.module.moduleName === this.currentCategory;
            });

            this.filteredThemeDetails = [...this.themeDetailFilteredByCategory];

        }
        this._themeDetailsService.onThemeDetailInstChanged.next(this.filteredThemeDetails);

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
