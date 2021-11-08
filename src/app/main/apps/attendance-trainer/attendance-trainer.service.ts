
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '../../../../@fuse/utils';
import { environment } from '../../../../environments/environment';
import { Participant } from '../../../shared/models/participant.model';
import { Session } from '../../../shared/models/session.model';
import { Attendance } from '../../../shared/models/attendance.model';

const AUTH_API = environment.backend_url + 'api/';
const USER_KEY = 'auth-user';
@Injectable({
    providedIn: 'root'
})
export class AttendanceTrainerService {

    //----attendance------//
    user: any;
    sessions: Session[];
    participants: Participant[];
    
    onClassChanged: BehaviorSubject<any>;

    onParticipantsChanged: BehaviorSubject<any>;
    onClassesChanged : BehaviorSubject<any>;
    onAttendancesChanged: BehaviorSubject<any>;
    onSessionsChanged: BehaviorSubject<any>;

    onSelectedAttendancesChanged: BehaviorSubject<any>;
    onFilterByClassChanged:Subject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onFilterByDateChanged: Subject<any>;
    onFilterByParticipantChanged: Subject<any>;
    onCheckedAttendanceChanged: Subject<any>;
    onAttendanceCheckedSessionsChanged: Subject<any>;
    attendances: Attendance[];
    attendance: Attendance;
    session: Session;
    class: any;
    classes : any[] ; 
    searchText: string;
    filterBy: any;
    id: number;
    filterByDate: any;
    filterByParticipant: any;
    checkedAttendance: boolean;
    attendanceCheckedSessions: any[];
    onPresenceNumberChanged: Subject<any>;
    onAbsenceNumberChanged: Subject<any>;
    onJustifiedAbsenceNumberChanged: Subject<any>;
    filterByClasse: any;


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
        this.onAttendancesChanged = new BehaviorSubject([]);
        this.onSessionsChanged = new BehaviorSubject([]);
        this.onClassesChanged = new  BehaviorSubject([]);
        this.onClassChanged = new BehaviorSubject([]);
        this.onParticipantsChanged = new BehaviorSubject([]);
        this.onPresenceNumberChanged = new Subject();
        this.onAbsenceNumberChanged = new Subject();
        this.onJustifiedAbsenceNumberChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onFilterByDateChanged = new Subject();
        this.onFilterByClassChanged=new Subject();
        this.onFilterByParticipantChanged = new Subject();
        this.onCheckedAttendanceChanged = new Subject();
        this.onAttendanceCheckedSessionsChanged = new Subject();

