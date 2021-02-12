import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThematiqueFormComponent } from '../../../programDetails/tabs/thematique/thematique-form/thematique-form.component';
import{ProgramInstDetailService} from '../../../program-inst-detail/program-inst-detail.service';
import { ThematiqueInstFormComponent } from './thematique-inst-form/thematique-inst-form.component';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
@Component({
  selector: 'app-thematique-inst',
  templateUrl: './thematique-inst.component.html',
  styleUrls: ['./thematique-inst.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ThematiqueInstComponent implements OnInit {

  categories: any[];
  themes: any[];
  themesFilteredByCategory: any[];
  filteredThemes: any[];
  currentCategory: string;
  searchTerm: string;
  dialogRef: any;
  alertDialog:MatDialogRef<AlertDialogComponent>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  duration: any;
  programId: any;
  private sub:any;

    themeInst: any ; 
  programTotalDaysNumber: number; 
    actualDaysNumberAffected : number ; 
    oldDaysAffectedValue: number ; 

  // Private
  private _unsubscribeAll: Subject<any>;
   

  /**
   * Constructor
   *
   * @param {ProgramDetailsService} _programDetailsService
   */
  constructor(
      private _programInstDetailsService:ProgramInstDetailService,
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
              this.filteredThemes = this.themesFilteredByCategory = this.themes = themes;
              console.log(this.themes);
          });

          this._programInstDetailsService.getProgramById(this._programInstDetailsService.programInstId) ; 
          this._programInstDetailsService.getProgramDaysAffected() ;
          

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



  //open the dialog of cursus add (not used now)
  newTheme() {
      this.dialogRef = this.dialog.open(ThematiqueInstFormComponent, {
          panelClass: 'theme-form-dialog',
          data: {
              action: 'new'
          }
      });

        this.actualDaysNumberAffected=this._programInstDetailsService.actualDaysNumberAffected ; 
        this.programTotalDaysNumber=this._programInstDetailsService.programInst.nbDaysProgInst;

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
            this.themeInst=response.getRawValue() ; 
            this.actualDaysNumberAffected = this._programInstDetailsService.actualDaysNumberAffected
                                            + Number(this.themeInst.nbDaysthemeInst)  ; 
              if (!response) {
                  console.log(`Dialog result before return: ${response}`);

                  return;
              }
              if (this.actualDaysNumberAffected > this.programTotalDaysNumber) {
                this.addThematiqueAlert("Vous avez dépassé le nombre des jours du Programme");
                console.log(`Exceeded`);
                return; 
            }
          this._programInstDetailsService.addThemeInst(response.getRawValue(),this._programInstDetailsService.theme);


          });

  }


  /**
    * Edit contact
    *
    * @param contact
    */
  editThemeInst(themeInst): void {
      this.dialogRef = this.dialog.open(ThematiqueInstFormComponent, {
          panelClass: 'theme-form-dialog',
          data: {
              themeInst: themeInst,
              action: 'edit'
          }
      });
      this.programTotalDaysNumber=this._programInstDetailsService.programInst.nbDaysProgInst; 
      this.oldDaysAffectedValue=themeInst.nbDaysthemeInst;
      console.log("this.oldDaysAffectedValue "+ this.oldDaysAffectedValue)
      this._programInstDetailsService.oldDaysAffectedNumber=this.oldDaysAffectedValue;

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
                    this.actualDaysNumberAffected=this._programInstDetailsService.actualDaysNumberAffected
                                                    -this.oldDaysAffectedValue+ Number(formData.getRawValue().nbDaysthemeInst)  ; 
                    console.log("this.actualDaysNumberAffected "+this.actualDaysNumberAffected )
                    console.log("this.programTotalDaysNumber  "+ this.programTotalDaysNumber)
                    // case where the modified days number exceeded the limit
                    if(this.actualDaysNumberAffected > this.programTotalDaysNumber) {

                        this.addThematiqueAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
                        console.log(`Exceeded`);
                        this._programInstDetailsService.getThemeInst(); 

                    break; 
                    }
                    // case where the modified days number is valid
                      this._programInstDetailsService.updateThemeInst(formData.getRawValue(),this._programInstDetailsService.programInst);

                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteThemeInst(themeInst.id);

                      break;
              }
          });
  }

  deleteThemeInst(theme): void {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

        this.actualDaysNumberAffected=this._programInstDetailsService.actualDaysNumberAffected ;        
        this.programTotalDaysNumber=this._programInstDetailsService.programInst.nbDaysProgInst; 
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this._programInstDetailsService.deleteThemeInst(theme);
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
