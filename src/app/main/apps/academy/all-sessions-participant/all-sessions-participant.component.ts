import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AllSessionsParticipantService } from './all-sessions-participant.service';

@Component({
  selector: 'app-all-sessions-participant',
  templateUrl: './all-sessions-participant.component.html',
  styleUrls: ['./all-sessions-participant.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AllSessionsParticipantComponent implements  OnInit, OnDestroy {

  dialogRef: any;
  searchInput: FormControl;
  
  test: boolean;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AllSessionsService} _allSessionsService
   */
  constructor(
      private _allSessionsService: AllSessionsParticipantService,
      private _fuseSidebarService: FuseSidebarService,
  ) {
      // Set the defaults
      this.searchInput = new FormControl('');

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
    

      this.searchInput.valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(300),
              distinctUntilChanged()
          )
          .subscribe(searchText => {
              this._allSessionsService.onSearchTextChanged.next(searchText);
          });
  }



  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Reset the search

      // Unsubscribe from all subscriptions
      this._allSessionsService.filterBy = null;
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }


  /**
   * Toggle the sidebar
   *
   * @param name
   */
   toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
}
}
