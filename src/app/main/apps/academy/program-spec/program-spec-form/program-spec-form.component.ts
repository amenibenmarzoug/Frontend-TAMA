import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

import{ProgramSpecService} from '../../program-spec.service'
import{Program} from 'app/shared/models/program.model';

@Component({
  selector: 'app-program-spec-form',
  templateUrl: './program-spec-form.component.html',
  styleUrls: ['./program-spec-form.component.scss']
})
export class ProgramSpecFormComponent implements OnInit {

  action: string;
  
   programSpec:Program;
    event: CalendarEvent;
    programSpecForm: FormGroup;
    dialogTitle: string;
    programs:any[] ;
    private _unsubscribeAll: Subject<any>;
    

  constructor(
    public matDialogRef: MatDialogRef<ProgramSpecFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        
        private _formBuilder: FormBuilder,
        private _programSpecService: ProgramSpecService
  ) {
    // Set the defaults
  this.action = _data.action;


  if ( this.action === 'edit' )
  {
      this.dialogTitle = 'Modifier le Programme Dédié';
      this.programSpec = _data.program;
     
     
  }
  else
  {

      this.dialogTitle = 'Nouveau Programme Dédié';
      this.programSpec = new Program({});
      
    }
    this.programSpecForm = this.createProgramSpecForm();
    this._unsubscribeAll = new Subject();
    this.programs=this._programSpecService.basicPrograms;

        

  
   }

  ngOnInit(): void {
   

  }


  createProgramSpecForm(): FormGroup
    {
      
         return this._formBuilder.group({
          id: [this.programSpec.id],
          programName: [this.programSpec.programName],
          nbDaysProg: [this.programSpec.nbDaysProg],
       


          
    
        
      });


    }
    getProgramForm(event){
     
      this._programSpecService.program=event;  
      this.programSpec.nbDaysProg = event.nbDaysProg;     
      this.programSpec.programName = event.programName; 
}
}
