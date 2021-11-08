
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

//something is wrong with the imports - Error From Nadia
import { FuseUtils } from '../../../../@fuse/utils';
import {environment} from '../../../../environments/environment';
import { Participant } from '../../../shared/models/participant.model';
import { Session } from '../../../shared/models/session.model';
import { Attendance } from '../../../shared/models/attendance.model';

const AUTH_API = environment.backend_url+ 'api/';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class AttendanceManagerService implements Resolve<any> {

//----attendance------//
user: any;
sessions : Session[];
participants: Participant[] ; 
onAttendancesChanged :  BehaviorSubject<any>;
onSessionsChanged :  BehaviorSubject<any>;
onClassChanged :  BehaviorSubject<any>;
onParticipantsChanged : BehaviorSubject<any>;
onClassesChanged : BehaviorSubject<any>;
onSelectedAttendancesChanged: BehaviorSubject<any>;
onSearchTextChanged: Subject<any>;
onFilterChanged: Subject<any>;
onFilterByDateChanged : Subject<any>;
onFilterByParticipantChanged : Subject<any>;
onFilterByClassChanged:Subject<any>;

onCheckedAttendanceChanged :  Subject<any>;
onAttendanceCheckedSessionsChanged: Subject<any>;
attendances: Attendance[];
attendance : Attendance ; 
session : Session ;
class : any ; 
searchText: string;
participant : any ; 
filterBy: any;
id: number;
filterByDate: any ; 
checkedAttendance: boolean;
attendanceCheckedSessions : any[] ;

classes: any;
filterByClasse: any;

//stats
onPresenceNumberChanged :  Subject<any>;
onAbsenceNumberChanged :  Subject<any>;
onJustifiedAbsenceNumberChanged :  Subject<any>;
totalNumber: any ; 
absenceNumber : any ; 
presenceNumber : any ; 
justifiedAbsencesNumber : any ; 


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
    this.onClassesChanged = new  BehaviorSubject([]);

    this.onClassChanged= new  BehaviorSubject([]);
    this.onParticipantsChanged= new  BehaviorSubject([]);
    this.onFilterChanged = new Subject();
    this.onFilterByDateChanged = new Subject();
    this.onCheckedAttendanceChanged = new Subject();
    this.onAttendanceCheckedSessionsChanged =new Subject();
    this.onFilterByParticipantChanged=new Subject();
    this.onFilterByClassChanged=new Subject();

    //numbers
    this.onPresenceNumberChanged = new Subject();
    this.onAbsenceNumberChanged=new Subject();
    this.onJustifiedAbsenceNumberChanged=new Subject();
    this.totalNumber=0 ; 
    this.absenceNumber=0 ; 
    this.presenceNumber=0;
    this.justifiedAbsencesNumber=0 ; 
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
            this.getAttendances(),
            //this.getAttendanceCheckedSessions(),
            this.getParticipants(),
            this.getClasses(),
            this.getSessions()  , 

        ]).then(
            ([files]) => {

                this.onFilterByDateChanged.subscribe(filter => {
                    this.filterByDate = filter;
                    this.getAttendances()
                    this.getSessions();
                    //this.getAttendanceCheckedSessions();
                });

                this.onFilterChanged.subscribe(filter => {
                    this.filterBy = filter;
                    this.session=filter ; 
                    this.getClass();
                    this.getAttendances();
                    //this.checkAttendance() ; 
                    //this.getContacts();
                });

                this.onFilterByParticipantChanged.subscribe(participant => {
                    this.participant = participant;
                    if(this.participant!=null){
                    this.getPresences(this.participant.id)
                    this.getAbsences(this.participant.id)
                    this.getJustifiedAbsences(this.participant.id);}
                    this.getAttendances();

                    
                });

                this.onFilterByClassChanged.subscribe(group => {
                    this.filterByClasse = group;
                    if(this.filterByClasse != null) {
                    this.getParticipantsOfSelectedClass()
                    }
                    this.getSessions() ; 
                    this.getAttendances();
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
 getSessions(): Promise<any> {
    
    
    return new Promise((resolve, reject) => {
        
        this._httpClient.get(AUTH_API+ 'session')
            .subscribe((response: any) => {
                console.log(response);
                this.sessions = response;
                
                //filterBy would be the date selected by the trainer
                console.log("THIS FILTEREDBY");
                console.log(this.filterByDate);
                if (this.filterByDate != null) {
                    console.log("in filter by date");
                    
                    this.sessions = this.sessions.filter(_session => {
                        const courseBeginDate = new Date(_session.sessionBeginDate)
                        if (courseBeginDate.toDateString() == this.filterByDate.toDate().toDateString()) {
                            return true;
                        }
                        return false;
                        
                    });
                }
                if (this.filterByClasse != null) {
                    console.log("in filter by classe");
                    this.sessions = this.sessions.filter(_session => {
                        
                        if (_session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id == this.filterByClasse.id) {
                            
                            return true;
                        }
                        return false;
                        
                    });
                }

                this.onSessionsChanged.next(this.sessions);
                console.log("Sessionss")
                console.log(this.sessions)
                
                resolve(this.sessions);
            }, reject);
    } );
 }

 
 /**
 * Get class From Session
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

generateReport(sessionId) : Promise<any>
{
    return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+ 'attendance/generateReport/'+sessionId, {
                responseType: 'blob'})
                .subscribe((response: any) => {
                    
                    console.log("RESPONSE SERVICE");
                    console.log(response);
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

 getParticipants(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API+ 'validatedParticipants')
            .subscribe((response: any) => {
                this.participants = response;
                /*
                if (this.filterByClasse != null) {
                    this.getParticipantsOfSelectedClass()
                }

                else {
                this.onParticipantsChanged.next(this.participants);
                }*/
                this.participants.sort(function(a, b){
                    if(a.firstNameP.toLowerCase() < b.firstNameP.toLowerCase()) { return -1; }
                    if(a.firstNameP.toLowerCase() > b.firstNameP.toLowerCase()) { return 1; }
                    return 0;
                })
                this.onParticipantsChanged.next(this.participants);
                console.log("participants")
                console.log(this.participants)
                resolve(this.participants);
            }, reject);
    }
);
}


 /**
 * Get all confirmed classes
 *
 * @returns {Promise<any>}
 */
 //not added yet
 getClasses(): Promise<any> {
   
    return new Promise((resolve, reject) => {
        
        this._httpClient.get(AUTH_API+ 'confirmedClasses')
        .subscribe((response: any) => {
            this.classes = response;
            this.onClassesChanged.next(this.classes);
            resolve(this.classes);
        }, reject);
    } );
 }
 


 getParticipantsOfSelectedSession():Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API+ 'participants/validated/classId/'+this.class.id)
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

