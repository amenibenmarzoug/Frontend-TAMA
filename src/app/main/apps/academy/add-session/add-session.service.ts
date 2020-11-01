import { Injectable, EventEmitter, } from "@angular/core";
import { List } from "lodash";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


const AUTH_API = 'http://localhost:8080/api/';

@Injectable()
export class AddSessionService implements Resolve<any>{
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
    events:any[];
    trainers: any[];
    programs: any[];
    themes: any[];
    modules: any[];
    themeDetails: any[];
    classRooms: any;
    sessions:any[];
    institutions: any[];
    chosenInstitutionId: any;
    onEventsUpdated: Subject<any>;
    chosenClassRoom: any;
    onInstitutionsChanged: BehaviorSubject<any>;


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
        this.onProgramsChanged= new BehaviorSubject([]);
        this.onThemesChanged= new BehaviorSubject([]);
        this.onModulesChanged= new BehaviorSubject([]);
        this.onThemeDetailsChanged= new BehaviorSubject([]);

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
        return new Promise((resolve, reject) => {

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

            ]).then(
                ([files]) => {


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



                    resolve(response);
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
                    this.onClassRoomsChanged.next(response);
                    this.classRooms = response;



                    resolve(response);
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
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers')
                .subscribe((response: any) => {
                    console.log("response");
                    console.log(response);
                    this.onTrainersChanged.next(response);
                    this.trainers = response;
                    resolve(response);
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
                    console.log("GET EVENTS");
                    console.log(this.events);
                    //this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    saveCourseSessionAndEvent(session, event): Promise<any> {
        //console.log("result");
        //console.log(contact);

        console.log(session);
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'session', session)
                .subscribe(response => {

                  //  this.onCoursesSessionSaved.next(response);
                    console.log(response);
                  //  this.courseSession = response;
                  //  this.courseSessionId = this.courseSession.id;
                    event.session = response;
                    this.addEvent(event);

                    console.log("event in update");
                    console.log(event);
                    console.log(response);
                  

                    resolve(response);
                    this.getSessions();
                });
            // this.courseSession=new CourseSession(courseSession);
        });
    }


    addEvent(event): Promise<any> {

        return new Promise((resolve, reject) => {
            console.log("courseSession in addevent");
            console.log(event.courseSession);
            console.log(event);
            
            this._httpClient.post(AUTH_API + 'event', event)
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
            const index = this.selectedContacts.indexOf(id);

            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }

        }


        // If we don't have it, push as selected
        this.selectedContacts.push(id);

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