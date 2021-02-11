import { Component, OnDestroy,OnInit,ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProgramDetailsService } from '../programDetails/programDetails.service';
import { ActivatedRoute } from '@angular/router';
import { ProgramInstDetailService } from './program-inst-detail.service';
@Component({
  selector: 'app-program-inst-detail',
  templateUrl: './program-inst-detail.component.html',
  styleUrls: ['./program-inst-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProgramInstDetailComponent implements OnInit,OnDestroy {

 
  programId: any;
  private sub:any;
  selectedTab = 0;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramInstDetailService} _programDetailsService
   */
  constructor(
      private _programDetailsService: ProgramInstDetailService,
      private route: ActivatedRoute

  ) {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  selectTab(event) {
      this.selectedTab = event;
  }
  /**
   * On init
   */
  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params =>{
          this.programId = +params['id'];           
      });
      this._programDetailsService.programInstId = this.programId;
      this._programDetailsService.getThemesInstPerProgram();
     
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
