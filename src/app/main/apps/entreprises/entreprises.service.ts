import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import {Enterprise} from 'app/shared/models/enterprise.model'
import {environment} from 'environments/environment';

const USER_KEY = 'auth-user';
const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class EntreprisesService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onEntrpriseChanged: BehaviorSubject<any>;
    onRegistrationChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onClassesChanged: BehaviorSubject<any>;
    classes: any[];
    registrations: any[];
    classe: any;
    enterprises: Enterprise[];
    enterprise: Enterprise;
    user: any;
    selectedContacts: Number[] = [];
    closeForm = false;
    searchText: string;
    filterBy: string;
    id: number;
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
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onRegistrationChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onClassesChanged = new BehaviorSubject([]);
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
                this.getEnterprises(),
                this.getClasses(),
                // console.log(JSON.parse(window.sessionStorage.getItem(USER_KEY))),
                this.getEnterpriseData(),
                //  this.getEntreprises()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getEnterprises();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getEnterprises();
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
    getEnterprises(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'entreprises')
                .subscribe((response: any) => {
                    
                   
                    this.enterprises = response;
                    console.log('entreprises :');
                    console.log(this.enterprises);

                    if (this.filterBy === 'with') {
                        this.enterprises = this.enterprises.filter(_contact => {
                            if (_contact.validated) { return true; }
                            return false;
                            // this._httpClient.get(environment.backend_url+ 'api/participants/pilier1')                                   

                        });
                    }

                    if (this.filterBy === 'without') {
                        this.enterprises = this.enterprises.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (!_contact.validated) { return true; }
                            return false;
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.enterprises = FuseUtils.filterArrayByString(this.enterprises, this.searchText);
                    }

     /* this.enterprises = this.enterprises.map(contact => {
                        return new Enterprise(contact);
                    }); */


                    this.onContactsChanged.next(this.enterprises);
                    resolve(this.enterprises);
                }, reject);
        }
        );
    }





    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getEnterpriseData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'entreprises')
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
            this.enterprises.map(contact => {
                this.selectedContacts.push(contact.id);
                //console.log(this.selectedContacts)
                console.log(this.selectedContacts.length)
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
        // console.log(this.selectedContacts.length)
    }



    addEntreprise(entreprise): Promise<any> {
        return new Promise((resolve, reject) => {
            //entreprise.password = entreprise.phoneNumber;
            /*if (this.classe != null) {
                entreprise.programInstance = classe;
            }
            this.classe = null;*/
            console.log("ENTREPRISE SERVICE")
            console.log(entreprise);
            this._httpClient.post(AUTH_API + 'auth/manager/company', entreprise)
                .subscribe(response => {
                    this.getEnterprises();
                    resolve(response);
                });
        });
    }

    /** */
    /* updateContact1(contact,classe): Promise<any> {
        if(this.classe!=null){
            contact.programInstance=classe;
        }
        this.classe=null;
        console.log(contact);
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'entreprises', contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });

    } */

    updateEnterprise1(contact): Observable<any> {
        //console.log(this.classe.location);
        //if (this.classe != null) {
        //    contact.programInstance = classe;
       // }
        //this.classe = null;
        console.log(contact);

        this.getEnterprises();
        return this._httpClient.put(AUTH_API + 'update/entreprise', contact);




    }
    ValidateContact(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
        contact.validated=true ;
        console.log("entreprise à valider :") 
         console.log(contact)
         const params = new HttpParams().set('id',contact.id);
    
         console.log(params);
            this._httpClient.get(AUTH_API+'sendMailToEntrep' ,{ params: params } )
                .subscribe(response => {
                   
                    this.getEnterprises();
                    resolve(response);
                });
        });
    }

    refuseCompany(company): Promise<any>{
    return new Promise((resolve, reject) => {
           
        this._httpClient.put(AUTH_API+ 'entreprises/refuse', company)
            .subscribe(response => {
                this.getEnterprises();
                resolve(response);
            });
    });}

    getClasses(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programsInst')
                .subscribe((response: any) => {
                    this.onClassesChanged.next(response);
                    this.classes = response;
                    console.log("CLASSES");
                    console.log(response);
                    resolve(response);
                }, reject);
        }
        );
    }

    getRegistrationsByCompanyId(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'companyRegistrations/enterprise/' + id)
                .subscribe((response: any) => {


                    this.registrations = response;
                    this.onRegistrationChanged.next(this.registrations);
                    console.log("REGISTRATIONS");
                    console.log(this.registrations);
                    resolve(this.registrations);
                }, reject);
        }
        );
    }
    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getEnterpriseData();
                    this.getEnterprises();
                    resolve(response);
                });
        });
    }

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
     *@param id
     */
    deleteContact(id): Promise<any> {   //console.log(id)  ;


        return new Promise((resolve, reject) => {
            const contactIndex = this.enterprises.indexOf(id);
            this.enterprises.splice(contactIndex, 1);
            this.onContactsChanged.next(this.enterprises);
            this._httpClient.delete(AUTH_API + `entreprises/${id}`)
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
            const contact = this.enterprises.find(_contact => {
                return _contact.id === contactId;

            });
            this.deleteContact(contactId);
            const contactIndex = this.enterprises.indexOf(contact);
            this.enterprises.splice(contactIndex, 1);

        }
        this.onContactsChanged.next(this.enterprises);
        this.deselectContacts();
    }

}