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
import { ProgramInstFormComponent } from './program-inst-form/program-inst-form.component';
@Component({
  selector: 'app-programs-inst',
  templateUrl: './programs-inst.component.html',
  styleUrls: ['./programs-inst.component.scss'],
  animations: fuseAnimations
})
export class ProgramsInstComponent implements OnInit {

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

  cities: String[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba','Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan','Kasserine','Sidi Bouzid', 'Gabès', 'Mednine','Tataouine','Gafsa','Tozeur','Kebili'
    
  ];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ProgramsInstService} _academyProgramsInstService
   */
  constructor(
      private _academyProgramsInstService:ProgramsInstService,
      public dialog: MatDialog,
      private router: Router,
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

              console.log("programInst fel progInst");
              console.log(courses);
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


  /**
   * New contact
   */
  newProgram(): void {
      this.dialogRef = this.dialog.open(ProgramInstFormComponent, {
          panelClass: 'program-form-dialog',
          data: {
              action: 'new'
          }
      });

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if (!response) {
                  return;
              }

              this._academyProgramsInstService.addProgramInst(response.getRawValue(),this._academyProgramsInstService.program);
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

                  console.log("programmm fel saave");
                  console.log(this._academyProgramsInstService.program);
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
      this.router.navigate(['/apps/academy/programInstDetails', id]);
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
