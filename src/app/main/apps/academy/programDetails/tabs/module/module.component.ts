import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProgramDetailsService } from '../../programDetails.service';

@Component({
    selector: 'module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ModuleComponent implements OnInit, OnDestroy {
    about: any;
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    isTrainer: boolean;
    isParticipant: boolean;
    isInstitution: boolean;
    isEntreprise: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _profileService
     */
    constructor(
        private _programDetailsService: ProgramDetailsService
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
        


        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
