import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Equipment } from 'app/shared/models/equipment.model';
import { environment } from 'environments/environment';

const AUTH_API = environment.backend_url + 'api/';

const USER_KEY = 'auth-user';



@Injectable({
    providedIn: 'root'
})

export class RessourcesService implements Resolve<any>
{

    onEquipmentsChanged: BehaviorSubject<any>;
    onSelectedEquipmentsChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    equipments: Equipment[];
    selectedEquipments: string[] = [];

    searchText: string;
    filterBy: string;
    id: number;
    equipmentId: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onEquipmentsChanged = new BehaviorSubject([]);
        this.onSelectedEquipmentsChanged = new BehaviorSubject([]);
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
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getEquipments();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getEquipments();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get Equipments
     *
     * @returns {Promise<any>}
     */
    getEquipments(): Promise<any> {
        let id = new HttpParams().set('id', this.equipmentId);
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'classroom/equipments', { params: id })
                .subscribe((response: any) => {

                    this.equipments = response;

                 

                    if (this.searchText && this.searchText !== '') {
                        this.equipments = FuseUtils.filterArrayByString(this.equipments, this.searchText);
                    }

                    this.equipments = this.equipments.map(equipment => {
                        return new Equipment(equipment);
                    });

                    this.onEquipmentsChanged.next(this.equipments);
                    resolve(this.equipments);
                }, reject);
        }
        );
    }


    /**
     * Toggle selected equipment by id
     *
     * @param id
     */
    toggleSelectedEquipment(id): void {
        // First, check if we already have that equipment as selected...
        if (this.selectedEquipments.length > 0) {
            const index = this.selectedEquipments.indexOf(id);

            if (index !== -1) {
                this.selectedEquipments.splice(index, 1);

                // Trigger the next event
                this.onSelectedEquipmentsChanged.next(this.selectedEquipments);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedEquipments.push(id);

        // Trigger the next event
        this.onSelectedEquipmentsChanged.next(this.selectedEquipments);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedEquipments.length > 0) {
            this.deselectEquipments();
        }
        else {
            this.selectEquipment();
        }
    }

    /**
     * Select equipment
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEquipment(filterParameter?, filterValue?): void {
        this.selectedEquipments = [];

        // If there is no filter, select all equipment
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedEquipments = [];
            this.equipments.map(equipment => {
                this.selectedEquipments.push(equipment.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedEquipmentsChanged.next(this.selectedEquipments);
    }

    /**
     * Update equipment
     *
     * @param equipment
     * @returns {Promise<any>}
     */
    addEquipment(equipment): Promise<any> {
        return new Promise((resolve, reject) => {
            let id = new HttpParams().set('id', this.equipmentId);
            this._httpClient.post(AUTH_API + 'equipmentsClassroom', equipment, { params: id })
                .subscribe(response => {
                    this.getEquipments();
                    resolve(response);
                });
        });
    }
    updateEquipment(equipment): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'equipmentClassroom', equipment)
                .subscribe(response => {
                    this.getEquipments();
                    resolve(response);
                });
        });
    }


    /**
     * Deselect equipment
     */
    deselectEquipments(): void {
        this.selectedEquipments = [];

        // Trigger the next event
        this.onSelectedEquipmentsChanged.next(this.selectedEquipments);
    }

    /**
     * Delete equipment
     *
     * @param id
     */
    deleteEquipment(id): Promise<any> {


        return new Promise((resolve, reject) => {
            const equipmentIndex = this.equipments.indexOf(id);
            this.equipments.splice(equipmentIndex, 1);
            this.onEquipmentsChanged.next(this.equipments);
            this._httpClient.delete(AUTH_API + `equipment/${id}`)
                .subscribe(response => {

                    resolve(response);
                });
        });
    }


    /**
      * Delete selected equipments
      */
    deleteSelectedEquipments(): void {
        for (const equipmentId of this.selectedEquipments) {
            const equipment = this.equipments.find(_equipment => {
                return _equipment.id === Number(equipmentId);

            });
            this.deleteEquipment(Number(equipmentId));
            const equipmentIndex = this.equipments.indexOf(equipment);
            this.equipments.splice(equipmentIndex, 1);

        }
        this.onEquipmentsChanged.next(this.equipments);
        this.deselectEquipments();
    }


}
