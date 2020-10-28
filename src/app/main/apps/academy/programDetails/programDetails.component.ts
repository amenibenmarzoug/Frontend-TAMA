import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProgramDetailsService } from './programDetails.service';


@Component({
    selector     : 'programDetails',
    templateUrl  : './programDetails.component.html',
    styleUrls    : ['./programDetails.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProgramDetailsComponent implements OnInit, OnDestroy {
    
    trainer: any;
    participant: any;
    institution: any;
    entreprise: any;
    name:string;

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
       // this._profileService.data=null;
    }
}
