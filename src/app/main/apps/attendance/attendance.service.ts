
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

//something is wrong with the imports - Error From Nadia
import { FuseUtils } from '../../../../@fuse/utils';
import {environment} from '../../../../environments/environment';
//import { Contact } from 'app/main/apps/participants/participant.model';
import { MyParticipant } from '../my-participants/my-participant.model';
import { Session } from '../academy/add-session/session.model';
import { Attendance } from './attendance.model';

const AUTH_API = environment.backend_url+ 'api/';
const USER_KEY = 'auth-user';
@Injectable()
export class AttendanceService implements Resolve<any>
{
    
    //----attendance------//
    user: any;
    sessions : Session[];
    participants: MyParticipant[] ; 
    onAttendancesChanged :  BehaviorSubject<any>;
    onSessionsChanged :  BehaviorSubject<any>;
    onClassChanged :  BehaviorSubject<any>;
    onParticipantsChanged : BehaviorSubject<any>;
    onSelectedAttendancesChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onFilterByDateChanged : Subject<any>;
    onCheckedAttendanceChanged :  Subject<any>;
    onAttendanceCheckedSessionsChanged: Subject<any>;
    attendances: Attendance[];
    attendance : Attendance ; 
    session : Session ;
    class : any ; 
    searchText: string;
    filterBy: any;
    id: number;
    filterByDate: any ; 
    checkedAttendance: boolean;
    attendanceCheckedSessions : any[] ;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(

        private _httpClient: HttpClient,

    ) {

        // Set the defaults
        this.onSearchTextChanged = new Subject();
        //----attendance---
        this.onAttendancesChanged= new BehaviorSubject([]);
        this.onSessionsChanged=new  BehaviorSubject([]);
        this.onClassChanged= new  BehaviorSubject([]);
        this.onParticipantsChanged= new  BehaviorSubject([]);
        this.onFilterChanged = new Subject();
        this.onFilterByDateChanged = new Subject();
        this.onCheckedAttendanceChanged = new Subject();
        this.onAttendanceCheckedSessionsChanged =new Subject();
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getMySessionsByDate(),

            ]).then(
                ([files]) => {

                    this.onFilterByDateChanged.subscribe(filter => {
                        this.filterByDate = filter;
                        this.getMySessionsByDate();
                        this.getAttendanceCheckedSessions();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.session=filter ; 
                        this.getClass();
                        this.getAttendances();
                        //this.checkAttendance() ; 
                        //this.getContacts();
                    });

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getAttendances();
                    });
                    resolve();

                },
                reject
            );
        });
    }

     /**
     * Get my Sessions 
     *
     * @returns {Promise<any>}
     */
     //this function will return the sessions of the concerned trainer in a specific date chosen in the filter
     getMySessionsByDate(): Promise<any> {
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        console.log("trainer : "+(this.user.id).toString()) 
        
        return new Promise((resolve, reject) => {
            
            this._httpClient.get(environment.backend_url+ 'api/session/trainerId/'+this.user.id)
                .subscribe((response: any) => {
                    console.log(response);
                    this.sessions = [];
                    
                    //filterBy would be the date selected by the trainer
                    console.log("THIS FILTEREDBY");
                    console.log(this.filterByDate);
                    if (this.filterByDate != null) {
                        this.sessions = response;
                        
                        this.sessions = this.sessions.filter(_session => {
                            const courseBeginDate = new Date(_session.sessionBeginDate)
                            if (courseBeginDate.toDateString() == this.filterByDate.toDate().toDateString()) {
                                return true;
                            }
                            return false;
                            
                        });
                    }
                    console.log("Sessionss")
                    console.log(this.sessions)
                    this.onSessionsChanged.next(this.sessions);
                    resolve(this.sessions);
                }, reject);
        } );
     }
     
     /**
     * Get class
     *
     * @returns {Promise<any>}
     */
    getClass() : Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API+ 'session/getClass/'+this.session.id)
                    .subscribe((response: any) => {
                        
                        this.class = response;
                        this.onClassChanged.next(this.class);
                        this.getParticipantsOfSelectedSession() ; 

                        console.log("Classe")
                        console.log(this.class)
                        resolve(this.class);
                    }, reject);
            }
        );
    }

     /**
     * Get participants
     *
     * @returns {Promise<any>}
     */

     getParticipantsOfSelectedSession():Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+ 'participants/classId/'+this.class.id)
                .subscribe((response: any) => {
                    this.participants = response;
                    this.onParticipantsChanged.next(this.participants);

                    console.log("participants")
                    console.log(this.participants)
                    resolve(this.participants);
                }, reject);
        }
    );
    }

     /**
     * Get Attendances
     *
     * @returns {Promise<any>}
     */

     getAttendances(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance')
                .subscribe((response: any) => {
                    
                    this.attendances = [];
                    console.log("THIS FILTEREDBY");
                    console.log(this.filterBy);
                    if (this.filterBy != null) {


                        this.attendances = response;
                        this.attendances = this.attendances.filter(attendance => {
                            if (attendance.session.id == this.filterBy.id) {
                                console.log("True");
                                return true;
                            }
                            return false;
                        });

                    }
                    if (this.searchText && this.searchText !== '') {
                        this.attendances = FuseUtils.filterArrayByString(this.attendances, this.searchText);
                    }
                    this.onAttendancesChanged.next(this.attendances);
                    resolve(this.attendances);

                }, reject);
        }
        );
    }

    /**
     * Get Sessions with Attendance Marked
     *
     * @returns {Promise<any>}
     */

     getAttendanceCheckedSessions(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/AttendanceMarkedSessions')
                .subscribe((response: any) => {
   
                        this.attendanceCheckedSessions = response;
                        this.attendanceCheckedSessions = this.attendanceCheckedSessions.filter(session => {
                            if (session.trainer.id == this.user.id) {
                                return true;
                            }
                            return false;
                        });

                        if (this.filterByDate != null) {
                            this.attendanceCheckedSessions = this.attendanceCheckedSessions.filter(_session => {
                                const courseBeginDate = new Date(_session.sessionBeginDate)
                                if (courseBeginDate.getDate() == this.filterByDate.toDate().getDate()) {
    
                                    return true;
                                }
                                return false;
                            });
                        }    

                    console.log("sessions checked by this trainer")
                    console.log(this.attendanceCheckedSessions)
                    this.onCheckedAttendanceChanged.next(this.attendanceCheckedSessions);
                    resolve(this.attendanceCheckedSessions);
                }, reject);
        }
        );
    }

    markPresent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {
          
            console.log("attendance IN SERVICE");
            console.log(attendance);
            this._httpClient.put(AUTH_API+ 'attendance/markPresent', attendance)
                .subscribe(response => {
                    this.getAttendances();

                    resolve(response);


                });

        });
    }

    markAbsent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {
          
            console.log("attendance IN SERVICE");
            console.log(attendance);
            this._httpClient.put(AUTH_API+ 'attendance/markAbsent', attendance)
                .subscribe(response => {
                    this.getAttendances();

                    resolve(response);


                });

        });
    }

    markNotifiedAbsent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {
          
            console.log("attendance IN SERVICE");
            console.log(attendance);
            this._httpClient.put(AUTH_API+ 'attendance/markNotifiedAbsent', attendance)
                .subscribe(response => {
                    this.getAttendances();

                    resolve(response);


                });

        });
    }


/*
    checkAttendance(): Promise<any>
     {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendanceMarked/'+this.session.id)
                .subscribe((response: any) => {
                    
                    this.checkedAttendance = response;
                    this.onCheckedAttendanceChanged.next(this.checkedAttendance);
                    console.log("checking attendance")
                    console.log(this.checkedAttendance)
                    resolve(this.checkedAttendance);
                }, reject);
        }
        );
    }

    */
    /**
     * Generate the attendances
     *
     * @returns {Promise<any>}
     */

    generateAttendance(session, participant): Promise<any> {
        return new Promise((resolve, reject) => {
            
            this._httpClient.post(AUTH_API +'attendance/createAttendance/'+ session.id, participant)
                .subscribe(response => {
                    this.getAttendances();
                    resolve(response);
                    
                });
        });
    }


}