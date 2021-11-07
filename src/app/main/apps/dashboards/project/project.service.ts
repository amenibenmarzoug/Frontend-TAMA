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
    onFilterByParticipantChanged : Subject<any>;

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
        private _httpClient: HttpClient
    )
    {
        this.onParticipantsChanged= new  BehaviorSubject([]);
        this.onAttendancesChanged= new BehaviorSubject([]);
        this.onProgramsInstChanged=new BehaviorSubject([]);
        this.onParticipantsByClasseChanged=new BehaviorSubject([]);
        this.onFilterByParticipantChanged=new Subject();

            //numbers
    this.onPresenceNumberChanged = new Subject();
    this.onAbsenceNumberChanged=new Subject();
    this.onJustifiedAbsenceNumberChanged=new Subject();
    this.totalNumber=0 ; 
    this.absenceNumber=0 ; 
    this.presenceNumber=0;
    this.justifiedAbsencesNumber=0 ; 
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

                    this.onFilterByParticipantChanged.subscribe(participant => {
                        this.selectedParticipant = participant;
                        this.getAttendances();
                        this.getPresences(this.selectedParticipant.id)
                        this.getAbsences(this.selectedParticipant.id)
                        this.getJustifiedAbsences(this.selectedParticipant.id)
                        
                    });
    
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
            this._httpClient.get(AUTH_API+ 'participants/validated/classId/'+classId)
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
