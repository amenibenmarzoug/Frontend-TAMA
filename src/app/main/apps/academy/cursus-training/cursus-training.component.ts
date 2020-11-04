import { Component, OnInit,OnDestroy ,ViewEncapsulation,ViewChild,ElementRef} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { MatListOption } from '@angular/material/list';



import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';


import { AcademyProgramsService } from 'app/main/apps/academy/programs.service';
import { SelectorListContext } from '@angular/compiler';
import { TrainingsService } from '../trainings.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainingFormComponent } from 'app/main/apps/academy/trainings/training-form/training-form.component';
import{Training} from 'app/main/apps/academy/trainings/training.model';
import {CursusTrainingService} from './cursus-training.service'




@Component({
  selector: 'app-cursus-training',
  templateUrl: './cursus-training.component.html',
  styleUrls: ['./cursus-training.component.scss']
})
export class CursusTrainingComponent implements OnInit {

  
  selectedOptions: SelectorListContext;
  dialogRef: any;


 // Horizontal Stepper
 horizontalStepperStep1: FormGroup;
 horizontalStepperStep2: FormGroup;
 horizontalStepperStep3: FormGroup;
 options1: MatListOption[];
 cursusid: number;
 createdTrainings: Training[];
 par: any[] = [];


 

 // Private
 private _unsubscribeAll: Subject<any>;



constructor(  private _formBuilder: FormBuilder, 
  private _academyProgramsService: AcademyProgramsService,
  private _contactsService: TrainingsService,
  private _matDialog: MatDialog,
  private serv: CursusTrainingService
 
  ) {  this._unsubscribeAll = new Subject();}

ngOnInit(): void {

this.createdTrainings=[];
      // Horizontal Stepper form steps
      this.horizontalStepperStep1 = this._formBuilder.group({
        cursusName: ['', Validators.required],
        cursusBeginDate: ['', Validators.required],
        cursusEndDate:   ['', Validators.required]
        //lastName : ['', Validators.required]
    });

    this.horizontalStepperStep2 = this._formBuilder.group({
       // address: ['', Validators.required],
       maliste: ['']
        
    });
    

    this.horizontalStepperStep3 = this._formBuilder.group({
        //city      : ['', Validators.required],
        //state     : ['', Validators.required],
        //postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    });
    
  
}

onGroupsChange(options: MatListOption[]){
  // map these MatListOptions to their value
  this.options1=options.map(o => o.value);
  //console.log("options    "+options);
  console.log(options.map(o => o.value));
  
   
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
   * Finish the horizontal stepper
   */
  finishHorizontalStepper(): void
  {
      //alert('You have finished the horizontal stepper!');
      
     console.log(this.horizontalStepperStep1.getRawValue());
    // console.log(this.options1);


     //this._academyCoursesService.saveCourse(this.horizontalStepperStep1.getRawValue());



    // this.cursusid =this._academyCoursesService.getCursusid();
//this._academyCoursesService.getCursusid
//console.log("idddd baaaed appel");
    // console.log(this._academyCoursesService.courseId);

     //console.log("this.horizontalStepperStep1.getRawValue().id");

    // console.log(this.horizontalStepperStep1.getRawValue().id);

     

  }
  newContact(): void
  {
    //console.log("je suis la" + this._academyCoursesService.courseId);
      this.dialogRef = this._matDialog.open(TrainingFormComponent, {
          panelClass: 'training-form-dialog',
          data      : {
              action: 'new',
              foreignKeyCursus:this._academyProgramsService.courseId,
              course:this._academyProgramsService.course
          }
      });


      let createdTrainings1=[];
      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }
              console.log("Dialog result after return");
              console.log(this._academyProgramsService.course);


             // this._contactsService.updateContact(response.getRawValue(),this._academyCoursesService.course);
             this.createdTrainings.push(response.getRawValue());
            //this._contactsService.getContacts;
            createdTrainings1.push(response.getRawValue());
            //this._contactsService.getContacts;

            //Display the createdTrainings!!!

            for (let i in createdTrainings1) {
              this.par.push(createdTrainings1[i]);
            }
    
            console.log("par")
            console.log(this.par)
            this.serv.raiseEvent(this.par);
    


              console.log(`Dialog result after return: ${response.getRawValue().data}`);

          });
  }

  addCursusAndTrainings(): void{
    this._academyProgramsService.saveCourse(this.horizontalStepperStep1.getRawValue(),this.createdTrainings);

  }


}
