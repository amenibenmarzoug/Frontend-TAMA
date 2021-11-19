import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

import { ProgramInstance } from 'app/shared/models/programInstance.model'; 

import { ClassesService } from '../../classes.service';
import { Program } from 'app/shared/models/program.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports




@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

   // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ClassFormComponent implements OnInit {

  action: string;
  //course:AcademyCoursesComponent;
  programInst: ProgramInstance;
  programDeBase : Program ; 
  event: CalendarEvent;
  programInstForm: FormGroup;
  dialogTitle: string;
  programs: any[];
  private _unsubscribeAll: Subject<any>;
  cities: String[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

  ];

  constructor(
    public matDialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,

    private _formBuilder: FormBuilder,
    private _programInstService: ClassesService,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Set the defaults
    this.action = _data.action;
    this.dateAdapter.setLocale('fr');

    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier la Classe';
 
      this.programInst = _data.programInst;
      this._programInstService.program = this.programInst.program;
      this.programDeBase=this.programInst.program ; 

   

    

    }
    else {

      this.dialogTitle = 'Nouvelle Classe';
      this.programInst = new ProgramInstance({});
      //this.programInst.beginDate = new Date()
      //this.programInst.endDate = new Date()
      

    }

    this.programInstForm = this.createProgramInstForm();
    
    this._unsubscribeAll = new Subject();
    this.programs = this._programInstService.programs;

    


  }

  ngOnInit(): void {
    
  
    if (this.programDeBase !== undefined)
    {
    const toSelect = this.programs.find(p => p.id == this.programDeBase.id);
    this.programInstForm.get('program').setValue(toSelect);
  
    }

  }


 
  createProgramInstForm(): FormGroup {
    if (this.programInst.id == null) {
      return new FormGroup({
        id: new FormControl(this.programInst.id),
        programInstName: new FormControl(this.programInst.programInstName),
        nbDaysProgInst: new FormControl(this.programInst.nbDaysProgInst),
        location: new FormControl(this.programInst.location),
        program: new FormControl(this.programInst.program),
        beginDate: new FormControl(this.programInst.beginDate),
        endDate: new FormControl(this.programInst.endDate),
       
      });
    }
    else {
      return new FormGroup({
        id: new FormControl(this.programInst.id),
        programInstName: new FormControl(this.programInst.programInstName),
        nbDaysProgInst: new FormControl(this.programInst.nbDaysProgInst),
        location: new FormControl(this.programInst.location),
        program: new FormControl(this.programInst.program),
        beginDate: new FormControl(this.programInst.beginDate),
        endDate:new FormControl(this.programInst.endDate),
      });
    }

  }

  getProgramForm(event) {
    this._programInstService.program = event;
    this.programInst.nbDaysProgInst = event.nbDaysProg;
    //this.programInst.programInstName = event.programName;
  }

}
