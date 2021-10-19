
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgramInstDetailService } from '../../../../program-inst-detail/program-inst-detail.service';
import { ClassesService } from 'app/main/apps/academy/classes.service';

@Component({
  selector: 'app-select-module',
  templateUrl: './select-module.component.html',
  styleUrls: ['./select-module.component.scss']
})
export class SelectModuleComponent implements OnInit {

  filterBy: string;
  categories: any[];
  modulesInst: any[];
  themeInstance: any[];
  modulesFilteredByCategory: any[];
  filteredModulesInst: any[];
  currentCategory: string;
  searchTerm: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramInstDetailService} _moduleService
   */
  constructor(
     private _moduleInstService: ProgramInstDetailService,
     private _moduleInstService1: ClassesService,
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
   
      this.filterBy = this._moduleInstService1.filterByModule || 'all';



      this._moduleInstService1.onmoduleInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modulesInst = modules;
          });

      this._moduleInstService.onThemeInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(theme => {
              this.themeInstance = theme;
              console.log("les themes instances" + this.themeInstance);

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
      this._moduleInstService.themeInst = filter;
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

              this._moduleInstService.themeInst = module.themeInstance;
              return module.themeInstance.themeInstName === this.currentCategory;
          });

          this.filteredModulesInst = [...this.modulesFilteredByCategory];

      }
      this._moduleInstService1.onmoduleInstChanged.next(this.filteredModulesInst);

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
              return module.themeInstName.toLowerCase().includes(searchTerm);
          });
      }
  }

}
