import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { environment } from 'environments/environment';
import { Participant } from 'app/main/apps/participants/participant.model';
import { reject } from 'lodash';


const AUTH_API = environment.backend_url + 'api/';
const USER_KEY = 'auth-user';

@Injectable()
export class ClasseParticipantsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    participantType: string;
    participants: Participant[]=[];

    user: any;
    classe: any;
    groupeId: number;
    searchText: string;
    id: number;
    classeId: number
    registrations: any;
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
        this.onSearchTextChanged = new Subject();

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
                //this.getContacts(),


            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                       // this.getContacts();
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
   /* getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participants/classId/' + this.classeId)
                .subscribe((response: any) => {

                    this.participants = response;
                     console.log("chfama hen" + this.participants)
                    // this.participants = this.participants.map(contact => {
                    //     return new Participant(contact);
                    // });

                    this.onContactsChanged.next(this.participants);
                    resolve(this.participants);
                }, reject);
        }
        );
    }
   */




    /**
     * Delete contact
     *
     * @param id
     */
    deleteContact(id): Promise<any> {


        return new Promise((resolve, reject) => {
            const contactIndex = this.participants.indexOf(id);
            this.participants.splice(contactIndex, 1);
            this.onContactsChanged.next(this.participants);
            this._httpClient.delete(AUTH_API + `participants/${id}`)
                .subscribe(response => {
                    // this.getContacts();

                    resolve(response);
                });
        });
    }

    getParticipantsByProgramInstanceId(programInstanceId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participantRegistrations/programInst/' + programInstanceId)
                .subscribe((response: any) => {
                    this.participants=[];
                    this.registrations=response;
                    this.registrations = this.registrations.filter(registration =>{
                        if (registration.status == 'ACCEPTED') {
                            this.participants.push(registration.participant);
                            return true;
                        }
                        return false;
                    });
                    
                  
                    // this.participants = this.participants.map(contact => {
                    //     return new Participant(contact);
                    // });

                    this.onContactsChanged.next(this.participants);
                    resolve(this.participants);
                }, reject);
        }
        );

    }



}