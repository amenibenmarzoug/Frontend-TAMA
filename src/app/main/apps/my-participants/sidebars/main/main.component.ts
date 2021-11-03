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

      selectedClass: any;
        classes: any;
  
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

              this._MyParticipantsService.onClassesChanged
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe(classes => {
                  this.classes = classes;
                  console.log("this classes")
                  console.log(this.classes)
    
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

       selectClass(group): void {
        
        if (group == "all")
        {
            console.log("tous selected")
            this._MyParticipantsService.getParticipants() ; 
        }
        else {
        this.selectedClass = group
        
        console.log(this.selectedClass)
        this._MyParticipantsService.onFilterByClassChanged.next(group);
        }
    
    }
      changeFilter(filter): void
      {
          this.filterBy = filter;
          this._MyParticipantsService.onFilterChanged.next(this.filterBy);
      }
  
  }
  
