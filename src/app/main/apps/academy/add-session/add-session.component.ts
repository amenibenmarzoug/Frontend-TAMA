import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AddSessionService } from 'app/main/apps/academy/add-session/add-session.service';
import { Session } from 'app/main/apps/academy/add-session/session.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { takeUntil } from 'rxjs/operators';
import { CalendarEventModel } from '../../calendar/event.model';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

registerLocaleData(localeFr, 'fr');

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AddSessionComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;
  // @ViewChild('stepper2') stepper2: MatStepper;
  // @ViewChild('stepper') stepper: MatStepper;
  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;

  // Vertical Stepper
  verticalStepperStep1: FormGroup;
  verticalStepperStep2: FormGroup;
  verticalStepperStep3: FormGroup;
  institutionForm:FormGroup;


  dateCourse: Date;
  beginHour: any;
  endHour: any;
  datetotry: Date;

  courseDate: Date;
  courseDateMaxHour: Date;
  courseDateMinHour: Date;
  events: any[] = [];
  cursusBeginDate: Date;
  cursusEndDate: Date;
  minSessionDuration: number = 45;


  classRooms: any[];
  institutions: any[];
  currentInstitution: string;
  currentClassroom: string;
  filteredClassrooms: any[] = [];
  //filteredPrograms: any[] = [];
  filteredThemes: any[] = [];
  filteredModules: any[] = [];
  filteredThemeDetails: any[] = [];
  programs: any[];
  sessionsByThemeDetail: any[];
  sessionsByProgram: any[];
  currentCity: any;
  themes: any[];
  modules: any[];
  freeDays:any[];
  isFreeDay:boolean;
  themeDetails: any[];
  testDate: boolean;
  chosenInstitutionName: string;
  selectedThemeDet: any;
  selectedTheme: any;
  selectedClassRoom: any
  allTrainers: any[] = [];
  selectedTrainerHere: any;
  selectedTrainers: any[] = [];
  selectedTrainer: any;
  selectedModule: any;
  session: Session;
  isDisabled: boolean = true;
  event: CalendarEventModel;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  // Private
  private _unsubscribeAll: Subject<any>;
  currentStep: any;
  buttonSuiv1Selected: boolean = false;
  buttonSuiv2Selected: boolean = false;
  buttonSuiv3Selected: boolean = false;
  buttonSuiv4Selected: boolean = false;
  buttonPrec2Selected: boolean = false;
  buttonPrec3Selected: boolean = false;
  buttonPrec4Selected: boolean = false;

  place:string;

  formErrorsStepper1 = {


    'program': '',
    'module': '',
    'theme': '',

    'themeDet': '',
    'courseSessionName': '',
    'courseSessionBeginDate': '',
    'courseSessionEndDate': '',

  };

  validationMessagesStepper1 = {

    'program': {
      'required': 'Le programme est requis.',

    },
    'module': {
      'required': 'Le module est requis.',

    },
    'theme': {
      'required': 'Le theme est requis.',

    },

    'themeDet': {
      'required': 'Le thème de la journée est requis',

    },
    'courseSessionName': {
      'required': 'Le titre de la séance est requis',

    },
    'courseSessionBeginDate': {
      'required': 'La date de début est requise',

    },
    'courseSessionEndDate': {
      'required': 'La date de fin est requise',

    },
  }
  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _addSessionService: AddSessionService,
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('fr');
    this.courseDateMaxHour = new Date();
    this.courseDateMaxHour.setHours(23, 59, 59);
    this.events.push(new Date());
    this.courseDate = this.events[this.events.length - 1];
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

    /*this._addSessionService.onInstitutionsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(institutions => {
        this.institutions = institutions;
        console.log("institutions");
        console.log(this.institutions);
      });*/
    this.selectedTrainerHere = null;
    this._addSessionService.getFreeDays().then(() => {
      this.freeDays = this._addSessionService.freeDays;

    }
    );
    this._addSessionService.onClassRoomsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(classRooms => {
        this.classRooms = classRooms;
        console.log("classRooms");
        console.log(this.classRooms);
      });
    this._addSessionService.onProgramsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(programs => {
        this.programs = programs;
        console.log("programs");
        console.log(this.programs);
      });
    this._addSessionService.onThemesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(themes => {
        this.themes = themes;
        console.log("themes");
        console.log(this.themes);
      });
    this._addSessionService.onModulesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(modules => {
        this.modules = modules;
        console.log("modules");
        console.log(this.modules);
      });
    this._addSessionService.onThemeDetailsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(themeDetails => {
        this.themeDetails = themeDetails;
        console.log("themeDetails");
        console.log(this.themeDetails);
      });
    console.log("SELECTED TRAINERS IN INIT")
    console.log(this._addSessionService.selectedContacts);
    // Reactive Form
    /*this.form = this._formBuilder.group({
      company: [
        {
          value: 'Google',
          disabled: true
        }, Validators.required
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required]
    });*/

    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({
      program: ['', Validators.required],
      module: ['', Validators.required],
      theme: ['', Validators.required],
      themeDet: ['', Validators.required],
      courseSessionName: ['', Validators.required],
      courseSessionBeginDate: ['', Validators.required],
      courseSessionEndDate: ['', Validators.required],

    });

    /* this.horizontalStepperStep2 = this._formBuilder.group({
         maliste: ['']
     });*/

     
     
    this.horizontalStepperStep3 = new FormGroup({
     
    })

    this.institutionForm=this._formBuilder.group({
      institution: [this.session.classRoom.institution.institutionName, Validators.required],
      classroom: [this.session.classRoom.classRoomName, Validators.required],});

    // Vertical Stepper form stepper
    this.verticalStepperStep1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.verticalStepperStep2 = this._formBuilder.group({
      address: ['', Validators.required]
    });

    this.verticalStepperStep3 = this._formBuilder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    });

    this.horizontalStepperStep1.valueChanges
      .subscribe(data => this.onValueChangedStepper1(data));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.isFreeDay=false;
    this._addSessionService.deselectContacts();
    this.testDate = false;
    this.events.push(event.value);
    this.courseDate = this.events[this.events.length - 1];
    this.courseDateMinHour = this.events[this.events.length - 1];
    this.courseDateMinHour.setHours(this.courseDate.getHours(), this.courseDate.getMinutes() + this.minSessionDuration);
    console.log("couerse min dateeee"); console.log(this.courseDateMinHour);
    this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear(), this.courseDate.getMonth(), this.courseDate.getDate())


    this.sessionsByProgram.forEach(session => {
      let d = new Date(session.sessionBeginDate);

      if (this.courseDate.toDateString() === d.toDateString()) {
        this.testDate = true;
      }


    });
    this.freeDays.forEach(day => {
      let start = new Date(day.start);
      let end = new Date(day.end);

      if ((this.courseDate.toDateString() === end.toDateString())||(this.courseDate.toDateString() === start.toDateString())) {
        this.isFreeDay=true;
        
      }


    });
    
       //console.log("courseDate changeddd");
    //console.log(this.courseDate);

    // console.log("courseDate Max changed");
    // console.log(this.courseDateMaxHour) ; 
  }


  selectInstitution(institutionId): void {
    this.selectedClassRoom = null;
    console.log("chosen institution");
    this._addSessionService.getClassRooms();
    console.log(this._addSessionService.classRooms);
    this.classRooms = this._addSessionService.classRooms;
    console.log(this.classRooms);
    this.chosenInstitutionName = this.currentInstitution;
    this._addSessionService.chosenInstitutionId = institutionId;
    console.log(this.currentInstitution);
    this.filteredClassrooms = [];
    this.classRooms.forEach(contact => {
      if (contact.institution.id == institutionId) {
        if (!this.filteredClassrooms.includes(contact))
          this.filteredClassrooms.push(contact);
      }

    })

  }

  selectProgram(program): void {
    this.selectedTheme = null;
    this.filteredThemes = [];
    this.horizontalStepperStep1.value.theme = null;
    this.themes.forEach(theme => {
      if (theme.programInstance.id == program.id) {
        if (!this.filteredThemes.includes(theme))
          this.filteredThemes.push(theme);
      }

    });
    this.currentCity = program.location;
    this._addSessionService.currentCity = this.currentCity;
    console.log(program);
    console.log(this.filteredThemes);
    this._addSessionService.getInstitutions();
    this.institutions = this._addSessionService.institutions;
    this._addSessionService.getSessionsByProgram(program.id).then(() => {
      this.sessionsByProgram = this._addSessionService.sessionsByProgram;

    }
    );

  }

  selectTheme(theme): void {
    this.selectedModule = null;
    this.filteredModules = [];
    this.selectedTheme = theme;
    this.modules.forEach(module => {
      if (module.themeInstance.id == theme.id) {
        if (!this.filteredModules.includes(module))
          this.filteredModules.push(module);
      }

    });
  }

  selectModule(module): void {
    this.selectedThemeDet = null;
    //this.onValueChangedStepper1();
    this.filteredThemeDetails = [];
    this._addSessionService.selectedModule = module;
    this.selectedModule = module;
    this.themeDetails.forEach(themeDetail => {
      if (themeDetail.moduleInstance.id == module.id) {
        if (!this.filteredThemeDetails.includes(themeDetail))
          this.filteredThemeDetails.push(themeDetail);
      }

    });
  }

  selectThemeDetail(themeDet): void {

    //this._addSessionService.chosenClassRoom = event;
    this.selectedThemeDet = themeDet;
    this._addSessionService.getSessionsByThemeDetail(themeDet.id).then(() => {
      this.sessionsByThemeDetail = this._addSessionService.sessionsByThemeDetail;

    }
    );
  }

  selectClassroom(event): void {
    this.selectedClassRoom = event;
    this._addSessionService.chosenClassRoom = event;
    this.currentClassroom = event;

  }

  disableButton(): any {
    this.selectedTrainerHere = null;
    if (this._addSessionService.selectedContacts.length == 0)
      return true;
    else {
      this.selectedTrainerHere = this._addSessionService.selectedContacts;
      return false;
    }
  }

  selectedTrainerButton(): void {
    this._addSessionService.getClassRooms();
    this._addSessionService.selectedContacts.forEach(select => {
      this.selectedTrainers.push(select.toString());

    });

    this._addSessionService.trainers.forEach(trainer => {

      if (this.selectedTrainers.includes(trainer.id.toString())) {
        this.selectedTrainer = trainer;

      }

    });
    this.buttonSuiv2Selected = true
    this.session = new Session({});
    this.session.sessionName = this.horizontalStepperStep1.value.courseSessionName;
    this.session.sessionBeginDate = this.horizontalStepperStep1.value.courseSessionBeginDate;
    this.session.sessionEndDate = this.horizontalStepperStep1.value.courseSessionEndDate;
    this.session.trainer = this.selectedTrainer;
    this.session.themeDetailInstance = this.selectedThemeDet;


    setTimeout(() => {
      this._addSessionService.getInstitutions().then(() => {
        this.institutions = this._addSessionService.institutions;

      }
      );
    });

    console.log(this.institutions);
  }

  sendDate(): void {

    console.log("prog prog prog");
    console.log(this.horizontalStepperStep1.value.program.place);
    let pl=JSON.parse(this.horizontalStepperStep1.value.program.place);
    console.log(pl)
    if(pl!=null){
      this.place=pl.name;
    }
    this._addSessionService.selectedDate = this.horizontalStepperStep1.value.courseSessionBeginDate;
    console.log(this._addSessionService.selectedDate);
    console.log(this._addSessionService.selectedDate.getDay());
    switch (this._addSessionService.selectedDate.getDay()) {
      case 0: this._addSessionService.selectedDay = "DIMANCHE"; break;
      case 1: this._addSessionService.selectedDay = "LUNDI"; break;
      case 2: this._addSessionService.selectedDay = "MARDI"; break;
      case 3: this._addSessionService.selectedDay = "MERCREDI"; break;
      case 4: this._addSessionService.selectedDay = "JEUDI"; break;
      case 5: this._addSessionService.selectedDay = "VENDREDI"; break;
      case 6: this._addSessionService.selectedDay = "SAMEDI"; break;
    }
    this.buttonSuiv1Selected = true;
    console.log(this._addSessionService.selectedDay);
    setTimeout(() => {
      this._addSessionService.getTrainers().then(() => { this.allTrainers = this._addSessionService.trainers; });
    });

  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Finish the horizontal stepper
   */

  disableFirstButton(): any {
    //this.horizontalStepperStep1.valueChanges
  }

  sendClassroom(): void {

    this.session.classRoom = this.currentClassroom;
    this.buttonSuiv3Selected = true;
  }

  finishHorizontalStepper(): void {

    setTimeout(() => {
      this._addSessionService.saveCourseSessionAndEvent(this.session).then(() => {
        this._addSessionService.getEvents();
        window.location.reload();
      });
    }, 5);

  }

  PrecButton2(): void {
    this.buttonSuiv1Selected = false;
  }

  PrecButton3(): void {
    this.buttonSuiv2Selected = false;
  }

  PrecButton4(): void {
    this.buttonSuiv3Selected = false;
  }


  onValueChangedStepper1(data?: any) {
    if (!this.horizontalStepperStep1) { return; }
    const form = this.horizontalStepperStep1;
    for (const field in this.formErrorsStepper1) {
      if (this.formErrorsStepper1.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorsStepper1[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessagesStepper1[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorsStepper1[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  /**
   * Finish the vertical stepper
   */
  finishVerticalStepper(): void {
    alert('You have finished the vertical stepper!');
  }
}