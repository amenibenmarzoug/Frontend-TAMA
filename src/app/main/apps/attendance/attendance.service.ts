
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
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    

    contacts: MyParticipant[];
    selectedContacts: Number[] = [];

    contact: MyParticipant;


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

    attendances: Attendance[];
    //attendance : any ; 
    selectedAttendances: Number[] = [];

    attendance : Attendance ; 
    session : Session ;
    class : any ; 
    searchText: string;
    filterBy: any;
    id: number;



    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(

        private _httpClient: HttpClient,

    ) {

        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();

        //----attendance---
        this.onAttendancesChanged= new BehaviorSubject([]);
        this.onSessionsChanged=new  BehaviorSubject([]);
        this.onClassChanged= new  BehaviorSubject([]);
        this.onParticipantsChanged= new  BehaviorSubject([]);


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
                this.getUserData(),
                this.getContacts()

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
     * Get my Sessions 
     *
     * @returns {Promise<any>}
     */
     //this function will return the sessions of the concerned trainer in a specific date chosen in the filter
     getMySessions(): Promise<any> {
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        //console.log(this.user.id) ; console.log(this.contact.validated) ;
        //const params = new HttpParams().set('id', this.user.id);
        //console.log(params);
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.backend_url+ 'api/session/trainerId/', this.user.id)
                .subscribe((response: any) => {
                    console.log(response);
                    this.sessions = [];
                    
                    //filterBy would be the date selected by the trainer
                    console.log("THIS FILTEREDBY");
                    console.log(this.filterBy);
                    if (this.filterBy != null) {
                        this.sessions = response;
                        this.sessions = this.sessions.filter(_session => {
                            if (_session.sessionBeginDate.getDate() == this.filterBy.getDate()) {

                                return true;
                            }
                            return false;
                        });
                    }
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
                this._httpClient.get(environment.backend_url+ '/session/getClass/'+this.session.id)
                    .subscribe((response: any) => {
                        this.class = response;
                        this.onClassChanged.next(this.class);
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
            this._httpClient.get(environment.backend_url+ 'participants/classId/'+this.class.id)
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

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'attendance/session/'+ this.session.id)
                .subscribe((response: any) => {

                    console.log(response);
                    this.attendances = response;
                    this.onAttendancesChanged.next(this.attendances);
                    resolve(this.attendances);
                  
                }, reject);
        }
        );
    }


    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */

    getContacts(): Promise<any> {
    this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        //console.log(this.user.id) ; console.log(this.contact.validated) ;

        const params = new HttpParams().set('id', this.user.id);
        console.log(params);
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.backend_url+ 'api/participants/entreprise', { params: params })
                // this._httpClient.get(environment.backend_url+ 'api/participants')
                .subscribe((response: any) => {

                    this.contacts = response;
                    // console.log(response) ; 

                    if (this.filterBy === 'pilier1') {
                        this.contacts = this.contacts.filter(_contact => {
                            if (_contact.entreprise) { return true; }
                            return false;
                            // this._httpClient.get(environment.backend_url+ 'api/participants/pilier1')                                   

                        });
                    }

                    if (this.filterBy === 'pilier2') {
                        this.contacts = this.contacts.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (!_contact.entreprise) { return true; }
                            return false;
                        });
                    }
                    if (this.filterBy === 'abandon') {
                        this.contacts = this.contacts.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (_contact.abandon) { return true; }
                            return false;
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                    }

                    this.contacts = this.contacts.map(contact => {
                        return new MyParticipant(contact);
                    });

                    this.onContactsChanged.next(this.contacts);
                    resolve(this.contacts);
                }, reject);
        }

        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */

    getUserData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(environment.backend_url+ 'api/participants')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }

        );
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */

    toggleSelectedContact(id): void
    {
        // First, check if we already have that contact as selected...
        if ( this.selectedContacts.length > 0 )
        {
            const index = this.selectedContacts.indexOf(id);

            if ( index !== -1 )
            {

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

    toggleSelectAll(): void
    {
        if ( this.selectedContacts.length > 0 )
        {
            this.deselectContacts();
        }
        else
        {

            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */

    selectContacts(filterParameter?, filterValue?): void
    {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {

            this.selectedContacts = [];
            this.contacts.map(contact => {
                this.selectedContacts.push(contact.id);
                //console.log(this.selectedContacts)

            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);

    }

    /**
     * Update contact
     *
     * @param contact
     * 
     * @returns {Promise<any>}
     */

    updateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.password = contact.phoneNumber;
            let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
            const params = new HttpParams().set('id', id);
            console.log(contact);
            this._httpClient.post(environment.backend_url+ 'api/signupParticipantEntre', contact, { params: params })
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /** */
    updateContact1(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            //console.log (contact) ;
            this._httpClient.put(environment.backend_url+ 'api/updatePartEntr', contact)

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

    updateUserData(userData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})

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

    deselectContacts(): void
    {

        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);

    }

    /**
     * Delete contact
     *
     *@param id
     */

    deleteContact(id):Promise<any>
    {   //console.log(id)  ;
        
     
       return new Promise((resolve, reject) => {
        const contactIndex = this.contacts.indexOf(id);
        this.contacts.splice(contactIndex, 0);
            this.onContactsChanged.next(this.contacts);
        this._httpClient.delete(AUTH_API + `participants/${id}`)
            .subscribe(response => {
               // this.getContacts();
              
                resolve(response);
            });
    }); 

    }

    /**
     * Delete selected contacts
     */

    deleteSelectedContacts(): void
    {
        for ( const contactId of this.selectedContacts )
        {
            const contact = this.contacts.find(_contact => {
                return _contact.id === contactId;
                 
            });
            this.deleteContact(contactId) ;
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
           

        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

}
