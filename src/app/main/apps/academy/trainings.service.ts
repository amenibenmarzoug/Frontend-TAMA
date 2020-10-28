import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

//import { Contact } from 'app/main/apps/contacts/contact.model';
import { Training } from 'app/main/apps/academy/trainings/training.model';

import { Program } from 'app/main/apps/academy/program.model';
const AUTH_API = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
  })
export class TrainingsService implements Resolve<any> {
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    cursusId: any;
    contacts: Training[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;
    id: number;


    
    program: Program ; 
    training : Training ;
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    onCursusChanged:BehaviorSubject<any>;

    


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
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();


        this.onSearchTextChanged = new Subject();
        this.onCoursesChanged= new BehaviorSubject([]);
        this.onCursusChanged= new BehaviorSubject([]);
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContacts(),
               // this.getUserData()
               this.getCourses(),
                this.getCursus(),
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
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'course')
                    .subscribe((response: any) => {

                        this.contacts = response;
                        this.cursusId = this.filterBy;
                     
                        if (this.cursusId != null) {
                            if (this.filterBy === 'Formations') {
                                    console.log("if formations");
                            }
                            else {
                                console.log("else filter");
                                console.log(this.cursusId)
                              /*  this.contacts.forEach(contact => {
                                    if (contact.course.id == this.courseId) {
                                        if (!this.courseSessions.includes(contact))
                                            this.courseSessions.push(contact);
                                    }
    
                                });*/
    
    
                                this.contacts = this.contacts.filter(_course => {
                                    // return this.user.frequentContacts.includes(_contact.id);
                                    if (_course.cursus.id == this.cursusId) {
                                        console.log(_course);
                                        return true; }
                                    return false;
                                });
                            }
                        }
                        else {
                            this.contacts = response;
                        }
                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                        }

                        this.contacts = this.contacts.map(contact => {
                            return new Training(contact);
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
                this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
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
        

        console.log(this.selectedContacts.length);


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
                this.selectedContacts.push((contact.id).toString());
                
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
    updateContact(contact,cursus): Promise<any>
    {
        return new Promise((resolve, reject) => {
            console.log("update post")

            contact.cursus=cursus;
            this._httpClient.post(AUTH_API +'course', contact)
                .subscribe(response => {
                    console.log("update post")
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateUserData(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'course', contact)
                .subscribe(response => {
                   // this.getUserData();
                   
                    this.getContacts();
                    resolve(response);
                });
        });
    }
    updateContact1(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
    console.log (contact) ;
            this._httpClient.put(AUTH_API + 'course'  , contact )
                .subscribe(response => {
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

    // /**
    //  * Delete contact
    //  *
    //  * @param contact
    //  */
    // deleteContact(contact): void
    // {
    //     const contactIndex = this.contacts.indexOf(contact);
    //     this.contacts.splice(contactIndex, 1);
    //     this.onContactsChanged.next(this.contacts);
    // }
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
        this._httpClient.delete(`http://localhost:8080/api/course/${id}`)
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
                return (_contact.id).toString() === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }




    getCourses(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'course')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.onCoursesChanged.next(response);
                    this.contacts = response;
                    if ( this.filterBy === 'starred' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.starred.includes(_contact.id);
                            });
                        }


                    resolve(response);
                }, reject);
        }
        );
    }


    getCursus(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'cursus')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.onCursusChanged.next(response);
                    this.contacts = response;
                    resolve(response);
                }, reject);
        }
        );
    }
}
