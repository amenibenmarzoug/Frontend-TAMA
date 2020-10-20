import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MyParticipantsService } from 'app/main/apps/my-participants/my-participants.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

  export class MainComponent implements OnInit, OnDestroy
  {
      user: any;
      filterBy: string;
  
      // Private
      private _unsubscribeAll: Subject<any>;
  
      /**
       * Constructor
       *
       * @param {MyParticipantsService} _MyParticipantsService
       */
      constructor(
          private _MyParticipantsService: MyParticipantsService
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
          this.filterBy = this._MyParticipantsService.filterBy || 'all';
  
          this._MyParticipantsService.onUserDataChanged
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe(user => {
                  this.user = user;
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
  
      // -----------------------------------------------------------------------------------------------------
      // @ Public methods
      // -----------------------------------------------------------------------------------------------------
  
      /**
       * Change the filter
       *
       * @param filter
       */
      changeFilter(filter): void
      {
          this.filterBy = filter;
          this._MyParticipantsService.onFilterChanged.next(this.filterBy);
      }
  
  }
  
