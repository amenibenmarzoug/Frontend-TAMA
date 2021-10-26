import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgramSpecDetailService } from '../../program-spec-detail.service';
import { ThematiqueSpecFormComponent } from './thematique-spec-form/thematique-spec-form.component';

@Component({
  selector: 'app-thematique-spec',
  templateUrl: './thematique-spec.component.html',
  styleUrls: ['./thematique-spec.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThematiqueSpecComponent implements OnInit {

  [x: string]: any;
  categories: any[];
  themes: any[];
  themesFilteredByCategory: any[];
  filteredThemes: any[];
  currentCategory: string;
  searchTerm: string;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
 
  programId: any;
  private sub:any;

  programTotalDaysNumber: number; 
  actualDaysNumberAffected : number ; 
  oldDaysAffectedValue: number ; 
  theme:any ; 


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _programDetailsService
   */
  constructor(
      private _programDetailsService: ProgramSpecDetailService,
      public dialog: MatDialog,
      private route: ActivatedRoute
  ) {
      // Set the defaults
      this.currentCategory = 'all';
      this.searchTerm = '';
     // this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg; 
 

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
      this._programDetailsService.onCategoriesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(categories => {
              this.categories = categories;
          });


      // Subscribe to themes
      this._programDetailsService.onThemeChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(themes => {
              this.filteredThemes = this.themesFilteredByCategory = this.themes = themes;
          }); 
        
          this.programId=this._programDetailsService.programId;
          console.log(this.programId) ;  
          this._programDetailsService.getProgramById(this.programId) ; 
          this._programDetailsService.getProgramDaysAffected() 
          


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
          this.themesFilteredByCategory = this.themes;
          this.filteredThemes = this.themes;
      }
      else {
          this.themesFilteredByCategory = this.themes.filter((theme) => {

             // return theme.category === this.currentCategory;
          });

          this.filteredThemes = [...this.themesFilteredByCategory];

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
          this.filteredThemes = this.themesFilteredByCategory;
      }

      //filter with cursusName and cursusCategory 
      else {
          this.filteredThemes = this.themesFilteredByCategory.filter((theme) => {
              return theme.themeName.toLowerCase().includes(searchTerm);
          });
      }
  }

  openDialog() {
      let dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });
      dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      });


  }

  //open the dialog of cursus add 
  newTheme() {
      this.dialogRef = this.dialog.open(ThematiqueSpecFormComponent, {
          panelClass: 'theme-form-dialog',
          data: {
              action: 'new'
          }
      });

     

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              
             
              if (!response) {
                  console.log(`Dialog result before return: ${response}`);

                  return;
              }
              this.theme=response.getRawValue() ; 

              this.confirmAddTheme();
            
       
          });
  }



 
confirmAddTheme(): void {

    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous enregistrer les données entrées?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
            console.log("ajout theme avec succès");

            this._programDetailsService.addTheme(this.theme);

        }
        this.confirmDialogRef = null;
    });

}





  

  /**
    * Edit contact
    *
    * @param contact
    */
  editTheme(theme): void {
      this.dialogRef = this.dialog.open(ThematiqueSpecFormComponent, {
          panelClass: 'theme-form-dialog',
          data: {
              theme: theme,
              action: 'edit'
          }
      });
      this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg; 
      this.oldDaysAffectedValue=theme.nbDaysTheme;
      this._programDetailsService.oldDaysAffectedNumber=this.oldDaysAffectedValue;
                      
      console.log("this.oldDaysAffectedValue") ;console.log(this.oldDaysAffectedValue) ;
      
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
                      
                   
                      // case where the modified days number is valid
                      this._programDetailsService.updateTheme(formData.getRawValue(),this._programDetailsService.program);
                      
                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteTheme(theme.id);

                      break;
              }
          });
  }



  deleteTheme(theme): void {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

     

      this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this._programDetailsService.deleteTheme(theme);
          }
          this.dialogRef = null;
      });

  }


  addThematiqueAlert(message): void {
      this.alertDialog = this.dialog.open(AlertDialogComponent, {
          disableClose: false
      });

      this.alertDialog.componentInstance.dialogMessage = message;

      this.alertDialog.afterClosed().subscribe(result => {
          if (result) {

          }
          this.alertDialog = null;
      });
  }

}
