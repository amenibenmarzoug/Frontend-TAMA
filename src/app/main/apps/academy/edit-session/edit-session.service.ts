import { Injectable, EventEmitter, } from "@angular/core";
import { List } from "lodash";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Session } from './session.model';
import { CalendarEventModel } from '../../calendar/event.model';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class EditSessionService implements Resolve<any>{
    // 1
    par: any[];
    onContactsChanged: BehaviorSubject<any>;
    onDisponibilitiesChanged: BehaviorSubject<any>;
    onClassRoomsChanged: BehaviorSubject<any>;
    onAvailableTrainersChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onSelectedTrainerChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onTrainersChanged: BehaviorSubject<any>;
    onProgramsChanged: BehaviorSubject<any>;
    onThemesChanged: BehaviorSubject<any>;
    onModulesChanged: BehaviorSubject<any>;
    onThemeDetailsChanged: BehaviorSubject<any>;
    onSessionsChanged: BehaviorSubject<any>;
    selectedContacts: string[] = [];
    sessionsByThemeDetail:any[];
    sessionsByProgram:any[];
    checkboxes:{};
    events: any[];
    unavailableTrainersId: any[];
    unavailableClassroomsId: any[];
    session:any;
    trainers: any[];
    programs: any[];
    themes: any[];
    modules: any[];
    themeDetails: any[];
    classRooms: any;
    sessions: Session[];
    sessionId:number;
    institutions: any[];
    currentCity:any;
    chosenInstitutionId: any;
    onEventsUpdated: Subject<any>;
    chosenClassRoom: any;
    selectedModule: any;
    selectedDate: Date;
    selectedDay: String;
    onInstitutionsChanged: BehaviorSubject<any>;
    date: Date;
    freeDays:any[];
    event: CalendarEventModel;
    trainerId:number;
    receivedFilter: EventEmitter<any[]>;
    constructor(private _httpClient: HttpClient) {
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onDisponibilitiesChanged = new BehaviorSubject([]);
        this.onTrainersChanged = new BehaviorSubject([]);
        this.onClassRoomsChanged = new BehaviorSubject([]);
        this.onInstitutionsChanged = new BehaviorSubject([]);
        this.onAvailableTrainersChanged = new BehaviorSubject([]);
        this.onSessionsChanged = new BehaviorSubject([]);
        this.onSelectedTrainerChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onProgramsChanged = new BehaviorSubject([]);
        this.onThemesChanged = new BehaviorSubject([]);
        this.onModulesChanged = new BehaviorSubject([]);
        this.onThemeDetailsChanged = new BehaviorSubject([]);

        this.receivedFilter = new EventEmitter<any[]>();
    }


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
                this.getInstitutions(),
                this.getClassRooms(),
                this.getTrainers(),
                this.getModuleInst(),
                this.getProgramInst(),
                this.getThemeDetailInst(),
                this.getThemeInst(),
                this.getSessions(),
                this.getEvents(),
                this.getFreeDays()

            ]).then(
                ([files]) => {
                    this.onFilterChanged.subscribe(filter => {
                        //this.filterBy = filter;
                        this.getTrainers();
                    });

                    resolve();

                },
                reject
            );
        });
    }


    raiseEvent(par: any[]): void {
        this.par = par;
        this.receivedFilter.emit(par);
    }

    getInstitutions(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'institutions')
                .subscribe((response: any) => {
                    console.log("response institutions");
                    console.log(response);
                    this.onInstitutionsChanged.next(response);
                    this.institutions = response;

                    if(this.currentCity!=null){
                        console.log("INSTITUTIONS");
                        this.institutions = response.filter(institution => {
                            
                            if (institution.city==this.currentCity) {
                                //console.log("");
                                return true;
                            }
                            return false;
                        });
                    }
                    else{
                        this.institutions=[]
                    }
                    console.log(this.institutions);
                    resolve(this.institutions);
                }, reject);
        }
        );
    }

    getClassRooms(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'classroom')
                .subscribe((response: any) => {
                    console.log("response classromm");
                    console.log(response);
                    
                    
                    this.classRooms = response;
                    this.unavailableClassroomsId = [];
                    console.log("SELECTED DAY IN SERVICE");
                    console.log(this.selectedDate);
                    if (this.selectedDay != null) {

                        if (this.sessions.length != 0) {
                            this.sessions.forEach(session => {
                                this.date = new Date(session.sessionBeginDate);
                                

                                if (this.date.toDateString() == this.selectedDate.toDateString()) {
                                    if ((session.classRoom != null) && ((this.sessionId!=null)&&(session.id!=this.sessionId)) &&(!this.unavailableClassroomsId.includes(session.classRoom.id)))
                                        this.unavailableClassroomsId.push(session.classRoom.id);
                                }

                            });
                            this.classRooms = response.filter(classroom => {
                                console.log(classroom);
                                console.log(this.unavailableClassroomsId.includes(classroom.id));
                                if (!this.unavailableClassroomsId.includes(classroom.id)) {
                                    return true;
                                }
                                return false;
                            });
                            console.log(this.classRooms);
                            console.log("UNAVAILABLE CLASSROOMS");
                            console.log(this.unavailableClassroomsId);
                        }
                        else {
                            this.classRooms = response;
                        }



                    }
                    else {
                        this.classRooms = [];
                    }
                    console.log(this.classRooms);
                    this.onClassRoomsChanged.next(this.classRooms);
                    resolve(this.classRooms);
                }, reject);
        }
        );
    }


    getSessions(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session')
                .subscribe((response: any) => {
                    console.log("response session");
                    console.log(response);
                    this.onSessionsChanged.next(response);
                    this.sessions = response;



                    resolve(response);
                }, reject);
        }
        );
    }


    getTrainers(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers')
                .subscribe((response: any) => {
                    console.log("response");
                    console.log(response);

                    this.trainers = response;
                    this.unavailableTrainersId = [];
                    if (this.selectedDay != null) {

                        if (this.sessions.length != 0) {
                            this.sessions.forEach(session => {
                                this.date = new Date(session.sessionBeginDate);
                                

                                if (this.date.toDateString() == this.selectedDate.toDateString()) {
                                    if ((session.trainer != null) && ((this.trainerId!=null)&&(session.trainer.id!=this.trainerId)) && (!this.unavailableTrainersId.includes(session.trainer.id)))
                                        this.unavailableTrainersId.push(session.trainer.id);
                                }

                            });
                            this.trainers = response.filter(trainer => {
                                
                                if ((trainer.disponibilityDays.includes(this.selectedDay)) && (!this.unavailableTrainersId.includes(trainer.id)) &&(trainer.specifications.includes(this.selectedModule.module.moduleName))) {
                                    //console.log("");
                                    return true;
                                }
                                return false;
                            });
                            console.log("UNAVAILABLE TRAINERS");
                            console.log(this.unavailableTrainersId);
                        }
                        else {
                            this.trainers = response.filter(trainer => {
                                console.log(trainer);
                                
                                if ((trainer.disponibilityDays.includes(this.selectedDay)) &&(trainer.specifications.includes(this.selectedModule.module.moduleName))) {
                                    //console.log("");
                                    return true;
                                }
                                return false;
                            });
                        }



                    }
                    else {
                        this.trainers = [];
                    }
                    this.onTrainersChanged.next(this.trainers);
                    resolve(this.trainers);
                }, reject);
        }
        );
    }

    getProgramInst(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programsInst')
                .subscribe((response: any) => {
                    console.log("response");
                    console.log(response);
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
                    console.log("response");
                    console.log(response);
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
                    console.log("response");
                    console.log(response);
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
                    console.log("response");
                    console.log(response);
                    this.onThemeDetailsChanged.next(response);
                    this.themeDetails = response;
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
                    //console.log("GET EVENTS");
                   // console.log(this.events);
                    //this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    getFreeDays(): Promise<any> {


        return new Promise((resolve, reject) => {


            this._httpClient.get(AUTH_API + 'event')
                .subscribe((response: any) => {

                    this.freeDays = response;
                    //console.log("GET EVENTS");
                   // console.log(this.events);
                    //this.onEventsUpdated.next(this.events);
                    this.freeDays = this.freeDays.filter(_event => {
                        
                            if (_event.freeDay == true) {
                               
                                return true;
                            }
                        
                        return false;
                    });
                    resolve(this.freeDays);
                }, reject);
        });
    }


    updateCourseSessionAndEvent(session): Promise<any> {
        //console.log("result");
        //console.log(contact);
        console.log("Session in service")
        console.log(session);
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'session', session)
                .subscribe(response => {

                    
                    console.log(response);
                  
                  

                    resolve(response);
                    this.getSessions();
                    this.getEvents();
                });
            // this.courseSession=new CourseSession(courseSession);
        });
    }

    getSessionsById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/' +id)
                .subscribe((response: any) => {


                    this.session = response;
                    this.trainerId=this.session.trainer.id;
                    console.log(this.session);
                    resolve(response);
                }, reject);
        }
        );
    }

    getSessionsByProgram(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/programInst/?programId=' +id)
                .subscribe((response: any) => {


                    this.sessionsByProgram = response;
                    console.log(this.sessionsByProgram);
                    resolve(response);
                }, reject);
        }
        );
    }

    getSessionsByThemeDetail(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/themeDetail/?themeDetailId=' +id)
                .subscribe((response: any) => {


                    this.sessionsByThemeDetail = response;
                    console.log(this.sessionsByThemeDetail);
                    resolve(response);
                }, reject);
        }
        );
    }

    getEventById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'event/' +id)
                .subscribe((response: any) => {


                    this.session = response;
                    this.trainerId=this.session.trainer.id;
                    console.log(this.session);
                    resolve(response);
                }, reject);
        }
        );
    }


    getEventBySessionId(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'event' )
                .subscribe((response: any) => {


                    this.events = response;
                    this.events = response.filter(event => {
                        
                        
                        if ((event.session!=null)&&(event.session.id==id)) {
                            //console.log("");
                            this.event=event;
                            return true;
                        }
                        return false;
                    });
                    
                    
                    resolve(this.event);
                }, reject);
        }
        );
    }
    updateEvent(event): Promise<any> {

        return new Promise((resolve, reject) => {
            console.log("courseSession in addevent");
            console.log(event.courseSession);
            console.log(event);

            this._httpClient.put(AUTH_API + 'event', event)
                .subscribe(response => {


                    console.log(response);
                    this.getEvents();
                    resolve(response);
                });
        });
    }
    /**
    * Toggle selected contact by id
    *
    * @param id
    */
    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            console.log("SELECTED CONTACTS IN SERVICE");
            console.log(this.selectedContacts);
            const index = this.selectedContacts.indexOf(id.toString());

            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }

        }


        // If we don't have it, push as selected
        this.selectedContacts.push(id.toString());

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }


    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        }
        else {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.trainers.map(contact => {
                this.selectedContacts.push(contact.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
  * Deselect contacts
  */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }


}