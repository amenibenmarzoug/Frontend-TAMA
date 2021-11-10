import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import {environment} from 'environments/environment';
//import { Contact } from 'app/main/apps/participants/participant.model';
import { MyParticipant } from './my-participant.model';

const AUTH_API = environment.backend_url+ 'api/';
const USER_KEY = 'auth-user';
@Injectable()
export class MyParticipantsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onFilterByClassChanged:Subject<any>;

    filterByClasse: any;
    class : any ; 
    onClassesChanged : BehaviorSubject<any>;
    classes: any;

    participants: MyParticipant[]=[];
    user: any;
    selectedContacts: Number[] = [];

    contact: MyParticipant;
    searchText: string;
    filterBy: string;
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
        this.onClassesChanged = new  BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onFilterByClassChanged=new Subject();
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        //console.log(this.user.id) ; console.log(this.contact.validated) ;

        

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
                this.getClasses() , 
                this.getParticipants(),

            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getParticipants();
                    });

                    this.onFilterByClassChanged.subscribe(group => {
                        this.filterByClasse = group;
                        if (group ==null) {
                            this.getParticipants() ;  
                        }
                      
                        if (group != null) {
                        this.getParticipantsOfSelectedClass()
                        }
                        
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getParticipants();
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

    getParticipants(): Promise<any> {
    this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        //console.log(this.user.id) ; console.log(this.contact.validated) ;

        const params = new HttpParams().set('id', this.user.id);
        console.log(params);
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.backend_url+ 'api/participants/entreprise', { params: params })
                // this._httpClient.get(environment.backend_url+ 'api/participants')
                .subscribe((response: any) => {

                    this.participants = response;
                    // console.log(response) ; 

                    if (this.filterBy === 'pilier1') {
                        this.participants = this.participants.filter(_contact => {
                            if (_contact.entreprise) { return true; }
                            return false;
                            // this._httpClient.get(environment.backend_url+ 'api/participants/pilier1')                                   

                        });
                    }

                    if (this.filterBy === 'pilier2') {
                        this.participants = this.participants.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (!_contact.entreprise) { return true; }
                            return false;
                        });
                    }
                    if (this.filterBy === 'abandon') {
                        this.participants = this.participants.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (_contact.abandon) { return true; }
                            return false;
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.participants = FuseUtils.filterArrayByString(this.participants, this.searchText);
                    }

                    this.participants = this.participants.map(contact => {
                        return new MyParticipant(contact);
                    });

                    this.onContactsChanged.next(this.participants);
                    resolve(this.participants);
                }, reject);
        }

        );
    }

    getClasses(): Promise<any> {
     
        return new Promise((resolve, reject) => {
            
            this._httpClient.get(AUTH_API+ 'companyRegistrations/programInstance/enterprise/'+this.user.id)
            .subscribe((response: any) => {
                this.classes = response;
                console.log("this.classes hereee")
                console.log(this.classes)
                this.onClassesChanged.next(this.classes);
                resolve(this.classes);
            }, reject);
        } );
     }

    getParticipantsOfSelectedClass():Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+ 'participants/validated/classId/'+this.filterByClasse.id)
                .subscribe((response: any) => {
                    this.participants = response;
                    this.onContactsChanged.next(this.participants);
    
                    console.log("participants")
                    console.log(this.participants)
                    resolve(this.participants);
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
            this.participants.map(contact => {
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
            let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
            const params = new HttpParams().set('id', id);
            console.log(contact);
            this._httpClient.post(environment.backend_url+ 'api/signupParticipantEntre', contact, { params: params })
                .subscribe(response => {
                    this.getParticipants();
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
                    this.getParticipants();
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
                    this.getParticipants();
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
        const contactIndex = this.participants.indexOf(id);
        this.participants.splice(contactIndex, 0);
            this.onContactsChanged.next(this.participants);
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
            const contact = this.participants.find(_contact => {
                return _contact.id === contactId;
                 
            });
            this.deleteContact(contactId) ;
            const contactIndex = this.participants.indexOf(contact);
            this.participants.splice(contactIndex, 1);
           

        }
        this.onContactsChanged.next(this.participants);
        this.deselectContacts();
    }

}
