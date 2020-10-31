import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgramDetailsService } from '../../../../programDetails.service';


@Component({
    selector: 'app-mainModule',
    templateUrl: './mainModule.component.html',
    styleUrls: ['./mainModule.component.scss']
})
export class MainModuleComponent implements OnInit, OnDestroy {

    user: any;
    filterBy: string;
    categories: any[];
    modules: any[];
    theme: any[];
    modulesFilteredByCategory: any[];
    filteredModules: any[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _programDetailsService
     */
    constructor(
        private _programDetailsService: ProgramDetailsService
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
        this.filterBy = this._programDetailsService.filterBy || 'all';

        this._programDetailsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

            this._programDetailsService.onmoduleChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modules => {
                this.modules = modules;
            });

            this._programDetailsService.onThemeChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(theme => {
                this.theme = theme;
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
        this._programDetailsService.theme=filter;
        this._programDetailsService.onFilterChanged.next(this.filterBy);

    }

    filterModulesByCategory(): void {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.modulesFilteredByCategory = this.modules;
            this.filteredModules = this.modules;
        }
        else
        {

            this.modulesFilteredByCategory = this.modules.filter((module) => {
               
                this._programDetailsService.theme=module.theme;
                return module.theme.themeName === this.currentCategory;
            });

            this.filteredModules = [...this.modulesFilteredByCategory];

        }
        this._programDetailsService.onmoduleChanged.next(this.filteredModules);

        // Re-filter by search term
        this.filterModulesByTerm();
        
    }

    /**
     * Filter courses by term
     */
    filterModulesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredModules = this.modulesFilteredByCategory;
        }
        else {
            this.filteredModules = this.modulesFilteredByCategory.filter((theme) => {
                return theme.themeName.toLowerCase().includes(searchTerm);
            });
        }
    }
}

