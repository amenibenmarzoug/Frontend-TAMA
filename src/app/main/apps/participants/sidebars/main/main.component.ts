import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ParticipantsService } from 'app/main/apps/participants/participants.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  user: any;
  filterBy: string;
    classes:any;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ParticipantsService} _participantService
   */
  constructor(
      private _participantService: ParticipantsService
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
      this.filterBy = this._participantService.filterBy || 'all';

      this._participantService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });

          this._participantService.onClassesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(classes => {
              this.classes = classes;
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
      this._participantService.onFilterChanged.next(this.filterBy);
  }

  chooseStatus(filter): void{
      this.filterBy=filter;
      this._participantService.getParticipantsByStatus(filter)
  }

  chooseByClass(classe): void{
    this._participantService.onFilterByClasseChanged.next(classe) ;
    this._participantService.getParticipantsByClass(classe.id);
}

  chooseUnregistered(filter): void{
    this.filterBy=filter;
    this._participantService.getParticipantsWithoutRegistration();
}

resetFilters():void{
    this.filterBy='all';
    console.log("FILTER");
    console.log(this.filterBy);
    this._participantService.filterBy='all';
    this._participantService.onClassesChanged.next(null);
    this._participantService.onFilterByClasseChanged.next(null) ; 
    this.classes=[];
    this._participantService.getClasses();
    this._participantService.getContacts();

    this.ngOnInit();
    console.log(this.filterBy)



}

}
