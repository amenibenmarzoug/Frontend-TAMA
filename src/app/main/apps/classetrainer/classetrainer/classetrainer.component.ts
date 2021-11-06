
import { Component, OnInit, OnDestroy,  ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { Router } from '@angular/router';
import { ClassesService } from '../../academy/classes.service';


import { ClasseParticipantsService } from 'app/main/apps/academy/classes/classe-participants/classe-participants.service';
import { ClasseParticipantsComponent } from 'app/main/apps/academy/classes/classe-participants/classe-participants.component';

import { ProgramInstance } from 'app/shared/models/programInstance.model';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import {ClassetrainerService} from '../classetrainer.service';
import {ProfileService} from 'app/main/pages/profile/profile.service'
@Component({
  selector: 'app-classetrainer',
  templateUrl: './classetrainer.component.html',
  styleUrls: ['./classetrainer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ClassetrainerComponent implements OnInit {

  categories: any[];
  programs: any[];
  programsFilteredByCategory: any[];
  programId: any;
  filteredPrograms: any[];
  currentCategory: string;
  searchTerm: string;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  duration: any;

  themes: any[];


  themesFilteredByCategory: any[];
  filteredThemes: any[];
  

alertDialog: MatDialogRef<AlertDialogComponent>;


  cities: String[] = [
      'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
      'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

  ];

  // Private
  private _unsubscribeAll: Subject<any>;



  /**
   * Constructor
   *
   * @param {ProgramsInstService} _academyProgramsInstService
   */
  constructor(
      private _academyProgramsInstService: ClassetrainerService,
      public dialog: MatDialog,
      private router: Router,
      private _participantService: ClasseParticipantsService,
     

  ) {
      // Set the defaults
      this.currentCategory = 'Toutes';
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
      this._academyProgramsInstService.onCategoriesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(categories => {
              this.categories = categories;
          });

        

      // Subscribe to courses
      this._academyProgramsInstService.onProgramsInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(classes => {
              this.filteredPrograms = this.programsFilteredByCategory = this.programs = classes;

              
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
  filterClassesByCategory(): void {
      // Filter
      if (this.currentCategory === 'Toutes') {
          this.programsFilteredByCategory = this.programs;
          this.filteredPrograms = this.programs;
      }
      else {
          if (this.currentCategory === 'Non confirmées') {
              this.programsFilteredByCategory = this.programs.filter((course) => {
                  if (course.validated == false) {
                      return course;
                  }
              });
          }
          else {
              this.programsFilteredByCategory = this.programs.filter((course) => {
                  if (course.validated == true) {
                      return course;
                  }
              });
          }
          this.filteredPrograms = [...this.programsFilteredByCategory];



      }

      // Re-filter by search term
      this.filterCoursesByTerm();
  }

  /**
   * Filter courses by term
   */
  filterCoursesByTerm(): void {
      const searchTerm = this.searchTerm.toLowerCase();

      // Search
      if (searchTerm === '') {
          this.filteredPrograms = this.programsFilteredByCategory;
      }

      // filter with cursusName and cursusCategory 
      else {
          this.filteredPrograms = this.programsFilteredByCategory.filter((program) => {
              return program.programInstName.toLowerCase().includes(searchTerm);
          });
      }
  }





  filterThemesByCategory(): void {
      // Filter
      if (this.currentCategory === 'all') {
          this.themesFilteredByCategory = this.themes;
          this.filteredThemes = this.themes;
      }
      else {
          this.themesFilteredByCategory = this.themes.filter((theme) => {

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

      // filter with cursusName and cursusCategory 
      else {
          this.filteredThemes = this.themesFilteredByCategory.filter((theme) => {
              return theme.themeName.toLowerCase().includes(searchTerm);
          });
      }
  }




 

  listeDesParticipants(programInst): void {
      
    this._participantService.getParticipantsByProgramInstanceId(programInst.id).then(participants =>{
        if ((this._participantService.participants.length == 0)) { {

        }
 
             this.addListAlert("Aucun participant inscrit à cette classe");
             
         }
         else {
 
         this.dialogRef = this.dialog.open(ClasseParticipantsComponent, {
             height: '80%',
             width: '60%',
             panelClass: 'contact-form-dialog',
             data: {
                title:programInst.programInstName
                 //programInst: programInst,
                 //action: 'edit'
             }
         });
         this.dialogRef.afterClosed()
             .subscribe(response => {
                 if (!response) {
                     return;
                 }
             })
 
         }
    });
    

  }

  addListAlert(message): void {
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




  
  
  goToProgramModuleInst(id) {
      this.router.navigate(['/apps/academy/classeDetail', id]);
  }



  
  
 

}
