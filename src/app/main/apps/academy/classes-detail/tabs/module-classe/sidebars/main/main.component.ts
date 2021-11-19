import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import{ClassesDetailService} from '../../../../classes-detail.service';

@Component({
  selector: 'app-main3',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent3 implements OnInit {

  user: any;
  filterBy: string;
  categories: any[];
  modulesInst: any[];
  themesInst: any[];
  modulesFilteredByCategory: any[];
  filteredModulesInst: any[];
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
     private _moduleInstService: ClassesDetailService
    
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
    // this.filterBy = this._moduleInstService.filterByModule || 'all';

    this.filterBy = null;
        this._moduleInstService.theme = null;
        this._moduleInstService.onFilterChangedModuleInst.next(this.filterBy);
   

      this._moduleInstService.onmoduleInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modulesInst = modules;
             
          });

      this._moduleInstService.onThemeInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(theme => {
              this.themesInst = theme;

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
      console.log(filter.id);
      this._moduleInstService.theme = filter;
      this._moduleInstService.onFilterChangedModuleInst.next(this.filterBy);

  }

  filterModulesByCategory(): void {
      // Filter
      if (this.currentCategory === 'all') {
          this.modulesFilteredByCategory = this.modulesInst;
          this.filteredModulesInst = this.modulesInst;
      }
      else {

          this.modulesFilteredByCategory = this.modulesInst.filter((module) => {

              this._moduleInstService.theme = module.theme;
              return module.theme.themeName === this.currentCategory;
          });

          this.filteredModulesInst = [...this.modulesFilteredByCategory];

      }
      this._moduleInstService.onModuleChanged.next(this.filteredModulesInst);

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
          this.filteredModulesInst = this.modulesFilteredByCategory;
      }
      else {
          this.filteredModulesInst = this.modulesFilteredByCategory.filter((module) => {
              return module.themeName.toLowerCase().includes(searchTerm);
          });
      }
  }

}
