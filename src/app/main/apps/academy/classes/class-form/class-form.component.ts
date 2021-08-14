import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { ProgramInst } from '../../programInst.model';
import { ProgramsInstService } from '../../programs-inst.service';
import { ClassesService } from '../../classes.service';
import { Program } from '../../program.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    dateDebutLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    dateDebutA11yLabel: 'MMMM YYYY',
  },
};

const moment = _moment;

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

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ClassFormComponent implements OnInit {


  chosenYearHandler(normalizedYear: Moment) {
    if (this.programInst.id != null) {
      this.programInstForm.value.beginDate = moment();
    }
    
    const ctrlValue = this.programInstForm.value.beginDate;
    //const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.programInstForm.setValue({
      id: this.programInstForm.value.id,
      programInstName: this.programInstForm.value.programInstName,
      nbDaysProgInst: this.programInstForm.value.nbDaysProgInst,
      location: this.programInstForm.value.location,
      program: this.programInstForm.value.program,
      beginDate: ctrlValue,
      endDate:this.programInstForm.value.endDate,
    });
    //this.programInstForm.value.dateDebut.setValue(ctrlValue);
  

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  
    const ctrlValue = this.programInstForm.value.beginDate;
    ctrlValue.month(normalizedMonth.month());
    this.programInstForm.setValue({
      id: this.programInstForm.value.id,
      programInstName: this.programInstForm.value.programInstName,
      nbDaysProgInst: this.programInstForm.value.nbDaysProgInst,
      location: this.programInstForm.value.location,
      program: this.programInstForm.value.program,
      beginDate: ctrlValue,
      endDate:this.programInstForm.value.endDate,
    });
    
    this.programInst.beginDate = this.programInstForm.value.beginDate;
    datepicker.close();
  }

  chosenYearEndHandler(normalizedYear: Moment) {

    if (this.programInst.id != null) {
      this.programInstForm.value.endDate = moment();
    }
    
    const ctrlValue = this.programInstForm.value.endDate;
    //const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.programInstForm.setValue({
      id: this.programInstForm.value.id,
      programInstName: this.programInstForm.value.programInstName,
      nbDaysProgInst: this.programInstForm.value.nbDaysProgInst,
      location: this.programInstForm.value.location,
      program: this.programInstForm.value.program,
      endDate: ctrlValue,
      beginDate:this.programInstForm.value.beginDate,
    });
    console.log("FORM");
    console.log(this.programInstForm.value);
  }

  chosenMonthEndHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.programInstForm.value.endDate;
    ctrlValue.month(normalizedMonth.month());
    this.programInstForm.setValue({
      id: this.programInstForm.value.id,
      programInstName: this.programInstForm.value.programInstName,
      nbDaysProgInst: this.programInstForm.value.nbDaysProgInst,
      location: this.programInstForm.value.location,
      program: this.programInstForm.value.program,
      endDate: ctrlValue,
      beginDate:this.programInstForm.value.beginDate,
    });
    
    this.programInst.endDate = this.programInstForm.value.endDate;
    console.log("FORM");
    console.log(this.programInstForm.value);
    datepicker.close();
  }

  /*  chosenYearHandler(normalizedYear: Moment) {
      console.log("DATE");
      console.log( this.date.value);
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }
  
    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }*/
  action: string;
  //course:AcademyCoursesComponent;
  programInst: ProgramInst;
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
    //private _programInstService1: ProgramsInstService,
    private _programInstService: ClassesService
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier la Classe';
      //console.log("_data.programInst");
      //console.log(_data.programInst);
      this.programInst = _data.programInst;
      this._programInstService.program = this.programInst.program;

    }
    else {

      this.dialogTitle = 'Nouvelle Classe';
      this.programInst = new ProgramInst({});

    }

    this.programInstForm = this.createProgramInstForm();
    this._unsubscribeAll = new Subject();
    this.programs = this._programInstService.programs;

    //console.log("prograams fel class add form");
    //console.log(this.programs);


  }

  ngOnInit(): void {

  }


 /* createProgramInstForm(): FormGroup {
    console.log("PROGERAMM");
    console.log(this.programInst);
    // if(this.programInst.id==null){
    return this._formBuilder.group({
      id: [this.programInst.id],
      programInstName: [this.programInst.programInstName],
      nbDaysProgInst: [this.programInst.nbDaysProgInst],
      location: [this.programInst.location],
      program: [this.programInst.program, Validators.required],
      beginDate: [moment()],
      //dateDebut: [this.programInst.dateDebut],

    });

    // }
      else{
         return this._formBuilder.group({
           id: [this.programInst.id],
           programInstName: [this.programInst.programInstName],
           nbDaysProgInst: [this.programInst.nbDaysProgInst],
           location: [this.programInst.location],
           program: [this.programInst.program, Validators.required],
           //dateDebut: [moment()],
           dateDebut: [new Date(this.programInst.dateDebut)],
     
         });
     
       }


  }*/

  createProgramInstForm(): FormGroup {
    if (this.programInst.id == null) {
      return new FormGroup({
        id: new FormControl(this.programInst.id),
        programInstName: new FormControl(this.programInst.programInstName),
        nbDaysProgInst: new FormControl(this.programInst.nbDaysProgInst),
        location: new FormControl(this.programInst.location),
        program: new FormControl(this.programInst.program),
        beginDate: new FormControl(moment()),
        endDate: new FormControl(moment()),
        // dateDebut: new FormControl(this.programInst.dateDebut),

      });
    }
    else {
      return new FormGroup({
        id: new FormControl(this.programInst.id),
        programInstName: new FormControl(this.programInst.programInstName),
        nbDaysProgInst: new FormControl(this.programInst.nbDaysProgInst),
        location: new FormControl(this.programInst.location),
        program: new FormControl(this.programInst.program),
        //dateDebut: new FormControl(moment()),
        beginDate: new FormControl(this.programInst.beginDate),
        endDate:new FormControl(this.programInst.endDate),
      });
    }

  }
  getProgramForm(event) {

    this._programInstService.program = event;
    this.programInst.nbDaysProgInst = event.nbDaysProg;
    this.programInst.programInstName = event.programName;
  }

}