        //this user 
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
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
                this.getAttendances(),
                this.getParticipants(),
                this.getClasses() , 
                this.getMySessionsByDate(),

            ]).then(
                ([files]) => {

                    this.onFilterByDateChanged.subscribe(filter => {
                        this.filterByDate = filter;
                        this.getAttendances()
                        this.getMySessionsByDate();
                        this.getAttendanceCheckedSessions();
                    });

                    this.onFilterByParticipantChanged.subscribe(filter => {
                        if (filter != null) {
                            this.filterByParticipant = filter;
                            this.getAbsencesByTrainerIdAndParticipantId(filter.id);
                            this.getPresencesByTrainerIdAndParticipantId(filter.id);

                            this.getJustifiedAbsencesByTrainerIdAndParticipantId(filter.id);
                        }
                        else {
                            this.filterByParticipant = filter;

                        }
                        this.getAttendances();

                    });
                    this.onFilterByClassChanged.subscribe(group => {
                        this.filterByClasse = group;
                        if(this.filterByClasse != null) {
                        this.getParticipantsOfSelectedClass()
                        }
                        else {
                            this.getParticipants() ; 
                        }
                        this.getAttendances();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.session = filter;
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

        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.backend_url + 'api/session/trainerId/' + this.user.id)
                .subscribe((response: any) => {

                    this.sessions = response;

                    //filterBy would be the date selected by the trainer
                    if (this.filterByDate != null) {
                       // this.sessions = response;

                        this.sessions = this.sessions.filter(_session => {
                            const courseBeginDate = new Date(_session.sessionBeginDate)
                            if (courseBeginDate.toDateString() == this.filterByDate.toDate().toDateString()) {
                                return true;
                            }
                            return false;

                        });
                    }
                    this.onSessionsChanged.next(this.sessions);
                    resolve(this.sessions);
                }, reject);
        });
    }

    /**
    * Get class
    *
    * @returns {Promise<any>}
    */
    getClass(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'session/getClass/' + this.session.id)
                .subscribe((response: any) => {

                    this.class = response;
                    this.onClassChanged.next(this.class);
                    this.getParticipantsOfSelectedClass();
                    resolve(this.class);
                }, reject);
        }
        );
    }

    generateReport(sessionId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/generateReport/' + sessionId, {
                responseType: 'blob'
            })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        }
        );
    }


    /**
    * Get participants
    *
    * @returns {Promise<any>}
    */

    
    getParticipantsOfSelectedClass():Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+ 'participants/validated/classId/'+this.filterByClasse.id)
                .subscribe((response: any) => {
                    this.participants = response;
                    this.onParticipantsChanged.next(this.participants);
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
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/trainer/' + this.user.id)
                .subscribe((response: any) => {

                    this.attendances = response;
                    this.attendances=this.attendances.filter(attendance => {
                        if (attendance.attendanceState !== 'PRESENT') {
                            return true;
                        }
                        return false;
                    }
                    );

                    if (this.filterByDate != null) {
                        this.filterBy = null;
                        this.attendances = this.attendances.filter(attendance => {
                            const attendanceDate = new Date(attendance.session.sessionBeginDate)
                            if (attendanceDate.toDateString() == this.filterByDate.toDate().toDateString()) {
                                return true;
                            }
                            return false;
                        });

                    }

                    if (this.filterBy != null) {
                        this.attendances = this.attendances.filter(attendance => {
                            if (attendance.session.id == this.filterBy.id) {
                                return true;
                            }
                            return false;
                        });

                    }
                    if (this.filterByParticipant != null) {
                        this.attendances = this.attendances.filter(attendance => {
                            if (attendance.participant.id == this.filterByParticipant.id) {
                                return true;
                            }
                            return false;
                        });

                    }
                    if (this.filterByClasse != null) {
                        this.attendances = this.attendances.filter(attendance => {
                            
                            if (attendance.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == this.filterByClasse.id) {
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

    getParticipants(): Promise<any> {
        

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participantRegistrations/participants/trainer/' + this.user.id)
                .subscribe((response: any) => {
                    this.participants = response;

                    this.participants.sort(function (a, b) {
                        if (a.firstNameP.toLowerCase() < b.firstNameP.toLowerCase()) { return -1; }
                        if (a.firstNameP.toLowerCase() > b.firstNameP.toLowerCase()) { return 1; }
                        return 0;
                    })
                    this.onParticipantsChanged.next(this.participants);
                    resolve(this.participants);

                }, reject);
        }
        );
    }

    getClasses(): Promise<any> {
   
        return new Promise((resolve, reject) => {
            
            this._httpClient.get(AUTH_API+ 'session/classestrainer/' + this.user.id)
            .subscribe((response: any) => {
                this.classes = response;
               
                this.onClassesChanged.next(this.classes);
                resolve(this.classes);
            }, reject);
        } );
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
                    this.onAttendanceCheckedSessionsChanged.next(this.attendanceCheckedSessions);
                    resolve(this.attendanceCheckedSessions);
                }, reject);
        }
        );
    }

    getPresencesByTrainerIdAndParticipantId(participantId): Promise<any> {
        let param = new HttpParams().set('participantId', participantId).set('trainerId', this.user.id);

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/participant/trainer/presence', { params: param })
                .subscribe((response: any) => {
                    resolve(response);
                    this.onPresenceNumberChanged.next(response);
                }, reject);
        }
        );
    }

    getAbsencesByTrainerIdAndParticipantId(participantId): Promise<any> {
        let param = new HttpParams().set('participantId', participantId).set('trainerId', this.user.id);

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/participant/trainer/absence', { params: param })
                .subscribe((response: any) => {
                    resolve(response);
                    this.onAbsenceNumberChanged.next(response);
                }, reject);
        }
        );
    }

    getJustifiedAbsencesByTrainerIdAndParticipantId(participantId): Promise<any> {
        let param = new HttpParams().set('participantId', participantId).set('trainerId', this.user.id);

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/participant/trainer/justified', { params: param })
                .subscribe((response: any) => {
                    resolve(response);
                    this.onJustifiedAbsenceNumberChanged.next(response);
                }, reject);
        }
        );
    }


    markPresent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'attendance/markPresent', attendance)
                .subscribe(response => {
                    this.getAttendances();

                    resolve(response);


                });

        });
    }

    markAbsent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'attendance/markAbsent', attendance)
                .subscribe(response => {
                    this.getAttendances();

                    resolve(response);


                });

        });
    }

    markJustifiedAbsent(attendance): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.put(AUTH_API + 'attendance/markJustifiedAbsent', attendance)
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

            this._httpClient.post(AUTH_API + 'attendance/createAttendance/' + session.id, participant)
                .subscribe(response => {
                    this.getAttendances();
                    resolve(response);

                });
        });
    }


}