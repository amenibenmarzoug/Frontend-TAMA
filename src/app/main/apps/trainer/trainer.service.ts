import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Trainer } from 'app/shared/models/trainer.model';
import { environment } from 'environments/environment';

const AUTH_API = environment.backend_url + 'api/';




@Injectable({
    providedIn: 'root'
})

export class TrainerService implements Resolve<any>
{

    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    disponibilities: any[];
    specifications: String[];
    contacts: Trainer[];
    user: any;
    selectedContacts: string[] = [];
    onModulesChanged: BehaviorSubject<any>;
    modules: any[];
    searchText: string;
    filterBy: string;
    id: number;
    onThemesChanged: BehaviorSubject<any>;
    themes: any[];
    onProgramsChanged: BehaviorSubject<any>;
    programs: any[]=[];
    themeId: number;

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
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onModulesChanged = new BehaviorSubject([]);
        this.onProgramsChanged = new BehaviorSubject([]);
        this.onThemesChanged = new BehaviorSubject([]);
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
                this.getModules(),
                this.getThemes(),
                this.getPrograms()
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
            this._httpClient.get(AUTH_API + 'trainers')
                .subscribe((response: any) => {
                   
                    for (const trainer of response) {
                        const trainerFees = JSON.parse(trainer.fees)
                        trainer.fees = trainerFees ; 
                    }

                    this.contacts = response;
                    console.log(this.contacts);
                    if (this.filterBy === 'with') {
                        this.contacts = this.contacts.filter(_contact => {
                            if (_contact.validated) { return true; }
                            return false;


                        });
                    }

                    if (this.filterBy === 'all') {
                        this.contacts = response;
                    }

                    if (this.filterBy === 'without') {
                        this.contacts = this.contacts.filter(_contact => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (!_contact.validated) { return true; }
                            return false;
                        });
                    }


                    if (this.searchText && this.searchText !== '') {
                        this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                    }

                    this.contacts = this.contacts.map(contact => {
                        return new Trainer(contact);
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
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'trainers')
                .subscribe((response: any) => {
                    this.user = response;
                    this.onUserDataChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        }
        );
    }

    /* getModules(): Promise<any> {
 
 
         return new Promise((resolve, reject) => {
             this._httpClient.get(AUTH_API + 'modulesNames')
                 .subscribe((response: any) => {
                     console.log("MODULES");
                     console.log(response);
                     this.onModulesChanged.next(response);
                     this.modules = response;
                     resolve(response);
                 }, reject);
         }
         );
     }*/

    getModules(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'module')
                .subscribe((response: any) => {

                    this.onModulesChanged.next(this.modules);
                    if (this.themeId != null) {
                        this.modules = response;
                        this.modules = this.modules.filter(module => {
                            if (module.theme.id == this.themeId) {
                                return true;
                            }
                            return false;
                        })
                    }
                    else {
                        this.modules = [];
                    }
                    console.log("MODULES");
                    console.log(this.modules);
                    this.onModulesChanged.next(this.modules);
                    resolve(this.modules);
                }, reject);
        }
        );
    }

    getTrainerBySpecializations(specialization): Promise<any> {
        const params = new HttpParams().set('specialization', specialization);
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'specialization/trainers/', { params: params })
                .subscribe((response: any) => {
                    this.contacts = response;
                    this.onContactsChanged.next(this.contacts);
                    resolve(this.contacts);
                }, reject);
        }
        );
    }

    getModulesNames(themes): Promise<any> {

        //let themesList=[]
        //themesList.push(themes);
        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'modulesNamesPerThemes', themes)
                .subscribe((response: any) => {

                    this.modules = response;
                    /*if(this.themeId!=null){
                        this.modules = response;
                        this.modules=this.modules.filter(module =>{
                            if(module.theme.id==this.themeId){
                                return true;
                            }
                            return false;
                        })
                    }
                    else{
                        this.modules=[];
                    }*/
                    console.log("MODULES");
                    console.log(this.modules);
                    this.onModulesChanged.next(this.modules);
                    resolve(this.modules);
                }, reject);
        }
        );
    }

    getThemes(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'themesNames')
                .subscribe((response: any) => {
                    console.log("Themes");
                    console.log(response);

                    this.onThemesChanged.next(response);
                    this.themes = response;
                    resolve(response);
                }, reject);
        }
        );
    }

    getPrograms(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programs')
                .subscribe((response: any) => {
                    this.programs = response;
                   
  
                    this.onProgramsChanged.next(this.programs);
                    resolve(this.programs);
                }, reject);
        });
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
    updateContact(contact): Promise<any> {
        /*if (this.disponibilities != null) {
            contact.disponibilityDays = this.disponibilities;

        }
        if (this.specifications != null) {
            contact.specifications = this.specifications;
        }

        this.disponibilities = null;
        this.specifications = null;*/
        console.log("creating trainer" );
        console.log(contact);
        let fees = JSON.stringify(contact.fees);
        contact.fees=fees ; 
        return new Promise((resolve, reject) => {
            /* if (this.disponibilities != null) {
                 contact.disponibilityDays = this.disponibilities;
 
             }
             if (this.specifications != null) {
                 contact.specifications = this.specifications;
             }
 
             this.disponibilities = null;
             this.specifications = null;*/
            this._httpClient.post(AUTH_API + 'auth/signup', contact)
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }
    updateContact1(contact): Promise<any> {
        
        /* if (this.disponibilities != null) {
             contact.disponibilityDays = this.disponibilities;
 
         }
         if (this.specifications != null) {
             contact.specifications = this.specifications;
         }
 
         this.disponibilities = null;
         this.specifications = null;*/
         
        let fees = JSON.stringify(contact.fees);
        contact.fees=fees ;
        console.log("updating trainer" );
        console.log(contact);
        return new Promise((resolve, reject) => {
            console.log(contact);
            this._httpClient.put(AUTH_API + 'trainers', contact)
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
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    ValidateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.validated=true ;
            console.log("trainer à valider :")
            console.log(contact)
            const params = new HttpParams().set('id', contact.id);

            console.log(params);
            this._httpClient.get(AUTH_API + 'sendMailToTrainer', { params: params })
                .subscribe(response => {

                    this.getContacts();
                    resolve(response);
                });
        });
    }

    refuseTrainer(trainer): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'trainer/refuse', trainer)
                .subscribe(response => {
                    this.getContacts();
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
     * @param id
     */
    deleteContact(id): Promise<any> {
        console.log(id);


        return new Promise((resolve, reject) => {
            const contactIndex = this.contacts.indexOf(id);
            this.contacts.splice(contactIndex, 1);
            this.onContactsChanged.next(this.contacts);
            this._httpClient.delete(AUTH_API + `trainers/${id}`)
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
            const contact = this.contacts.find(_contact => {
                return _contact.id === Number(contactId);

            });
            this.deleteContact(Number(contactId));
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);

        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }

}
