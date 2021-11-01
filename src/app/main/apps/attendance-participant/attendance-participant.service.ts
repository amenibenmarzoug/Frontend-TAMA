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
@Injectable()
export class AttendanceParticipantService implements Resolve<any>
{


    onSearchTextChanged: Subject<any>;
    
    onAttendancesChanged: BehaviorSubject<any>;
    searchText: string;
    attendances: Attendance[];
    participant: Participant ; 
    user: any;
    userRole: any;
    userId: number;

    data:any;

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
        this.onAttendancesChanged = new BehaviorSubject([]);
        this.onPresenceNumberChanged = new Subject();
        this.onAbsenceNumberChanged=new Subject();
        this.onJustifiedAbsenceNumberChanged=new Subject();
        this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        this.userId = this.data.id;
        this.userRole = this.data.roles;
        if (this.userRole.includes("PARTICIPANT")) {
            this.getAttendancesByParticipantId(this.userId);
            this.getPresences(this.userId); 
            this.getAbsences(this.userId); 
            this.getJustifiedAbsences(this.userId); 
        }

        //numbers
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise<void>((resolve, reject) => {

            Promise.all([

            ]).then(
                ([files]) => {



                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getAttendancesByParticipantId(this.userId);
                    });
                    resolve();

                },
                reject
            );
        });
    }


    // this will only return the attendances with status 'absent' or 'justified absent'
    getAttendancesByParticipantId(participantId): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/participant/' + participantId)
                .subscribe((response: any) => {

                    //this.attendances = [];
                    this.attendances = response;
                    this.attendances=this.attendances.filter(attendance => {
                        if (attendance.attendanceState !== 'PRESENT') {
                            return true;
                        }
                        return false;
                    }
                        );

                    if (this.searchText && this.searchText !== '') {
                        this.attendances = FuseUtils.filterArrayByString(this.attendances, this.searchText);
                    }
                    this.onAttendancesChanged.next(this.attendances);
                    
                    //numbers 
                    this.totalNumber=this.attendances.length;


                    resolve(this.attendances);

                }, reject);
        }
        );
    }

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

