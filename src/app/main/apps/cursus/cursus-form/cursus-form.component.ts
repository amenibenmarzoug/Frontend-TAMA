import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Cursus} from 'app/main/apps/cursus/cursus.model';
import { CursusCoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-cursus-form',
  templateUrl: './cursus-form.component.html',
  styleUrls: ['./cursus-form.component.scss']
})
export class CursusFormComponent implements OnInit {
  action: string;
  //course:AcademyCoursesComponent;
    cursus:Cursus;
    event: CalendarEvent;
    cursusForm: FormGroup;
    dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<CursusFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        
        private _formBuilder: FormBuilder
  ) {
    // Set the defaults
  this.action = _data.action;


  if ( this.action === 'edit' )
  {
      this.dialogTitle = 'Edit Cursus';
      this.cursus = _data.course;
      //this.cursus =new Cursus({});
  }
  else
  {
    console.log("I m heeeere");

      this.dialogTitle = 'New Cursus';
      this.cursus = new Cursus({});
      
    }
    console.log(this.action);
    this.cursusForm = this.createCursusForm();
   }

  ngOnInit(): void {
  }


  createCursusForm(): FormGroup
    {
      /*return new FormGroup({

            cursusName : new FormControl(this.cursus.cursusName),
            cursusBeginDate : new FormControl(this.cursus.cursusBeginDate),
            cursusEndDate   : new FormControl(this.cursus.cursusEndDate),
            
            });*/
         return this._formBuilder.group({
          id      : [this.cursus.id],
          cursusName   : [this.cursus.cursusName],
          cursusBeginDate : [this.cursus.cursusBeginDate],
          cursusEndDate: [this.cursus.cursusEndDate],
        
      });

    }

}

