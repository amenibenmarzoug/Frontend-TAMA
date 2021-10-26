import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import{ClassesDetailService} from '././classes-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ModuleClasseComponent } from '../../academy/classes-detail/tabs/module-classe/module-classe.component';
@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ClassesDetailComponent implements OnInit {

    dialogRef: any;
    hasSelectedThemeDetails: boolean;
    searchInput: FormControl;
    moduleId: number;
    selectedTab = 0;
  
    // Private
    private _unsubscribeAll: Subject<any>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    alertDialog: MatDialogRef<AlertDialogComponent>;
    themeDetail: any;
    selectedModule:ModuleClasseComponent;

    programId: any;
  private sub:any;
    /**
     * Constructor
     *
     * @param {ProgramDetailsService} _classDetailsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _classDetailsService: ClassesDetailService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private _programDetailsService: ClassesDetailService,
        private route: ActivatedRoute
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
  
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    selectTab(event) {
        this.selectedTab = event;
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
            this._programDetailsService.programInstId = this.programId;
            this._programDetailsService.getThemesInstPerProgram();
    }
  
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Reset the search
        //this._themeDetailsService.onSearchTextChangedThemeDetail.next('');
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
  
  
  
  
 

}
