import { DataSource } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntreprisesService } from '../entreprises.service';

@Component({
  selector: 'app-company-registration-list',
  templateUrl: './company-registration-list.component.html',
  styleUrls: ['./company-registration-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompanyRegistrationListComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContent')
  //dialogContent: TemplateRef<any>;

  registrations: any;
  
  dataSource: FilesDataSource | null;
  // dataSource :any[] ;

  displayedColumns = ['classe','date'];

  checkboxes: {};
  dialogRef: any;
  registration: any;


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ParticipantsService} _participantsService
   * @param {MatDialog} _matDialog
   */
  constructor(
      private _companyService: EntreprisesService,
      public _matDialog: MatDialog
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
      

      this.dataSource = new FilesDataSource(this._companyService);
     
      this._companyService.onRegistrationChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(contacts => {
              this.registrations = contacts;

          });



  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

 
  /**
   * Delete Contact
   */
   deleteParticipant(id): void {
      // this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      //     disableClose: false
      // });

      // this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      // this.confirmDialogRef.afterClosed().subscribe(result => {
      //     if (result) {
      //         console.log(id)
      //         this._participantsService.deleteContact(id);
      //     }
      //     this.confirmDialogRef = null;
      // });

  }

}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {EntreprisesService} _companyService
   */
  constructor(
      private _companyService: EntreprisesService
  ) {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
      return this._companyService.onRegistrationChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}
