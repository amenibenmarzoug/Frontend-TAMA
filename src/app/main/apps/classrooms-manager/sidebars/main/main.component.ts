import { ClassroomsManagerService } from './../../classrooms-manager.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ParticipantsService } from 'app/main/apps/participants/participants.service';

@Component({
    selector: 'app-main-classe',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainClasseComponent implements OnInit, OnDestroy {

    user: any;
    filterBy: string;
    filtredClasses: any[] = [];
    classes: any[];
    institutions: any[];


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClassroomsManagerService} _classroomsManagerService
     */
    constructor(
        private _classroomsManagerService: ClassroomsManagerService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.filterBy = this._classroomsManagerService.filterBy || 'all';

        this._classroomsManagerService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });
        this._classroomsManagerService.onInstitutionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(institution => {
                this.institutions = institution;

            });
        this._classroomsManagerService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(classes => {
                this.classes = classes;

            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void {
        this.filterBy = filter;
        this._classroomsManagerService.onFilterChanged.next(this.filterBy);
    }

    selectInstitution(institution): void {
        this.filterBy = institution;
        this._classroomsManagerService.onFilterChanged.next(institution);
        // this.filtredClasses = [];
        // this.classes.forEach(classe => {
        //     if (classe.institution.id == institution.id) {
        //         if (!this.filtredClasses.includes(classe))
        //             this.filtredClasses.push(classe);

        //     }

        // });
        // this._classroomsManagerService.onFilterChanged.next(this.filtredClasses);
        // this._classroomsManagerService.classes = this.filtredClasses;

    }

    connect(): Observable<any[]> {
        return null;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }

}
