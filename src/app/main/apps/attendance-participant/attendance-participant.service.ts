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
        this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
        this.userId = this.data.id;
        this.userRole = this.data.roles;
        if (this.userRole.includes("PARTICIPANT")) {
            this.getAttendancesByParticipantId(this.userId);
        }

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



    getAttendancesByParticipantId(participantId): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/participant/' + participantId)
                .subscribe((response: any) => {

                    //this.attendances = [];
                    this.attendances = response;
                    if (this.searchText && this.searchText !== '') {
                        this.attendances = FuseUtils.filterArrayByString(this.attendances, this.searchText);
                    }
                    this.onAttendancesChanged.next(this.attendances);
                    resolve(this.attendances);

                }, reject);
        }
        );
    }

  

}

