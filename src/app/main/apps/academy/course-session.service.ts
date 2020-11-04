import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { Program } from 'app/main/apps/academy/program.model';

//import { Contact } from 'app/main/apps/contacts/contact.model';
import { Training } from 'app/main/apps/academy/trainings/training.model';
import { CourseSession } from './course-session/courseSession.model';
const AUTH_API = 'http://localhost:8080/api/';
@Injectable({
    providedIn: 'root'
})
export class CourseSessionService implements Resolve<any>  {

    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    contacts: CourseSession[];
    user: any;
    selectedContacts: string[] = [];
    chosenCourse: any;
    institutions: any;
    courses: any;
    cursusa: any;
    classRooms: any;
    events: any;
    searchText: string;
    filterBy: string;
    id: number;
    program: Program;
    training: Training;
    courseSession: any;
    courseSessionId: any

    chosenCursus: any;
    chosenCursusId: any;
    chosenTrainingId: any;
    chosenInstitutionId: any;
    onEventsUpdated: Subject<any>;
    chosenClassRoom: any;

    courseDate: Date;

    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    onCursusChanged: BehaviorSubject<any>;
    onInstitutionsChanged: BehaviorSubject<any>;
    onCoursesSessionsChanged: BehaviorSubject<any>;
    onCoursesSessionSaved: Subject<any>;
    onClassRoomsChanged: BehaviorSubject<any>;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onEventsUpdated = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onCoursesChanged = new BehaviorSubject([]);
        this.onCursusChanged = new BehaviorSubject([]);
        this.onCoursesSessionSaved = new Subject();
        this.onCoursesSessionsChanged = new BehaviorSubject([]);
        this.onInstitutionsChanged = new BehaviorSubject([]);
        this.onClassRoomsChanged = new BehaviorSubject([]);
        this.onFilterChanged = new Subject();
        this.courseDate = new Date(2020, 0O1, 0O1, 0o0, 0o0, 0o0, 0o0);
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContacts(),
                this.getCourses(),
                this.getCursus(),
                this.getCoursesSessions(),
                this.getInstitutions(),
                this.getEvents(),
                this.getClassRooms(),
                // this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getContacts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getContacts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'courseSession')
                .subscribe((response: any) => {

                    this.contacts = response;
                    /*

                    if ( this.filterBy === 'starred' )
                    {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.starred.includes(_contact.id);
                        });
                    }

                    if ( this.filterBy === 'frequent' )
                    {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.frequentContacts.includes(_contact.id);
                        });
                    }
                    if ( this.filterBy === 'NadiaFekih' )
                    {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.cursus.cursusName.includes(_contact.id);
                        });
                    }*/


                    if (this.searchText && this.searchText !== '') {
                        this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                    }

                    this.contacts = this.contacts.map(contact => {
                        return new CourseSession(contact);
                    });

                    this.onContactsChanged.next(this.contacts);
                    resolve(this.contacts);
                }, reject);
        }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                .subscribe((response: any) => {
                    this.user = response;
                    this.onUserDataChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        }
        );
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


        console.log(this.selectedContacts);


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
            this.contacts.map(contact => {
                this.selectedContacts.push((contact.id).toString());

            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any> {
        //console.log("result");
        //console.log(contact);

        //console.log(contact.courseSessionBeginDate);
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'courseSession', contact)
                .subscribe(response => {
                    this.getContacts();
                    console.log("courseSession in update");
                    console.log(response);
                    resolve(response);
                });
        });
    }



    /**
     * Update user data
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateUserData(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'courseSession', contact)
                .subscribe(response => {
                    // this.getUserData();

                    this.getContacts();
                    resolve(response);
                });
        });
    }
    updateContact1(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("contactt wselt fe service")
            console.log(contact);
            this._httpClient.put(AUTH_API + 'courseSession', contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }
    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    // /**
    //  * Delete contact
    //  *
    //  * @param contact
    //  */
    // deleteContact(contact): void
    // {
    //     const contactIndex = this.contacts.indexOf(contact);
    //     this.contacts.splice(contactIndex, 1);
    //     this.onContactsChanged.next(this.contacts);
    // }
    /**
     * Delete contact
     *
     * @param id
     */
    deleteContact(id): Promise<any> {
        console.log(id);


        return new Promise((resolve, reject) => {
            const contactIndex = this.contacts.indexOf(id);
            this.contacts.splice(contactIndex, 1);
            this.onContactsChanged.next(this.contacts);
            this._httpClient.delete(`http://localhost:8080/api/courseSession/${id}`)
                .subscribe(response => {
                    // this.getContacts();
                    resolve(response);
                });
        });
    }
    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        for (const contactId of this.selectedContacts) {
            const contact = this.contacts.find(_contact => {
                return (_contact.id).toString() === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
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
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    addEvent(event): Promise<any> {

        return new Promise((resolve, reject) => {
            console.log("courseSession in addevent");
            console.log(event.courseSession);
            console.log(event);
            // event.courseSession=courseSession;
            // event.courseSession=this.courseSession;
            this._httpClient.post(AUTH_API + 'event', event)
                .subscribe(response => {


                    console.log(response);
                    this.getEvents();
                    resolve(response);
                });
        });
    }



    updateEvent(event): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'event', event)
                .subscribe(response => {

                    console.log(event);
                    this.getEvents();
                    resolve(event);
                });
        });
    }

    saveCourseSessionAndEvent(courseSession, event): Promise<any> {
        //console.log("result");
        //console.log(contact);

        console.log(courseSession);
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'courseSession', courseSession)
                .subscribe(response => {

                    this.onCoursesSessionSaved.next(response);
                    console.log(response);
                    this.courseSession = response;
                    this.courseSessionId = this.courseSession.id;
                    event.courseSession = this.courseSession;
                    this.addEvent(event);

                    console.log("event in update");
                    console.log(event);
                    console.log(response);
                    console.log(response);

                    resolve(response);
                    this.getContacts();
                });
            // this.courseSession=new CourseSession(courseSession);
        });
    }



    getCoursesSessions(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'courseSession')
                .subscribe((response: any) => {
                    console.log("response course session");
                    console.log(response);
                    this.onCoursesSessionsChanged.next(response);
                    this.contacts = response;
                    if (this.filterBy === 'starred') {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.starred.includes(_contact.id);
                        });
                    }


                    resolve(response);
                }, reject);
        }
        );
    }

    getCourses(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'course')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.onCoursesChanged.next(response);
                    this.courses = response;
                    if (this.filterBy === 'starred') {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.starred.includes(_contact.id);
                        });
                    }


                    resolve(response);
                }, reject);
        }
        );
    }


    getCursus(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'cursus')
                .subscribe((response: any) => {
                    console.log("response cursus");
                    console.log(response);
                    this.onCursusChanged.next(response);
                    this.cursusa = response;
                    resolve(response);
                }, reject);
        }
        );
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

    getCursusById(id): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + `cursus/${id}`)
                .subscribe((response: any) => {
                    //console.log("cursus séléctionnée");
                    //console.log(response);
                    //this.onCursusChanged.next(response);
                    this.chosenCursus = response;
                    this.contacts = response;
                    resolve(response);
                }, reject);
        }
        );
    }


    getCourseById(id): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'course/' + Number(id))
                .subscribe((response: any) => {
                    //console.log(" course selected");
                    //console.log(response);
                    //this.onCursusChanged.next(response);
                    this.chosenCourse = response;
                    resolve(response);
                }, reject);
        }
        );
    }

}