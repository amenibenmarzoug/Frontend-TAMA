import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Group } from 'app/main/apps/groups/group.model';
import { Participant } from '../participants/participant.model';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class GroupsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onGroupSelected: BehaviorSubject<any>;
    onContactsChangedP: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChangeP: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onUserDataChangeP: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onSearchTextChangedP: Subject<any>;
    onFilterChanged: Subject<any>;
    onFilterChangedP: Subject<any>;
    participant: Participant[];
    contacts: Group[];
    user: any;
    selectedContacts: string[] = [];
     selectedContactsP: string[] = [];

    searchText: string;
    filterBy: string;
    id: number;
    groupId:any;
    groupIdd:any;
    plist = [];
    //participant:any;

  
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults

       this.onContactsChanged = new BehaviorSubject([]);
        this.onContactsChangedP = new BehaviorSubject([]);
        this.onGroupSelected = new BehaviorSubject([]);
        
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChangeP = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onUserDataChangeP = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onSearchTextChangedP = new Subject();
        this.onFilterChanged = new Subject();
        this.onFilterChangedP = new Subject();

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
                //this.getContacts(),
              
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
                    this.onSearchTextChangedP.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getGroupsParticipants();
                    });

                    this.onFilterChangedP.subscribe(filter => {
                        this.filterBy = filter;
                        this.getGroupsParticipants();
                    });
                    resolve();

                },
                reject
            );
        
        });
    
}

    getGroupsParticipants(): Promise<any>
    {

        const id = new HttpParams().set('id', this.groupId);
        return new Promise((resolve, reject)=>{
            this._httpClient.get(AUTH_API + 'participants/group', {params:id})
            .subscribe((response:any)=>{
                this.participant = response;
                this.participant = this.participant.map(contact =>{
                    return new Participant(contact);
                });
               this.onContactsChangedP.next(this.participant);
                resolve(this.participant);
 
            },reject);
        });


    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'groups')
                    .subscribe((response: any) => {
                        this.contacts = response;
                        console.log(response);

                        if ( this.filterBy === 'starred' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.starred.includes(_contact.id);
                            });
                        }

                        if ( this.filterBy === 'frequent' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.frequentContacts.includes(_contact.id);
                            });
                        }

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                        }

                        this.contacts = this.contacts.map(contact => {
                            return new Group(contact);
                        });

                        this.onContactsChanged.next(this.contacts);
                        resolve(this.contacts);
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
        // this.groupId = id;
        // console.log("je suis la" + id);
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
                this.selectedContacts.push(contact.id.toString());
                console.log(contact.id)
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any>
    {
        contact.password = contact.phoneNumber;
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'groups' , contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }
    updateContact1(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
    console.log (contact) ;
            this._httpClient.put(AUTH_API + 'groups'  , contact )
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
            this._httpClient.post('api/groups-groups/' + this.user.id, {...userData})
                .subscribe(response => {
                    ///this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }
     /**
     * Delete contact
     *
     * @param id
     */
    deleteContact(id):Promise<any>
    {   console.log(id)  ;
        
     
       return new Promise((resolve, reject) => {
        const contactIndex = this.contacts.indexOf(id);
        this.contacts.splice(contactIndex, 1);
            this.onContactsChanged.next(this.contacts);
        this._httpClient.delete(AUTH_API + `groups/${id}`)
            .subscribe(response => {
               // this.getContacts();
              
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


    deleteSelectedContacts(): void
    {
        for ( const contactId of this.selectedContacts )
        {
            const contact = this.contacts.find(_contact => {
                return _contact.id === Number(contactId);
                 
            });
            this.deleteContact(Number(contactId)) ;
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
           
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedParticipant(id): void
    {
        // First, check if we already have that contact as selected...
        if ( this.selectedContactsP.length > 0 )
        {
            const index = this.selectedContactsP.indexOf(id);
            console.log("index de selected contact" + index);
            if ( index !== -1 )
            {
                this.selectedContactsP.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChangeP.next(this.selectedContactsP);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContactsP.push(id);
        console.log("selected contacts" + this.selectedContactsP)
        // Trigger the next event
        this.onSelectedContactsChangeP.next(this.selectedContactsP);
    }

    /**
     * Toggle select all
     */
    toggleSelectAllParticipants(): void
    {
        if ( this.selectedContactsP.length > 0 )
        {
           this.deselectParticipant();
        }
        else
        {
            this.selectParticipants();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectParticipants(filterParameter?, filterValue?): void
    {
        this.selectedContactsP = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedContactsP = [];
            this.participant.map(contact => {
                this.selectedContactsP.push(contact.id.toString());
                console.log("selected contact" + contact.id)
            });
        }
        // Trigger the next event
        this.onSelectedContactsChangeP.next(this.selectedContactsP);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateParticipant(contact): Promise<any>
    {
        contact.password = contact.phoneNumber;
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'signupParticipantManag' , contact)
                .subscribe(response => {
                    this.getGroupsParticipants();
                    resolve(response);
                });
        });
    }
    updateParticipant1(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
    console.log (contact) ;
            this._httpClient.put(AUTH_API + ''  , contact )
                .subscribe(response => {
                    this.getGroupsParticipants();
                    resolve(response);
                });
        });
    }
    

    /**
     * Deselect contacts
     */
   deselectParticipant(): void
    {
        this.selectedContactsP = [];

        // Trigger the next event
        this.onSelectedContactsChangeP.next(this.selectedContactsP);
    }

    /**
     * Delete contact
     *
     * @param id
     */
    deleteParticipant(id):Promise<any>
    {   
        console.log("id du participant à retirer" + id)  ;
        
     
       return new Promise((resolve, reject) => {
        const contactIndex = this.participant.indexOf(id);
        this.participant.splice(contactIndex, 1);
            this.onContactsChangedP.next(this.participant);
        this._httpClient.delete(AUTH_API + `group/participants/${id}`)
            .subscribe(response => {
               // this.getContacts();
              
                resolve(response);
            });
    }); 
    }


   /**
     * Delete selected contacts
     */
    deleteSelectedParticipants(): void
    {
        for ( const contactId of this.selectedContactsP )
        {
            const contact = this.participant.find(_contact => {
                return _contact.id === Number(contactId);
                 
            });
            this.deleteParticipant(Number(contactId)) ;
            const contactIndex = this.participant.indexOf(contact);
            this.participant.splice(contactIndex, 1);
           
        }
        this.onContactsChangedP.next(this.participant);
        this.deselectParticipant();
    }
  

}
