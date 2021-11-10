import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from 'environments/environment';
import { Session } from 'app/shared/models/session.model'
const AUTH_API = environment.backend_url + 'api/';

@Injectable()
export class AllSessionsService implements Resolve<any>
{
    onSessionsChanged: BehaviorSubject<any>;
    onSpecificCourseSessionsChanged: BehaviorSubject<any>;
    onSelectedSessionsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onProgramsChanged: BehaviorSubject<any>;
    onThemesChanged: BehaviorSubject<any>;
    onModulesChanged: BehaviorSubject<any>;
    onThemeDetailsChanged: BehaviorSubject<any>;
    onTrainersChanged: BehaviorSubject<any>;

    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;


    trainers: any[]=[];
    courses: any[];
    specificCourseSessions: Session[];
    sessions: any[];
    user: any;
    courseSessions: any[] = [];
    programs: any[];
    themes: any[];
    modules: any[];
    themeDetails: any[];
    selectedSessions: string[] = [];
    trainerId: any;
    courseId: any;
    searchText: string;
    filterBy: any;
    session: any;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onSessionsChanged = new BehaviorSubject([]);
        this.onSelectedSessionsChanged = new BehaviorSubject([]);
        this.onSpecificCourseSessionsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onProgramsChanged = new BehaviorSubject([]);
        this.onThemesChanged = new BehaviorSubject([]);
        this.onModulesChanged = new BehaviorSubject([]);
        this.onThemeDetailsChanged = new BehaviorSubject([]);
        this.onTrainersChanged= new BehaviorSubject([]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getSessions(),
                this.getUserData(),
                this.getModuleInst(),
                this.getProgramInst(),
                this.getThemeDetailInst(),
                this.getThemeInst(),
                this.getTrainers()

            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getSessions();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getSessions();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get sessions
     *
     * @returns {Promise<any>}
     */
    getSessions(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session')
                .subscribe((response: any) => {

                    this.sessions = [];

                    if (this.filterBy != null) {


                        this.sessions = response;
                        this.sessions.sort(function (x, y) {
                            const a = new Date(x.sessionBeginDate)
                            const b = new Date(y.sessionBeginDate)
                            if (a.getTime() < b.getTime()) { return -1; }
                            if (a.getTime()> b.getTime()) { return 1; }
                            return 0;
                        })
                        this.sessions = this.sessions.filter(_courseSession => {
                            if (_courseSession.themeDetailInstance.id == this.filterBy.id) {

                                return true;
                            }
                            return false;
                        });

                    }
                    if(this.trainerId!=null && this.sessions.length!=0){
                        this.sessions = this.sessions.filter(_courseSession => {
                            if (_courseSession.trainer.id == this.trainerId) {

                                return true;
                            }
                            return false;
                        });
                    }



                    this.onSpecificCourseSessionsChanged.next(this.sessions);

                    resolve(this.sessions);

                }, reject);
        }
        );
    }

    getSessionsByTrainerId(trainerId): Promise<any> {


        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.backend_url + 'api/session/trainerId/' + trainerId)
                .subscribe((response: any) => {
                    console.log("TRAINER SESSIONS");
                    this.sessions = [];
                    this.sessions = response;
                    this.sessions.sort(function (x, y) {
                        const a = new Date(x.sessionBeginDate)
                        const b = new Date(y.sessionBeginDate)
                        if (a.getTime() < b.getTime()) { return -1; }
                        if (a.getTime()> b.getTime()) { return 1; }
                        return 0;
                    })
                    console.log(this.sessions)
                    if (this.filterBy != null) {


                        this.sessions = response;
                        this.sessions = this.sessions.filter(_courseSession => {
                            if (_courseSession.themeDetailInstance.id == this.filterBy.id) {

                                return true;
                            }
                            return false;
                        });

                    }
                    this.onSpecificCourseSessionsChanged.next(this.sessions);
                    resolve(this.sessions);
                }, reject);
        });
    }

    getSessionsByProgramInstanceId(programInstanceId): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session')
                .subscribe((response: any) => {

                    this.sessions = [];
                    this.sessions = response;
                    this.sessions.sort(function (x, y) {
                        const a = new Date(x.sessionBeginDate)
                        const b = new Date(y.sessionBeginDate)
                        if (a.getTime() < b.getTime()) { return -1; }
                        if (a.getTime()> b.getTime()) { return 1; }
                        return 0;
                    })
                    this.sessions = this.sessions.filter(_courseSession => {
                        if (_courseSession.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == programInstanceId) {

                            return true;
                        }
                        return false;
                    });



                    if(this.trainerId!=null && this.sessions.length!=0){
                        this.sessions = this.sessions.filter(_courseSession => {
                            if (_courseSession.trainer.id == this.trainerId) {

                                return true;
                            }
                            return false;
                        });
                    }

                    this.onSpecificCourseSessionsChanged.next(this.sessions);

                    resolve(this.sessions);

                }, reject);
        }
        );
    }




    getSessionsById(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/' + id)
                .subscribe((response: any) => {
                    this.session = response;
                    resolve(response);
                }, reject);
        }
        );
    }


    getTrainers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers')
                .subscribe((response: any) => {
                    this.trainers = response;
                    this.onTrainersChanged.next(this.trainers);
                    resolve(response);
                }, reject);});
        }
    

    getProgramInst(): Promise < any > {
            return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'programsInst')
                    .subscribe((response: any) => {

                        this.onProgramsChanged.next(response);
                        this.programs = response;
                        resolve(response);
                    }, reject);
            }
            );
        }

    getThemeInst(): Promise < any > {
            return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'themesInst')
                    .subscribe((response: any) => {

                        this.onThemesChanged.next(response);
                        this.themes = response;
                        resolve(response);
                    }, reject);
            }
            );
        }

    getModuleInst(): Promise < any > {
            return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'moduleInstance')
                    .subscribe((response: any) => {

                        this.onModulesChanged.next(response);
                        this.modules = response;
                        resolve(response);
                    }, reject);
            }
            );
        }

    getThemeDetailInst(): Promise < any > {
            return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'themeDetailInst')
                    .subscribe((response: any) => {

                        this.onThemeDetailsChanged.next(response);
                        this.themeDetails = response;
                        resolve(response);
                    }, reject);
            }
            );
        }



    /*getCourses(): Promise<any> {
        
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.courses = response;
                    this.onCoursesChanged.next(response);

                    resolve(response);
                }, reject);
        }
        );
    }*/



    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise < any > {

            return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'session')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
            );
            /* return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
           .pipe(catchError(this.processHTTPMsgService.handleError));*/
        }




    /**
     * Toggle selected session by id
     *
     * @param id
     */
    toggleSelectedSession(id): void {
            // First, check if we already have that session as selected...
            if(this.selectedSessions.length > 0) {
            const index = this.selectedSessions.indexOf(id);

            if (index !== -1) {
                this.selectedSessions.splice(index, 1);

                // Trigger the next event
                this.onSelectedSessionsChanged.next(this.selectedSessions);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedSessions.push(id);

        // Trigger the next event
        this.onSelectedSessionsChanged.next(this.selectedSessions);
    }


    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedSessions.length > 0) {
            this.deselectSessions();
        }
        else {
            this.selectSessions();
        }
    }

    /**
     * Select sessions
     *
     * @param filterParameter
     * @param filterValue
     */
    selectSessions(filterParameter?, filterValue?): void {
        this.selectedSessions = [];

        // If there is no filter, select all sessions
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedSessions = [];
            this.sessions.map(session => {
                this.selectedSessions.push(session.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedSessionsChanged.next(this.selectedSessions);
    }



    /**
     * Deselect sessions
     */
    deselectSessions(): void {
        this.selectedSessions = [];

        // Trigger the next event
        this.onSelectedSessionsChanged.next(this.selectedSessions);
    }

    /**
     * Delete session
     *
     * @param session
     */
    deleteSession(session): void {
        const sessionIndex = this.sessions.indexOf(session);
        this.sessions.splice(sessionIndex, 1);
        this.onSessionsChanged.next(this.sessions);
    }





}
