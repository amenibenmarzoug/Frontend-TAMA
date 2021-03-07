import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/';
const USER_KEY = 'auth-user';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    data: any;
    userId: any;
    cursusId: any;

    filterBy: any;
    courseSessionsSpec: any[] = [];
    courseSessions: any;
    user: any;
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
        this.onEventsUpdated = new Subject();
        this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        console.log(this.data);
        this.userId = this.data.id;
        this.userRole = this.data.roles;
        console.log(this.userRole.includes("PARTICIPANT"));
        if (this.userRole.includes("PARTICIPANT"))
            this.getParticipantById(this.userId);
        if (this.userRole.includes("TRAINER"))
            this.getTrainerById(this.userId);
        if (this.userRole.includes("ENTREPRISE"))
            this.getEntrepriseById(this.userId);
        if (this.userRole.includes("INSTITUTION"))
            this.getInstitutionById(this.userId);


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

                //this.getCourseSessions(),
                this.getEvents(),

            ]).then(
                ([events]) => {
                    resolve();
                },
                reject
            );
        });
    }



    getParticipantById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participants/' + id)
                .subscribe((response: any) => {


                    this.participant = response;
                    console.log(this.participant);
                    resolve(response);
                }, reject);
        }
        );
    }

    getInstitutionById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'institution/' + id)
                .subscribe((response: any) => {


                    this.institution = response;
                    console.log(this.participant);
                    resolve(response);
                }, reject);
        }
        );
    }

    getEntrepriseById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'entreprises/' + id)
                .subscribe((response: any) => {


                    this.entreprise = response;
                    console.log(this.participant);
                    resolve(response);
                }, reject);
        }
        );
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any> {


        return new Promise((resolve, reject) => {


            this._httpClient.get(AUTH_API + 'event')
                .subscribe((response: any) => {

                  
                    this.events = response;
                    if (this.userRole.includes("PARTICIPANT")) {
                        if (this.participant.programInstance == null) {
                            this.events = [];
                        }
                        else {
                            this.events = this.events.filter(_event => {
                                if (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance!= null) {
                                    if (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == this.participant.programInstance.id) {
                                        //console.log("user trainer");
                                        return true;
                                    }
                                }
                                return false;
                            });
                        }




                    }
                   

                    else if (this.userRole.includes("TRAINER")) {
                        this.events = this.events.filter(_event => {
                            if (_event.session.trainer != null) {
                                if (_event.session.trainer.id == this.userId) {
                                    //console.log("user trainer");
                                    return true;
                                }
                            }
                            return false;
                        });
                    }

                    else if ((this.userRole.includes("INSTITUTION"))) {
                        this.events = [];
                    }
                    else if ((this.userRole.includes("ENTREPRISE")) ) {
                        if (this.entreprise.programInstance == null) {
                            this.events = [];
                        }
                        else {
                            this.events = this.events.filter(_event => {
                                if (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance!= null) {
                                    if (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == this.entreprise.programInstance.id) {
                                        //console.log("user trainer");
                                        return true;
                                    }
                                }
                                return false;
                            });
                        }
                    }
                    else if (this.userRole.includes("MANAGER")) {
                        this.events = response;
                    }
                    else {
                        this.events = [];
                    }
                    console.log("GET EVENTS");
                    console.log(this.events);
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    getTrainerById(id): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers/' + id)
                .subscribe((response: any) => {


                    this.trainer = response;
                    resolve(response);
                }, reject);
        }
        );
    }

    updateEvent(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'event', event)
                .subscribe(response => {
                   console.log("update methode");
                    console.log(event);
                    this.getEvents();
                    resolve(response);
                });
        });
    }

    addEvent(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'event', event)
                .subscribe(response => {
                  
                    console.log(event);
                    this.getEvents();
                    resolve(response);
                });
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'event', {
                //id: 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
