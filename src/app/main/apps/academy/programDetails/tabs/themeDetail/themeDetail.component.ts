import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProgramDetailsService } from '../../programDetails.service';

@Component({
    selector     : 'themeDetail',
    templateUrl  : './themeDetail.component.html',
    styleUrls    : ['./themeDetail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ThemeDetailComponent implements OnInit, OnDestroy
{
    photosVideos: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _profileService
     */
    constructor(
        private _programDetailsService: ProgramDetailsService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._programDetailsService.photosVideosOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(photosVideos => {
                this.photosVideos = photosVideos;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
