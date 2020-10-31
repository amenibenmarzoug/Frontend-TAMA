import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProgramDetailsService } from './programDetails.service';
import { ActivatedRoute } from '@angular/router';


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
    programId: any;
    private sub:any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _profileService
     */
    constructor(
        private _programDetailsService: ProgramDetailsService,
        private route: ActivatedRoute

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
        this.sub = this.route.params.subscribe(params =>{
            this.programId = +params['id'];           
        });
        this._programDetailsService.programId = this.programId;
        this._programDetailsService.getThemesPerProgram();
       
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
