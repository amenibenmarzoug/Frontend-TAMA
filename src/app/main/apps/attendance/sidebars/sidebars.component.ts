import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceService } from 'app/main/apps/attendance/attendance.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit {

  user: any;
  filterByDate: any;
  courseSessions: any[] = [];
  currentTrainer: string;
  selectedSession: any ; 




  courses: any[];
  trainerId: any;
  courseId: any;
  data: any;
  filteredThemes: any[] = [];
  filteredModules: any[] = [];
  filteredThemeDetails: any[] = [];
  programs: any[];
  selectedThemeDet: any;
  selectedTheme: any;
  selectedModule: any;

  themes: any[];
  modules: any[];
  themeDetails: any[];

  // Private
  private _unsubscribeAll: Subject<any>;
    selectedDate: any;

  /**
   * Constructor
   *
   * @param {DisponibilityTrainerService} _disponibilityTrainerService
   */
  constructor(
      private _disponibilityTrainerService: AttendanceService
  ) {
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
      this.filterByDate = this._disponibilityTrainerService.FilterByDate || 'all';



      this._disponibilityTrainerService.onSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(sessions => {
              this.courseSessions = sessions;

          });

          /*
      this._disponibilityTrainerService.onThemesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(themes => {
              this.themes = themes;

          });
      this._disponibilityTrainerService.onModulesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modules = modules;

          });
      this._disponibilityTrainerService.onThemeDetailsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(themeDetails => {
              this.themeDetails = themeDetails;

          });

      this._disponibilityTrainerService.onCoursesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(courses => {
              this.courses = courses;
          });


      this._disponibilityTrainerService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });
*/

  }

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

   selectDate(sessionDate): void {

    //this._addSessionService.chosenClassRoom = event;
    this.selectedDate = sessionDate.toDate();
    console.log(this.selectedDate)
    this._disponibilityTrainerService.onFilterChanged.next(sessionDate);

    }

  selectProgram(program): void {
      this.selectedTheme = null;
      this.filteredThemes = [];
      this.themes.forEach(theme => {
          if (theme.programInstance.id == program.id) {
              if (!this.filteredThemes.includes(theme))
                  this.filteredThemes.push(theme);
          }

      });
      console.log(program);
  }

  selectTheme(theme): void {
      this.selectedModule = null;
      this.filteredModules = [];
      this.selectedTheme = theme;
      this.modules.forEach(module => {
          if (module.themeInstance.id == theme.id) {
              if (!this.filteredModules.includes(module))
                  this.filteredModules.push(module);
          }

      });

      console.log(this.filteredModules);
  }

  selectModule(module): void {
      this.selectedThemeDet = null;
      console.log(this.selectedThemeDet);
      this.filteredThemeDetails = [];
      this.selectedModule = module;
      this.themeDetails.forEach(themeDetail => {
          if (themeDetail.moduleInstance.id == module.id) {
              if (!this.filteredThemeDetails.includes(themeDetail))
                  this.filteredThemeDetails.push(themeDetail);
          }

      });

      console.log(this.filteredThemeDetails);
  }

  selectThemeDetail(themeDet): void {

      //this._addSessionService.chosenClassRoom = event;
      this.selectedThemeDet = themeDet;
      this._disponibilityTrainerService.onFilterChanged.next(themeDet);


  }



  /**
 * Connect function called by the table to retrieve one stream containing the data to render.
 * @returns {Observable<any[]>}
 */
  connect(): Observable<any[]> {
      return null;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}
