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
     * @param {ProgramDetailsService} _moduleService
     */
    constructor(
        private _moduleService: ProgramDetailsService
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
        this.filterBy = this._moduleService.filterByModule ;



        this._moduleService.onmoduleChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modules => {
                this.modules = modules;
            });

        this._moduleService.onThemeChanged
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
        this._moduleService.theme = filter;
        this._moduleService.onFilterChangedModule.next(this.filterBy);

    }

    filterModulesByCategory(): void {
        // Filter
        if (this.currentCategory === 'all') {
            this.modulesFilteredByCategory = this.modules;
            this.filteredModules = this.modules;
        }
        else {

            this.modulesFilteredByCategory = this.modules.filter((module) => {

                this._moduleService.theme = module.theme;
                return module.theme.themeName === this.currentCategory;
            });

            this.filteredModules = [...this.modulesFilteredByCategory];

        }
        this._moduleService.onmoduleChanged.next(this.filteredModules);

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
            this.filteredModules = this.modulesFilteredByCategory.filter((module) => {
                return module.themeName.toLowerCase().includes(searchTerm);
            });
        }
    }
}

