import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { ClassRoom } from 'app/shared/models/classroom.model';
import { environment } from 'environments/environment';

const AUTH_API = environment.backend_url + 'api/';

const USER_KEY = 'auth-user';



@Injectable({
    providedIn: 'root'
})

export class ClassroomsService implements Resolve<any>
{

    onClassroomsChanged: BehaviorSubject<any>;
    onSelectedClassroomsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    classrooms: ClassRoom[];
    user: any;
    selectedClassrooms: string[] = [];

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
        this.onClassroomsChanged = new BehaviorSubject([]);
        this.onSelectedClassroomsChanged = new BehaviorSubject([]);
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
                this.getClassrooms(),
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getClassrooms();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getClassrooms();
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
    getClassrooms(): Promise<any> {
        this.user = JSON.parse(sessionStorage.getItem(USER_KEY));
        const params = new HttpParams().set('id', this.user.id);
        console.log(this.user.id);
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'classroom/institution', { params: params })
                .subscribe((response: any) => {

                    this.classrooms = response;

                    if (this.searchText && this.searchText !== '') {
                        this.classrooms = FuseUtils.filterArrayByString(this.classrooms, this.searchText);
                    }

                    this.classrooms = this.classrooms.map(contact => {
                        return new ClassRoom(contact);
                    });

                    this.onClassroomsChanged.next(this.classrooms);
                    resolve(this.classrooms);
                }, reject);
        }
        );
    }


    /**
     * Toggle selected classroom by id
     *
     * @param id
     */
    toggleSelectedClassroom(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedClassrooms.length > 0) {
            const index = this.selectedClassrooms.indexOf(id);

            if (index !== -1) {
                this.selectedClassrooms.splice(index, 1);

                // Trigger the next event
                this.onSelectedClassroomsChanged.next(this.selectedClassrooms);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedClassrooms.push(id);

        // Trigger the next event
        this.onSelectedClassroomsChanged.next(this.selectedClassrooms);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedClassrooms.length > 0) {
            this.deselectClassrooms();
        }
        else {
            this.selectClassrooms();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectClassrooms(filterParameter?, filterValue?): void {
        this.selectedClassrooms = [];

        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedClassrooms = [];
            this.classrooms.map(classroom => {
                this.selectedClassrooms.push(classroom.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedClassroomsChanged.next(this.selectedClassrooms);
    }

    /**
     * Update classroom
     *
     * @param classroom
     * @returns {Promise<any>}
     */
    addClassroom(classroom): Promise<any> {
        return new Promise((resolve, reject) => {
            let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
            const params = new HttpParams().set('id', id);
            this._httpClient.post(AUTH_API + 'classroomInstitution', classroom, { params: params })
                .subscribe(response => {
                    this.getClassrooms();
                    resolve(response);
                });
        });
    }
    updateClassroom(classroom): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'classroomInstitution', classroom)
                .subscribe(response => {
                    this.getClassrooms();
                    resolve(response);
                });
        });
    }


    /**
     * Deselect contacts
     */
    deselectClassrooms(): void {
        this.selectedClassrooms = [];

        // Trigger the next event
        this.onSelectedClassroomsChanged.next(this.selectedClassrooms);
    }

    /**
     * Delete contact
     *
     * @param id
     */
    deleteClassroom(id): Promise<any> {
        console.log(id);


        return new Promise((resolve, reject) => {
            const classroomIndex = this.classrooms.indexOf(id);
            this.classrooms.splice(classroomIndex, 1);
            this.onClassroomsChanged.next(this.classrooms);
            this._httpClient.delete(AUTH_API + `classroom/${id}`)
                .subscribe(response => {

                    resolve(response);
                });
        });
    }

    omitClassroom(id): Promise<any> {
        console.log(id);


        return new Promise((resolve, reject) => {
            const classroomIndex = this.classrooms.indexOf(id);
            this.classrooms.splice(classroomIndex, 1);
            this.onClassroomsChanged.next(this.classrooms);
            this._httpClient.delete(AUTH_API + `classroom/omit/${id}`)
                .subscribe(response => {

                    resolve(response);
                });
        });
    }


    /**
      * Delete selected contacts
      */
    deleteSelectedClassrooms(): void {
        for (const classroomId of this.selectedClassrooms) {
            const classroom = this.classrooms.find(_classroom => {
                return _classroom.id === Number(classroomId);

            });
            //this.deleteClassroom(Number(classroomId));
            this.omitClassroom(Number(classroomId));
            const classroomIndex = this.classrooms.indexOf(classroom);
            this.classrooms.splice(classroomIndex, 1);

        }
        this.onClassroomsChanged.next(this.classrooms);
        this.deselectClassrooms();
    }


}
