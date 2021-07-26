import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

import { CourseSession } from 'app/main/apps/disponibility-trainer/courseSession.model';
import { Contact } from 'app/main/apps/trainer/trainer.model';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class DisponibilityTrainerService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onTrainersChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    onDisponibilitiesChanged: BehaviorSubject<any[]>;
    onSpecificCourseSessionsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onSelectedTrainerChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    trainers: Contact[];
    trainer: any;
    courses: any[];
    specificCourseSessions: CourseSession[];
    contacts: CourseSession[];
    user: any;
    courseSessions: any[] = [];
    selectedContacts: string[] = [];
    disponibilities: any[];
    trainerId: any;
    courseId: any;
    searchText: string;
    filterBy: string;
  

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onTrainersChanged = new BehaviorSubject([]);
        this.onDisponibilitiesChanged = new BehaviorSubject([]);
        this.onCoursesChanged = new BehaviorSubject([]);
        this.onSpecificCourseSessionsChanged = new BehaviorSubject([]);
        this.onSelectedTrainerChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
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
                this.getContacts(),
                this.getUserData(),
                this.getTrainers(),
                this.getCourses(),
                this.getDisponibilities(),

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
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'courseSession')
                .subscribe((response: any) => {

                    console.log(response);
                    this.contacts = response;
                    this.courseId = this.filterBy;
                    //console.log(this.contacts[0].courseSessionName);
                    /* if ( this.filterBy === 'starred' )
                     {
                         this.contacts = this.contacts.filter(_contact => {
                             return this.user.starred.includes(_contact.id);
                         });
                     }*/
                     console.log("courseId");
                     console.log(this.courseId);
                    //this.specificCourseSessions = response;
                    if (this.courseId != null) {
                        if (this.filterBy === 'Formations') {
                                console.log("if formations");
                        }
                        else {
                            console.log("else filter");
                            console.log(this.courseId)
                          /*  this.contacts.forEach(contact => {
                                if (contact.course.id == this.courseId) {
                                    if (!this.courseSessions.includes(contact))
                                        this.courseSessions.push(contact);
                                }

                            });*/


                            this.contacts = this.contacts.filter(_courseSession => {
                                // return this.user.frequentContacts.includes(_contact.id);
                                if (_courseSession.course.id == this.courseId) {
                                    console.log(_courseSession.course);
                                    return true; }
                                return false;
                            });
                        }
                    }
                    else {
                        this.contacts = [];
                    }

                    if (this.filterBy === 'frequent') {
                        this.contacts = this.contacts.filter(_contact => {
                            return this.user.frequentContacts.includes(_contact.id);
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                    }

                    /*this.contacts = this.contacts.map(contact => {
                        return new CourseSession(contact);
                    });*/


                    this.onSpecificCourseSessionsChanged.next(this.contacts);
                    resolve(this.contacts);
                }, reject);
        }
        );
    }

    /*   getSpecificCourseSessions(id): Promise<any> {
   
           if (id == null) {
               return new Promise((resolve, reject) => {
   
                   this._httpClient.get(AUTH_API + 'courseSession')
                       .subscribe((response: any) => {
                           console.log("ALL coursesessions");
                           console.log(response);
                           this.specificCourseSessions = response;
                           if (this.courses != null) {
                               if (this.filterBy === 'Formations') {
   
                               }
                               else {
   
                                   this.contacts.forEach(contact => {
                                       if (contact.course.id == this.courseId) {
                                           if (!this.courseSessions.includes(contact))
                                               this.courseSessions.push(contact);
                                       }
   
                                   });
   
   
                                   this.specificCourseSessions = this.specificCourseSessions.filter(_courseSession => {
                                       // return this.user.frequentContacts.includes(_contact.id);
                                       if (this.trainersId.includes(_trainer.id)) { return true; }
                                       return false;
                                   });
                               }
                           }
                           else {
                               this.courseSessions = [];
                           }
   
   
   
                           this.onSpecificCourseSessionsChanged.next(response);
   
   
                           resolve(response);
                       }, reject);
               }
               );
           }
   
   
   
   
           this.onSpecificCourseSessionsChanged.next(this.courseSessions);
        
           else {
               return new Promise((resolve, reject) => {
   
                   this._httpClient.get(AUTH_API + 'courseSession/course/' + Number(id))
                       .subscribe((response: any) => {
                           console.log("specific coursesessions");
                           console.log(response);
   
                           this.onSpecificCourseSessionsChanged.next(response);
                           this.specificCourseSessions = response;
   
                           resolve(response);
                       }, reject);
               }
               );
           }
   
       }*/


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

    getCourses(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'course')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.courses = response;
                    this.onCoursesChanged.next(response);
                    
                    resolve(response);
                }, reject);
        }
        );
    }

    getTrainerById(id): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers/' + id)
                .subscribe((response: any) => {
                    console.log("response trianer id");
                    console.log(response);

                    this.trainer = response;
                    resolve(response);
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
            this._httpClient.get(AUTH_API + 'courseSession')
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

    getDisponibilities(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainerDisponibility')
                .subscribe((response: any) => {
                    console.log("disponibilities");
                    console.log(response);
                    this.disponibilities = response;
                    this.onDisponibilitiesChanged.next(response);

                    resolve(response);
                }, reject);
        }
        );
    }

    /**
 * Update contact
 *
 * @param disponibility
 * @returns {Promise<any>}
 */
    saveDisponibility(disponibility): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'trainerDisponibility', disponibility)
                .subscribe(response => {
                    this.getDisponibilities();
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
            this.contacts.map(contact => {
                this.selectedContacts.push(contact.id.toString());
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
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'courseSession' + contact.id, { ...contact })
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'courseSession' + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getUserData();
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

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        for (const contactId of this.selectedContacts) {
            const contact = this.contacts.find(_contact => {
                return _contact.id.toString() === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

    saveSelectedDisponibilities(): void {
        for (const contactId of this.selectedContacts) {
            const contact = this.contacts.find(_contact => {
                return _contact.id.toString() === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            console.log(this.contacts[contactIndex]);
            //this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

}
