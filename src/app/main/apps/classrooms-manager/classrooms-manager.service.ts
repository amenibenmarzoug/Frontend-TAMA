import { Institution } from './../../pages/authentication/common-authentication/Institution';
import { MyClasses } from 'app/main/apps/classrooms/classrooms.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Program } from '../academy/program.model';
import { ProgramInst } from '../academy/programInst.model';
const USER_KEY = 'auth-user';

@Injectable()
export class ClassroomsManagerService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onInstitutionChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    classes: MyClasses[];
    selectedContactsList: object[] = [];
    user: any;
    selectedContacts: string[] = [];
    institution: any;
    groupeId: number;
    institutions: MyClasses[];
    programs: Program[];
    contactSelected: MyClasses[];
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
        this.onInstitutionChanged = new BehaviorSubject([]);
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
                this.getClasses(),
                this.getInstitutions(),

            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getClasses();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getClasses();
                        console.log(this.getClasses());
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
    getClasses(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/classroom')
                .subscribe((response: any) => {

                    this.classes = response;

                   
                    // if (this.filterBy === 'pilier1') {
                    //     this.classes = this.classes.filter(_contact => {
                    //         if (_contact.institution) { return true; }
                    //         return false;

                    //     });
                    // }

                   

                    if (this.searchText && this.searchText !== '') {
                        this.classes = FuseUtils.filterArrayByString(this.classes, this.searchText);
                    }

                    this.classes = this.classes.map(contact => {
                        return new MyClasses(contact);
                    });

                    this.onContactsChanged.next(this.classes);
                    resolve(this.classes);
                }, reject);
        }
        );
    }





    getInstitutions(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/institutions')
                .subscribe((response: any) => {
                  
                    this.onInstitutionChanged.next(response);
                    this.institutions = response;
                    resolve(response);
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
            this.classes.map(contact => {

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
    addClasse(classe, institution): Promise<any> {
        return new Promise((resolve, reject) => {
            classe.institution = institution;
            this._httpClient.post('http://localhost:8080/api/classroomInstitution', classe)

                .subscribe(response => {
                    this.getClasses();
                    resolve(response);
                });
        });
    }
    
    updateClasse(contact): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8080/api/classroomInstitution/' + this.id, contact)
                .subscribe(response => {
                    this.getClasses();
                    resolve(response);
                });
        });
    }
    /** */
    updateClasse1(contact, institution): Promise<any> {
        return new Promise((resolve, reject) => {
            contact.institution = institution;

            this._httpClient.put('http://localhost:8080/api/classroomInstitution', contact)
                .subscribe(response => {
                    this.getClasses();

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


        return new Promise((resolve, reject) => {
            const contactIndex = this.classes.indexOf(id);
            this.classes.splice(contactIndex, 1);
            this.onContactsChanged.next(this.classes);
            this._httpClient.delete(`http://localhost:8080/api/classroom/${id}`)
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
            let contact = this.classes.find(_contact => {
                return _contact.id === Number(contactId);

            });
            this.deleteContact(Number(contactId));
            const contactIndex = this.classes.indexOf(contact);
            this.classes.splice(contactIndex, 1);

        }
        this.onContactsChanged.next(this.classes);
        this.deselectContacts();
    }

}