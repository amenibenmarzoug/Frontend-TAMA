import { Component, OnInit,OnDestroy} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';

import { ProgramsService } from 'app/main/apps/academy/programs.service';
import { ProgramsInstService } from 'app/main/apps/academy/programs-inst.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

import { Router } from '@angular/router';
import { ProgramInstFormComponent } from '../programs-inst/program-inst-form/program-inst-form.component';
import { ProgramInstDetailService } from '../../academy/program-inst-detail/program-inst-detail.service';
import {ClassesService} from'../../academy/classes.service';
import{ClassFormComponent} from './class-form/class-form.component';
import{ProgramDetailsService} from '../programDetails/programDetails.service'
import { ModuleInst } from '../program-inst-detail/tabs/module-inst/moduleInst.model';
import{Module} from '../programDetails/tabs/module/module.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ThematiqueInst } from '../program-inst-detail/tabs/thematique-inst/thematiqueInst.model';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  animations: fuseAnimations

})
export class ClassesComponent implements OnInit {

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

  themes : any [];
  lastprogInst: any;


  themesFilteredByCategory: any[];
  filteredThemes: any[];

  modulesInst:ModuleInst[];

  modules:Module[];
  hasSelectedModules: boolean;
  modulesOfTheme : Module[];
  lastThemeInst:ThematiqueInst;
  

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramsInstService} _academyProgramsInstService
   */
  constructor(
    //  private _academyProgramsInstService:ProgramsInstService,
    private _academyProgramsInstService:ClassesService,
      public dialog: MatDialog,
      private router: Router,
      //private _programDetailsService : ProgramInstDetailService,
     // private _programDetailsService:ProgramDetailsService,
   

      //private _programInstDetailsService:ProgramInstDetailService,
      
  

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
      this._academyProgramsInstService.onCategoriesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(categories => {
              this.categories = categories;
          });

      // Subscribe to courses
      this._academyProgramsInstService.onProgramsInstChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(courses => {
              this.filteredPrograms = this.programsFilteredByCategory = this.programs = courses;
              console.log("programInst fel Classe");
            console.log(courses);
          });



        /*  this._academyProgramsInstService.onSelectedModulesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selectedModules => {
              this.hasSelectedModules = selectedModules.length > 0;
          });

        /* this._academyProgramsInstService.onmoduleChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modules = modules;
              console.log("moduules fel init classes");
              console.log(this.modules);
          });*/

         /* this._programInstDetailsService.onModuleChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(modules => {
              this.modules = modules;
              console.log("moduules fel init classes");
              console.log(this.modules);
          });
         

      


           // Subscribe to courses
   /*  this._academyProgramsInstService.onProgramChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(courses => {
          this.programs=courses;
          console.log("programs fel Classe");
          console.log(this.programs);
        console.log(courses);
      });*/



            // Subscribe to themes
   /*   this._academyProgramsInstService.onThemeChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(themes => {
        //  this.filteredThemes = this.themesFilteredByCategory = this.themes = themes;
        this.themes = themes;
          console.log("themeees fel classess");
          console.log(themes);
         console.log(this.themes);
      });*/
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
  filterCoursesByCategory(): void {
      // Filter
      if (this.currentCategory === 'all') {
          this.programsFilteredByCategory = this.programs;
          this.filteredPrograms = this.programs;
      }
      else {
          this.programsFilteredByCategory = this.programs.filter((course) => {

              return course.category === this.currentCategory;
          });

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

      //filter with cursusName and cursusCategory 
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


  /**
   * New contact
   */
  newProgram(): void {
      this.dialogRef = this.dialog.open(ClassFormComponent, {
          panelClass: 'classe-form-dialog',
          data: {
              action: 'new',
          }
      });

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if (!response) {
                  return;
              }
              console.log(this._academyProgramsInstService.program);

            this._academyProgramsInstService.addClass(response.getRawValue(),this._academyProgramsInstService.program);

          });
  }


  

 
  
  /**
    * Edit contact
    *
    * @param contact
    */
  editProgramInst(programInst): void {
      this.dialogRef = this.dialog.open(ProgramInstFormComponent, {
          panelClass: 'cursus-form-dialog',
          data: {
              programInst: programInst,
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

                      this._academyProgramsInstService.updateProgramInst(formData.getRawValue(),this._academyProgramsInstService.program);

                      break;
                  /**
                   * Delete
                   */
                  case 'delete':

                      this.deleteCursus(programInst.id);

                      break;
              }
          });
  }
  goToProgramModuleInst(id) {
      this.router.navigate(['/apps/academy/classeDetail', id]);
      console.log("programInst id" + id)
  }

  deleteCursus(contact): void {
      this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this._academyProgramsInstService.deleteProgramInst(contact);
          }
          this.dialogRef = null;
      });

  }

}
