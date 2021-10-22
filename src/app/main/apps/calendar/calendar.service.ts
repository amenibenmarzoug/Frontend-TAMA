import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { ParticipantsService } from '../participants/participants.service';

const AUTH_API = environment.backend_url + 'api/';
const USER_KEY = 'auth-user';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;
    onProgramInstanceChanged: BehaviorSubject<any>
    onCompanyProgramInstanceChanged: BehaviorSubject<any>

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
    programInstances: any[] = [];
    programInstancesId: any[];
    companyProgramInstances: any;
    companyProgramInstancesId: any[]=[];

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
        this.onProgramInstanceChanged = new BehaviorSubject({});
        this.onCompanyProgramInstanceChanged = new BehaviorSubject({});
        this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        this.userId = this.data.id;
        this.userRole = this.data.roles;
        if (this.userRole.includes("PARTICIPANT")) {
            this.getParticipantById(this.userId);
            this.getProgramInstanceByParticipantId(this.userId);
        }
        if (this.userRole.includes("TRAINER")) {
            this.getTrainerById(this.userId);
        }
        if (this.userRole.includes("ENTREPRISE")) {
            this.getEntrepriseById(this.userId);
            this.getProgramInstanceByCompanyId(this.userId)
        }
        if (this.userRole.includes("INSTITUTION")) {
            this.getInstitutionById(this.userId);
        }


        this.onProgramInstanceChanged.subscribe(programInstances => {
            this.programInstances = programInstances;
        })
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
                    resolve(response);
                }, reject);
        }
        );
    }

    /**
     * Get events
     * Get events by different users ids
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any> {


        return new Promise((resolve, reject) => {


            this._httpClient.get(AUTH_API + 'event')
                .subscribe((response: any) => {

                  
                    this.events = response;
                    if (this.userRole.includes("PARTICIPANT")) {
                        if ((this.programInstances == null) || (this.programInstances.length == 0)) {
                            this.events = [];
                          
                        }
                        else {
                          
                           
                            this.events = this.events.filter(_event => {

                                if ((_event.session != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.validated == true)) {

                                    if (this.programInstancesId.includes(_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id)) {
                                        return true;
                                    }


                                }
                                else {
                                    if (_event.freeDay == true) {

                                        return true;
                                    }
                                }
                                return false;
                            });
                        }




                    }


                    else if (this.userRole.includes("TRAINER")) {
                        this.events = this.events.filter(_event => {
                            if ((_event.session != null) && (_event.session.trainer != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.validated == true)) {
                                if (_event.session.trainer.id == this.userId) {
                                    return true;
                                }
                            }
                            else {
                                if (_event.freeDay == true) {

                                    return true;
                                }
                            }
                            return false;
                        });
                    }

                    else if ((this.userRole.includes("INSTITUTION"))) {
                        this.events = [];
                    }
                    else if ((this.userRole.includes("ENTREPRISE"))) {
                        if ((this.companyProgramInstances == null) || (this.companyProgramInstances.length == 0)){
                            this.events = [];
                        }
                        else {
                            this.events = this.events.filter(_event => {
                                if ((_event.session != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.validated == true)) {
                                    if (this.companyProgramInstancesId.includes(_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id)) {
                                        return true;
                                    }

                                }
                                else {
                                    if (_event.freeDay == true) {

                                        return true;
                                    }
                                }
                                return false;
                            });
                        }
                    }
                    else if (this.userRole.includes("MANAGER")) {
                        this.events = this.events.filter(_event => {
                            if ((_event.session != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance != null) && (_event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.validated == true)) {
                                return true;

                            }
                            else {
                                if (_event.freeDay == true) {

                                    return true;
                                }
                            }
                            return false;
                        });

                    }
                    else {
                        this.events = [];
                    }
                    
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    /**
     * 
     * Get programInstance by participant id
     * 
     * @param id 
     * @returns {Promise<any>}
     */
    getProgramInstanceByParticipantId(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participantRegistrations/programInstance/validated/participant/' + id)
                .subscribe((response: any) => {


                    this.programInstances = response;
                    this.programInstancesId = [];
                    this.programInstances.forEach(element => {
                        this.programInstancesId.push(element.id)

                    });
                    this.onProgramInstanceChanged.next(this.programInstances);
                   
                    resolve(this.programInstances);
                }, reject);
        }
        );

    }

    /**
     * Get ProgramInstance by company id
     * 
     * @param id 
     * @returns {Promise<any>}
     */
    getProgramInstanceByCompanyId(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'companyRegistrations/programInstance/enterprise/' + id)
                .subscribe((response: any) => {


                    this.companyProgramInstances = response;
                    this.companyProgramInstancesId = [];
                    this.companyProgramInstances.forEach(element => {
                        this.companyProgramInstancesId.push(element.id)

                    });
                    this.onCompanyProgramInstanceChanged.next(this.companyProgramInstances);
             
                    resolve(this.companyProgramInstances);
                }, reject);
        }
        );

    }

    /**
     * Get Trainer by id
     * 
     * @param id 
     * @returns {Promise<any>}
     */
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

    /**
     * Update the event
     * 
     * @param event 
     * @returns {Promise<any>} 
     */
    updateEvent(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'event', event)
                .subscribe(response => {
             
                    this.getEvents();
                    resolve(response);
                });
        });
    }


    /**
     * Add an event
     * 
     * @param event 
     * @returns {Promise<any>} 
     */
    addEvent(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'event', event)
                .subscribe(response => {

                   
                    this.getEvents();
                    resolve(response);
                });
        });
    }

    /**
     * Add Free Day
     * 
     * @param event 
     * @returns {Promise<any>} 
     */
    addFreeDay(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'event/freeDay', event)
                .subscribe(response => {

                    resolve(response);
                    this.getEvents();
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
