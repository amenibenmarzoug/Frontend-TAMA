import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import {environment} from '../../../../../environments/environment';
import { Participant } from '../../../../shared/models/participant.model';
import { Session } from '../../../../shared/models/session.model';
import { Attendance } from '../../../../shared/models/attendance.model';

const AUTH_API = environment.backend_url+ 'api/';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})


@Injectable()
export class ProjectDashboardService implements Resolve<any>
{
    projects: any[];
    widgets: any[];

    participants: Participant[] ; 
    attendances: Attendance[];

    selectedParticipant : Participant ; 
    onParticipantsChanged : BehaviorSubject<any>;
    onAttendancesChanged :  BehaviorSubject<any>;
    onProgramsInstChanged:  BehaviorSubject<any>;
    onParticipantsByClasseChanged: BehaviorSubject<any>;
    participantsByClasse: any;
    
    


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        this.onParticipantsChanged= new  BehaviorSubject([]);
        this.onAttendancesChanged= new BehaviorSubject([]);
        this.onProgramsInstChanged=new BehaviorSubject([]);
        this.onParticipantsByClasseChanged=new BehaviorSubject([]);
        }

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
                this.getProjects(),
                this.getWidgets(),
                this.getParticipants(),
                this.getAttendances(), 
                this.getProgramsInst()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }

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

    getAttendances(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance')
                .subscribe((response: any) => {
                    
                    this.attendances = response;
                    if (this.selectedParticipant != null) {
                        this.attendances = this.attendances.filter(attendance => {
                            if (attendance.participant.id == this.selectedParticipant.id) {
                                return true;
                            }
                            return false;
                        });
    
                    }
                    this.onAttendancesChanged.next(this.attendances);
                    resolve(this.attendances);
    
                }, reject);
        }
        );
    }


    getProgramsInst(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programsInst')
                .subscribe((response: any) => {
                    
                    this.onProgramsInstChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getParticipantsOfSelectedClasse(classId):Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+ 'participants/classId/'+classId)
                .subscribe((response: any) => {
                    this.participantsByClasse = response;
                    this.onParticipantsByClasseChanged.next(this.participantsByClasse);
    
                    console.log("participants by classe")
                    console.log(this.participantsByClasse)
                    resolve(this.participantsByClasse);
                }, reject);
        }
    );
    }

}