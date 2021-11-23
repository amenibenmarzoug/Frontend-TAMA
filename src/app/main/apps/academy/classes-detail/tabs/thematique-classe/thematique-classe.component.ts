import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import{ClassesDetailService} from '../../classes-detail.service'

import {ThematiqueClasseFormComponent} from './thematique-classe-form/thematique-classe-form.component';
@Component({
  selector: 'app-thematique-classe',
  templateUrl: './thematique-classe.component.html',
  styleUrls: ['./thematique-classe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ThematiqueClasseComponent implements OnInit {

  categories: any[];
  themesInst: any[];
  themesFilteredByCategory: any[];
  filteredThemesInst: any[];
  currentCategory: string;
  searchTerm: string;
  dialogRef: any;
  
  private sub:any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _programDetailsService
   */
  constructor(
      private _programInstDetailsService:ClassesDetailService,
      public dialog: MatDialog,
      private route: ActivatedRoute
  ) {
      // Set the defaults
      this.currentCategory = 'all';
      this.searchTerm = '';

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

     
      // Subscribe to categories
      this._programInstDetailsService.onCategoriesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(categories => {
              this.categories = categories;
          });


      // Subscribe to themes
      this._programInstDetailsService.onThemeInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(themes => {
              this.filteredThemesInst = this.themesFilteredByCategory = this.themesInst = themes;
             
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
   * Filter courses by category
   */
  filterThemesByCategory(): void {
      // Filter
      if (this.currentCategory === 'all') {
          this.themesFilteredByCategory = this.themesInst;
          this.filteredThemesInst = this.themesInst;
      }
      else {
          this.themesFilteredByCategory = this.themesInst.filter((theme) => {

             // return theme.category === this.currentCategory;
          });

          this.filteredThemesInst = [...this.themesFilteredByCategory];

      }

      // Re-filter by search term
      this.filterThemesByTerm();
  }

  /**
   * Filter courses by term
   */
  filterThemesByTerm(): void {
      const searchTerm = this.searchTerm.toLowerCase();

      // Search
      if (searchTerm === '') {
          this.filteredThemesInst = this.themesFilteredByCategory;
      }

      //filter with cursusName and cursusCategory 
      else {
          this.filteredThemesInst = this.themesFilteredByCategory.filter((theme) => {
              return theme.themeName.toLowerCase().includes(searchTerm);
          });
      }
  }

  openDialog() {
      let dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });
      dialogRef.componentInstance.confirmMessage = 'Etes vous sûr de la suppression?';

      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      });


  }
 


  /**
    * Edit contact
    *
    * @param contact
    */
  editThemeInst(themeInst): void {  
      this.dialogRef = this.dialog.open(ThematiqueClasseFormComponent, {
        disableClose: true ,  
        panelClass: 'theme-form-dialog',
          data: {
              themeInst: themeInst,
              action: 'edit'
          }
      });

      this.dialogRef.afterClosed()
          .subscribe(response => {
              if (!response) {
                  return;
              }
              const actionType: string = response[0];
              const formData: FormGroup = response[1];
              switch (actionType) {
                  /**
                   * Save
                   */
                  case 'save':
                      this._programInstDetailsService.updateThemeInst(formData.getRawValue(),this._programInstDetailsService.programInst);

                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteThemeInst(themeInst);

                      break;
              }
          });
  }

  deleteThemeInst(themeInst): void {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.dialogRef.componentInstance.confirmMessage = 'Etes vous sûr de supprimer le theme ' + themeInst.themeInstName +' ?';

      this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
              //this._programInstDetailsService.deleteThemeInst(themeInst);
              this._programInstDetailsService.omitThemeInst(themeInst);

          }
          this.dialogRef = null;
      });

  }
}
