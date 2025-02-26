import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Participant } from './participant.model';
import { Program } from '../academy/program.model';
import { ProgramInst } from '../academy/programInst.model';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';
const USER_KEY = 'auth-user';

@Injectable()
export class ParticipantsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onEntrpriseChanged: BehaviorSubject<any>;
    onClassesChanged: BehaviorSubject<any>;
    // onCursusChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    participantType: string;
    participants: Participant[];
    selectedContactsList: object[] = [];;
    user: any;
    selectedContacts: string[] = [];
    entreprise: any;
    classe: any;
    // cursus: any;
    groupeId: number;
    entreprises: Participant[];
    classes: Participant[];
    programs: Program[];
    contactSelected: Participant[];
    searchText: string;
    filterBy: string;
    id: number;
    ages: any;
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
        this.onEntrpriseChanged = new BehaviorSubject([]);
        // this.onCursusChanged = new BehaviorSubject([]);
        this.onClassesChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
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
                this.getContacts(),
                this.getUserData(),
                this.getEntreprises(),
                this.getClasses(),
                //  this.getGroups(),
                // this.getCursus(),
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
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/participants')
                .subscribe((response: any) => {

                    this.participants = response;

                    if (this.filterBy === 'with') {
                        this.participants = this.participants.filter(_contact => {
                            if (_contact.validated) { return true; }
                            return false;


                        });
                    }

                    if (this.filterBy === 'without') {
                        this.participants = this.participants.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (!_contact.validated) { return true; }
                            return false;
                        });
                    }

                    if (this.filterBy === 'pilier1') {
                        this.participants = this.participants.filter(_contact => {
                            if (_contact.entreprise) { return true; }
                            return false;

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
                            if (_contact.abandon) { return true; }
                            return false;
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.participants = FuseUtils.filterArrayByString(this.participants, this.searchText);
                    }

                    this.participants = this.participants.map(contact => {
                        return new Participant(contact);
                    });

                    this.onContactsChanged.next(this.participants);
                    resolve(this.participants);
                }, reject);
        }
        );
    }





    getEntreprises(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/entreprises')
                .subscribe((response: any) => {
                    //  console.log("response");
                    // console.log(response);
                    this.onEntrpriseChanged.next(response);
                    this.entreprises = response;
                    resolve(response);
                }, reject);
        }
        );
    }

    getClasses(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/programsInst')
                .subscribe((response: any) => {
                    this.onClassesChanged.next(response);
                    this.classes = response;
                    // console.log(response);
                    resolve(response);
                }, reject);
        }
        );
    }


    getUserData(): Promise<any> {
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
    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);

            if (index !== -1) {
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
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        }
        else {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.selectedContactsList = [];
            this.participants.map(contact => {

                this.selectedContacts.push(contact.id.toString());


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
    addParticipant(contact, entreprise, classe): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.password = contact.phoneNumber;
            console.log(" PARTICIPANT",contact );
            console.log(" PARTICIPANT ENTREPISE");
            console.log(contact.experience);
            if (entreprise == null) {
                contact.programInstance = classe;
            }
            else {
                contact.entreprise = entreprise;
                contact.programInstance = entreprise.programInstance;
            }
            //contact.entreprise = entreprise;
            // contact.programInstance = classe;
            this._httpClient.post(environment.backend_url+ 'api/signupParticipantManag', contact)

                .subscribe(response => {
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
    updateClasse(contact): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.backend_url+ 'api/classeParticipant/' + this.id, contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }
    /** */
    updateContact1(contact, entreprise, programInstance): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.entreprise = entreprise;
            contact.programInstance = programInstance;

            this._httpClient.put(environment.backend_url+ 'api/participants', contact)
                .subscribe(response => {
                    this.getContacts();

                    resolve(response);


                });

        });
    }
    ValidateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.validated = true;
            console.log(contact)
            this._httpClient.put(environment.backend_url+ 'api/participants/validate', contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }




    // /**
    //  * Update user data
    //  *
    //  * @param userData
    //  * @returns {Promise<any>}
    //  */
    // updateUserData(userData): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.post('api/contacts-user/' + this.user.id, { ...userData })
    //             .subscribe(response => {
    //                 this.getUserData();
    //                 this.getContacts();
    //                 resolve(response);
    //             });
    //     });
    // }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);

    }

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

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void {
        for (const contactId of this.selectedContacts) {
            let contact = this.participants.find(_contact => {
                console.log("write true or false" + _contact.id.toString() === contactId);
                return _contact.id === Number(contactId);

            });
            this.deleteContact(Number(contactId));
            const contactIndex = this.participants.indexOf(contact);
            this.participants.splice(contactIndex, 1);

        }
        this.onContactsChanged.next(this.participants);
        this.deselectContacts();
    }


    getAges(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/participants/ages')
                .subscribe((response: any) => {
                    //console.log("hhhhhhhhhhhh");
                    console.log(response);
                    this.ages = response;
                    console.log(this.ages);
                    /*  this.participants = this.participants.map(contact => {
                          return new Participant(contact);
                      });*/

                    //  this.onContactsChanged.next(this.participants);


                    console.log("INSTITUTIONS");
                    /* this.ages = response.filter(age => {
                         
                         if (age.id== contact) {
                             //console.log("");
                             return true;
                         }
                         return false;
                     });*/
                    console.log(this.ages);

                    resolve(this.ages);
                }, reject);
        }
        );

    }


}