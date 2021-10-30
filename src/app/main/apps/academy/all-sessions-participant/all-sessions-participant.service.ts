import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from 'environments/environment';
import {Session} from 'app/shared/models/session.model'
const AUTH_API = environment.backend_url + 'api/';
const USER_KEY = 'auth-user';


@Injectable()
export class AllSessionsParticipantService implements Resolve<any>
{
    onSessionsChanged: BehaviorSubject<any>;
    onSpecificCourseSessionsChanged: BehaviorSubject<any>;
    onSelectedSessionsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onProgramsChanged: BehaviorSubject<any>;
    onThemesChanged: BehaviorSubject<any>;
    onModulesChanged: BehaviorSubject<any>;
    onThemeDetailsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;


    trainer: any;
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
    data: any;
    userId: any;
    userRole: any;


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

        this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        this.userId = this.data.id;
        this.userRole = this.data.roles;
        if (this.userRole.includes("PARTICIPANT")) {
            this.getProgramInstanceByParticipantId(this.userId);
        }
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
                this.getModuleInst(),
                this.getThemeDetailInst(),
                this.getThemeInst(),
               // this.getProgramInst(),
               // this.getProgramInstanceByParticipantId(this.userId)

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
        }
        );
    }

    getSessionsByProgramInstanceId(programInstanceId): Promise<any> {
       

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session')
                .subscribe((response: any) => {

                    this.sessions=[];
                    this.sessions = response;
                    this.sessions = this.sessions.filter(_courseSession => {
                        if (_courseSession.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == programInstanceId) {

                            return true;
                        }
                        return false;
                    });




                    this.onSpecificCourseSessionsChanged.next(this.sessions);

                    resolve(this.sessions);

                }, reject);
        }
        );
    }


    getProgramInstanceByParticipantId(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participantRegistrations/programInstance/validated/participant/' + id)
                .subscribe((response: any) => {


                    this.programs = response;
                 
                    this.onProgramsChanged.next(this.programs);
                   
                    resolve(this.programs);
                }, reject);
        }
        );

    }


    getProgramInst(): Promise<any> {
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

    getThemeInst(): Promise<any> {
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

    getModuleInst(): Promise<any> {
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

    getThemeDetailInst(): Promise<any> {
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
}