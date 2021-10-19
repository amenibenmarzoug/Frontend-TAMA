import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { environment } from 'environments/environment';
import { Participant } from 'app/main/apps/participants/participant.model';


const AUTH_API = environment.backend_url + 'api/';
const USER_KEY = 'auth-user';

@Injectable()
export class ClasseParticipantsService implements Resolve<any>
{
    onParticipantsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    participantType: string;
    participants: Participant[];

    user: any;
    classe: any;
    groupeId: number;
    searchText: string;
    id: number;
    classeId: number
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onParticipantsChanged = new BehaviorSubject([]);
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
                this.getParticipantsOfClass(),


            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getParticipantsOfClass();
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
    getParticipantsOfClass(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'participants/classId/' + this.classeId)
                .subscribe((response: any) => {

                    this.participants = response;

                    this.onParticipantsChanged.next(this.participants);
                    resolve(this.participants);
                }, reject);
        }
        );
    }
   


    /**
     * Delete contact
     *
     * @param id
     */
    deleteParticipant(id): Promise<any> {


        return new Promise((resolve, reject) => {
            const contactIndex = this.participants.indexOf(id);
            this.participants.splice(contactIndex, 1);
            this.onParticipantsChanged.next(this.participants);
            this._httpClient.delete(AUTH_API + `participants/${id}`)
                .subscribe(response => {
                    // this.getParticipantsOfClass();

                    resolve(response);
                });
        });
    }




}