getParticipantsOfSelectedClass():Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API+ 'participants/validated/classId/'+this.filterByClasse.id)
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
                
                this.attendances = response;
                this.attendances = this.attendances.filter(attendance => {
                    if (attendance.attendanceState!== 'PRESENT') {
                        console.log("True");
                        return true;
                    }
                    return false;
                });
                console.log("THIS FILTEREDBY");
                console.log(this.filterBy);
                if (this.filterBy != null) {
                    this.attendances = this.attendances.filter(attendance => {
                        if (attendance.session.id == this.filterBy.id) {
                            console.log("True");
                            return true;
                        }
                        return false;
                    });

                }
                if (this.filterByDate != null) {
                    this.attendances = this.attendances.filter(attendance => {
                        const attendanceDate = new Date(attendance.session.sessionBeginDate)
                        if (attendanceDate.toDateString() == this.filterByDate.toDate().toDateString()) {
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


                if (this.participant != null) {
                    this.attendances = this.attendances.filter(attendance => {
                        if (attendance.participant.id == this.participant.id) {
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
                this.onAttendanceCheckedSessionsChanged.next(this.attendanceCheckedSessions);
                resolve(this.attendanceCheckedSessions);
            }, reject);
    }
    );
}

//stats
getPresences(participantId): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'attendance/presencesNumber/' + participantId)
            .subscribe((response: any) => {
                this.presenceNumber=response
                this.onPresenceNumberChanged.next(this.presenceNumber)
                resolve(this.presenceNumber);
            }, reject);
    }
    );
}

getAbsences(participantId): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'attendance/absencesNumber/' + participantId)
            .subscribe((response: any) => {
                this.absenceNumber=response
                this.onAbsenceNumberChanged.next(this.absenceNumber)
                resolve(this.absenceNumber);
            }, reject);
    }
    );
}

getJustifiedAbsences(participantId): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'attendance/justifiedAbsencesNumber/' + participantId)
            .subscribe((response: any) => {
                this.justifiedAbsencesNumber=response
                this.onJustifiedAbsenceNumberChanged.next(this.justifiedAbsencesNumber)
                resolve(this.justifiedAbsencesNumber);
            }, reject);
    }
    );
}




}
