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
    selectedProgramInst:any;
    selectedTrainer:any;

    themes: any[];
    modules: any[];
    themeDetails: any[];
    trainers:any[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AllSessionsService} _allSessionsService
     */
    constructor(
        private _allSessionsService: AllSessionsService
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
        this.filterBy = this._allSessionsService.filterBy || 'all';



        this._allSessionsService.onProgramsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(programs => {
                this.programs = programs;

            });
        this._allSessionsService.onThemesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themes => {
                this.themes = themes;

            });
        this._allSessionsService.onModulesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modules => {
                this.modules = modules;

            });
        this._allSessionsService.onThemeDetailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(themeDetails => {
                this.themeDetails = themeDetails;

            });

       

        this._allSessionsService.onTrainersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainers => {
                this.trainers = trainers;
            });


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

    selectProgram(program): void {
        this.selectedProgramInst=program;
        this._allSessionsService.getSessionsByProgramInstanceId(program.id);
        this.selectedTheme = null;
        this.filteredThemes = [];
        this.themes.forEach(theme => {
            if (theme.programInstance.id == program.id) {
                if (!this.filteredThemes.includes(theme))
                    this.filteredThemes.push(theme);
            }

        });
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

    }

    selectModule(module): void {
        this.selectedThemeDet = null;
        this.filteredThemeDetails = [];
        this.selectedModule = module;
        this.themeDetails.forEach(themeDetail => {
            if (themeDetail.moduleInstance.id == module.id) {
                if (!this.filteredThemeDetails.includes(themeDetail))
                    this.filteredThemeDetails.push(themeDetail);
            }

        });

    }

    resetFilters():void{
        this.filterBy=null;
        this.filteredModules=[];
        this.filteredThemeDetails=[];
        this.filteredThemes=[];
        this.programs=[];
        this.trainers=[];
        this._allSessionsService.trainerId=null;
        this._allSessionsService.onSpecificCourseSessionsChanged.next(null);
        this.ngOnInit();
        this.selectedProgramInst=null;
        this.selectedTrainer=null;


    }

    selectThemeDetail(themeDet): void {

        //this._addSessionService.chosenClassRoom = event;
        this.selectedThemeDet = themeDet;
        this._allSessionsService.onFilterChanged.next(themeDet);


    }

    selectTrainer(trainer):void{
        this.selectedTrainer=trainer;
        this._allSessionsService.trainerId=trainer.id;
        this._allSessionsService.getSessionsByTrainerId(trainer.id);
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
