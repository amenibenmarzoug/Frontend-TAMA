import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AllSessionsService } from 'app/main/apps/academy/all-sessions/all-sessions.service';


@Component({
    selector: 'app-sessions-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainSessionsComponent implements OnInit {

    user: any;
    filterBy: string;
    courses: any[];
    currenttrainer: string;
    trainerId: any;
    courseId: any;
    courseSessions: any[] = [];
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

    /**
     * Constructor
     *
     * @param {DisponibilityTrainerService} _disponibilityTrainerService
     */
    constructor(
        private _disponibilityTrainerService: AllSessionsService
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
        this.filterBy = this._disponibilityTrainerService.filterBy || 'all';

     

            this._disponibilityTrainerService.onProgramsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(programs => {
              this.programs = programs;
              console.log("programs");
              console.log(this.programs);
            });
          this._disponibilityTrainerService.onThemesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themes => {
              this.themes = themes;
              console.log("themes");
              console.log(this.themes);
            });
          this._disponibilityTrainerService.onModulesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modules => {
              this.modules = modules;
              console.log("modules");
              console.log(this.modules);
            });
          this._disponibilityTrainerService.onThemeDetailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themeDetails => {
              this.themeDetails = themeDetails;
              console.log("themeDetails");
              console.log(this.themeDetails);
            });

        this._disponibilityTrainerService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.courses = courses;
                console.log("courses");
                console.log(this.courses);
            });


        this._disponibilityTrainerService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });


        /*this._disponibilityTrainerService.onSelectedTrainerChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedTrainer => {
           
               this.trainerId=selectedTrainer;
  
                console.log("id trainer");
                console.log(this.trainerId);
            
       
        });*/
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
        //this.onValueChangedStepper1();
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
