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
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    console.log("DATE");
    console.log(this.programInstForm.value.date.value);
    const ctrlValue = this.programInstForm.value.date.value;
    ctrlValue.year(normalizedYear.year());
    this.programInstForm.value.date.setValue(ctrlValue);

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.programInstForm.value.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.programInstForm.value.date.setValue(ctrlValue);
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
      this.dialogTitle = 'Modifier le Programme Dédié';
      //console.log("_data.programInst");
      //console.log(_data.programInst);
      this.programInst = _data.programInst;
      this._programInstService.program = this.programInst.program;

    }
    else {

      this.dialogTitle = 'Nouveau Programme Dédié';
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


  createProgramInstForm(): FormGroup {

    return this._formBuilder.group({
      id: [this.programInst.id],
      programInstName: [this.programInst.programInstName],
      nbDaysProgInst: [this.programInst.nbDaysProgInst],
      location: [this.programInst.location],
      program: [this.programInst.program, Validators.required],
      date: [moment()],

    });

  }
  getProgramForm(event) {

    this._programInstService.program = event;
    this.programInst.nbDaysProgInst = event.nbDaysProg;
    this.programInst.programInstName = event.programName;
  }

}
