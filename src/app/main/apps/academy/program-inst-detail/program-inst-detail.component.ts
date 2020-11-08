import { Component, OnDestroy,OnInit,ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProgramDetailsService } from '../programDetails/programDetails.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-program-inst-detail',
  templateUrl: './program-inst-detail.component.html',
  styleUrls: ['./program-inst-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProgramInstDetailComponent implements OnInit,OnDestroy {

  trainer: any;
  participant: any;
  institution: any;
  entreprise: any;
  name:string;
  programId: any;
  private sub:any;
  selectedTab = 0;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _programDetailsService
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
