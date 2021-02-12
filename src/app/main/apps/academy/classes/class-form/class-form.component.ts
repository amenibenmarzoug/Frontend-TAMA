import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { ProgramInst } from '../../programInst.model';
import { ProgramsInstService } from '../../programs-inst.service';
import{ClassesService} from '../../classes.service';
import { Program } from '../../program.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {
  action: string;
  //course:AcademyCoursesComponent;
    programInst:ProgramInst;
    event: CalendarEvent;
    programInstForm: FormGroup;
    dialogTitle: string;
    programs:any[] ;
    private _unsubscribeAll: Subject<any>;
    

  constructor(
    public matDialogRef: MatDialogRef<ClassFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        
        private _formBuilder: FormBuilder,
        private _programInstService1: ProgramsInstService,
       private _programInstService: ClassesService
  ) {
    // Set the defaults
  this.action = _data.action;


  if ( this.action === 'edit' )
  {
      this.dialogTitle = 'Modifier le Programme Dédié';
      this.programInst = _data.programInst;
      this._programInstService.program = this.programInst.program;
     
  }
  else
  {

      this.dialogTitle = 'Nouveau Programme Dédié';
      this.programInst = new ProgramInst({});
      
    }
    
    this.programInstForm = this.createProgramInstForm();
    this._unsubscribeAll = new Subject();
    this.programs=this._programInstService.programs;
 
    console.log("prograams fel class add form");
    console.log(this.programs);

    
   }

  ngOnInit(): void {
    
  }


  createProgramInstForm(): FormGroup
    {
      
         return this._formBuilder.group({
          id: [this.programInst.id],
          programInstName: [this.programInst.programInstName],
          nbDaysProgInst: [this.programInst.nbDaysProgInst],
          location  : [this.programInst.location],
          program: [this.programInst.program,Validators.required],


          
    
        
      });

    }
    getProgramForm(event){
     
      this._programInstService.program=event;  
      this.programInst.nbDaysProgInst = event.nbDaysProg;     
      this.programInst.programInstName = event.programName; 
}

}
