import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EditSessionService } from 'app/main/apps/academy/edit-session/edit-session.service';
import { Session } from 'app/main/apps/academy/add-session/session.model';
import { ClassRoom } from 'app/shared/models/classroom.model'
import { Institution } from 'app/shared/models/institution.model';

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
import { ActivatedRoute, Router } from '@angular/router';

registerLocaleData(localeFr, 'fr');

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditSessionComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;
  // @ViewChild('stepper2') stepper2: MatStepper;
  // @ViewChild('stepper') stepper: MatStepper;
  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  //institutionForm: FormGroup;
  enterpriseForm: FormGroup;
  institutionForm: FormGroup;


  // Vertical Stepper
  verticalStepperStep1: FormGroup;
  verticalStepperStep2: FormGroup;
  verticalStepperStep3: FormGroup;




  courseDateMaxHour: Date;
  courseDateMinHour: Date;
  events: any[] = [];
  cursusBeginDate: Date;
  cursusEndDate: Date;
  minSessionDuration: number = 45;

  //dateCourse: Date;
  beginHour: any;
  endHour: any;
  //datetotry: Date;

  courseDate: Date;
  courseBeginTime: Date;
  courseEndTime: Date;
  timeNotValid: boolean;
  programBeginDate: Date;
  programEndDate: Date;
  program: any;


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
  sessionId: number;
  sessionsByThemeDetail: any[];
  sessionsByProgram: any[];
  currentCity: any;
  themes: any[];
  modules: any[];
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
  freeDays: any[];
  isFreeDay: boolean;
  labelDisabled: boolean = true;
  session: Session;
  isDisabled: boolean = true;
  place: string;
  event: CalendarEventModel;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  // Private
  private _unsubscribeAll: Subject<any>;
  private sub: any;
  currentStep: any;
  buttonSuiv1Selected: boolean = false;
  buttonSuiv2Selected: boolean = false;
  buttonSuiv3Selected: boolean = false;
  buttonSuiv4Selected: boolean = false;
  buttonPrec2Selected: boolean = false;
  buttonPrec3Selected: boolean = false;
  buttonPrec4Selected: boolean = false;

  formErrorsStepper1 = {


    'program': '',
    'module': '',
    'theme': '',

    'themeDet': '',
    'courseSessionName': 'Invalide',
    'courseSessionBeginDate': 'Invalide',
    'courseSessionEndDate': 'Invalide',
    'courseSessionBeginTime': '',
    'courseSessionTime': ''

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
    'courseSessionBeginTime': {
      'required': "L'heure de début est requise",
      'pattern': "L 'heure doit être sous ce format aa:bb. Exp : 08:00 "

    },
    'courseSessionEndTime': {
      'required': "L'heure de fin est requise",
      'pattern': "L 'heure doit être sous ce format aa:bb. Exp : 08:00 "
    },
  }
  chosenClassroom: any;
  sessionClassroom: ClassRoom;
  sessionInstitution: Institution;
  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _addSessionService: EditSessionService, private route: ActivatedRoute,
    private _formBuilder: FormBuilder, private _matDialog: MatDialog,
    private translate: TranslateService, private dateAdapter: DateAdapter<Date>,
    private router: Router
  ) {

    this.sub = this.route.params.subscribe(params => {
      this.sessionId = Number(localStorage.getItem('sessionId'));
    
      this.session = new Session(JSON.parse(localStorage.getItem('session')));

      this.beginHour = this.session.sessionBeginDate.toTimeString().substring(0, 5)
      this.endHour = this.session.sessionEndDate.toTimeString().substring(0, 5)
     
      /*  this._addSessionService.getSessionsById(this.sessionId).then(() => {
         this.session = new Session(this._addSessionService.session);
      
         this.selectedTrainerHere = this.session.trainer;
         this.selectedThemeDet = this.session.themeDetailInstance;
         this.selectedModule = this.session.themeDetailInstance.moduleInstance;
         this.selectedTheme = this.session.themeDetailInstance.moduleInstance.themeInstance;
       }
       ); */
    });
    this.dateAdapter.setLocale('fr');
    this.courseDateMaxHour = new Date();
    this.courseDateMaxHour.setHours(23, 59, 59);



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


    this.sub = this.route.params.subscribe(params => {
      this.sessionId = Number(localStorage.getItem('sessionId'));
      this.session = new Session(JSON.parse(localStorage.getItem('session')));
     

      //this.sessionId = +params['id'];
      //  this._addSessionService.sessionId=this.sessionId;
      //  this._addSessionService.getSessionsById(this.sessionId).then(() => {
      //this.session = new Session(this._addSessionService.session);
      this._addSessionService.getEventBySessionId(this.sessionId).then(() => {

      });
      this._addSessionService.getFreeDays().then(() => {
        this.freeDays = this._addSessionService.freeDays;

      }
      );
      /*
       this._addSessionService.selectedDate = this.session.sessionBeginDate;
      
       switch (this._addSessionService.selectedDate.getDay()) {
         case 0: this._addSessionService.selectedDay = "DIMANCHE"; break;
         case 1: this._addSessionService.selectedDay = "LUNDI"; break;
         case 2: this._addSessionService.selectedDay = "MARDI"; break;
         case 3: this._addSessionService.selectedDay = "MERCREDI"; break;
         case 4: this._addSessionService.selectedDay = "JEUDI"; break;
         case 5: this._addSessionService.selectedDay = "VENDREDI"; break;
         case 6: this._addSessionService.selectedDay = "SAMEDI"; break;
       }
       setTimeout(() => {
         this._addSessionService.getTrainers().then(() => { this.allTrainers = this._addSessionService.trainers; });
       });*/

      this.selectedTrainerHere = this.session.trainer;
      this.selectedThemeDet = this.session.themeDetailInstance;
      this.selectedModule = this.session.themeDetailInstance.moduleInstance;
      this._addSessionService.selectedModule = this.selectedModule;
      this.selectedTheme = this.session.themeDetailInstance.moduleInstance.themeInstance;
      this.currentCity = this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location;
      this._addSessionService.currentCity = this.currentCity;



      /*setTimeout(() => {
        this._addSessionService.getInstitutions().then(() => {
          this.institutions = this._addSessionService.institutions;

        }
        );
      });*/

      this.courseBeginTime = new Date(this.session.sessionBeginDate);
      this.courseEndTime = new Date(this.session.sessionEndDate);

      //this.courseBeginTime.setHours(Number(this.beginHour.substring(0,2))) ;
      //this.courseBeginTime.setMinutes(Number(this.beginHour.substring(3,5))) ;



      this.program = this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance

      this.programBeginDate = this.program.beginDate;
      this.programEndDate = this.program.endDate;


      this._addSessionService.getSessionsByProgram(this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id).then(() => {
        this.sessionsByProgram = this._addSessionService.sessionsByProgram;

      }
      );

      //  });
    });

    this.courseDate = new Date(this.session.sessionBeginDate);
    this.courseDateMinHour = new Date(this.session.sessionBeginDate);
    this.courseDateMinHour.setHours(this.courseDate.getHours(), this.courseDate.getMinutes() + this.minSessionDuration);
    this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear(), this.courseDate.getMonth(), this.courseDate.getDate())

    this._addSessionService.onClassRoomsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(classRooms => {
        this.classRooms = classRooms;
      });
    this._addSessionService.onProgramsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(programs => {
        this.programs = programs;
      });
    this._addSessionService.onThemesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(themes => {
        this.themes = themes;
      });
    this._addSessionService.onModulesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(modules => {
        this.modules = modules;
      });
    this._addSessionService.onThemeDetailsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(themeDetails => {
        this.themeDetails = themeDetails;
      });
    this._addSessionService.onInstitutionsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(institutions => {
        this.institutions = institutions;
      });

    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this.createForm();

    /* this.horizontalStepperStep2 = this._formBuilder.group({
         maliste: ['']
     });*/

    if (this.session.classRoom != null) {
      this.horizontalStepperStep3 = this._formBuilder.group({

        institution: [this.session.classRoom.institution],
        classroom: [this.session.classRoom],
      });
    }
    else {
      this.horizontalStepperStep3 = this._formBuilder.group({

        institution: new FormControl({}),
        classroom: [this.session.classRoom],
      });
    }

    if (this.session.classRoom != null && this.session.classRoom != "") {
      this.sessionClassroom = this.session.classRoom;
      this.sessionInstitution = this.sessionClassroom.institution

      const toSelect = this.institutions.find(p => p.id == this.sessionInstitution.id);
      this.horizontalStepperStep3.get('institution').setValue(toSelect);
    }

    /*    
        this.horizontalStepperStep1.valueChanges
          .subscribe(data => this.onValueChangedStepper1(data));*/

    //this.stepper.selected.completed = false;
    /*
    this.sessionClassroom=this.session.classRoom;
    this.sessionInstitution= this.sessionClassroom.institution
  

    if (this.sessionInstitution !== undefined)
    {
    const toSelect = this.institutions.find(p => p.id == this.sessionInstitution.id);
    this.horizontalStepperStep3.get('institution').setValue(toSelect);
    }
    */


    /*
    if (this.sessionClassroom !== undefined)
    {
    const toSelect = this.classRooms.find(p => p.id == this.sessionClassroom.id);
    this.horizontalStepperStep3.get('classroom').setValue(this.sessionClassroom);
    
    }
    */



  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.session = this._addSessionService.session;
  }

  createForm(): FormGroup {

    const time = "[0-9]{2}:[0-9]{2}"

    return this._formBuilder.group({
      program: [{ value: this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName + " - " + this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location, disabled: true }, Validators.required],
      module: [{ value: this.session.themeDetailInstance.moduleInstance.moduleInstanceName, disabled: true }, Validators.required],
      theme: [{ value: this.session.themeDetailInstance.moduleInstance.themeInstance.themeInstName, disabled: true }, Validators.required],
      themeDet: [{ value: this.session.themeDetailInstance.themeDetailInstName, disabled: true }, Validators.required],
      courseSessionName: [this.session.sessionName, Validators.required],
      //courseSessionBeginDate: [new Date(this.session.sessionBeginDate), Validators.required],
      //courseSessionEndDate: [new Date(this.session.sessionEndDate), Validators.required],

      courseSessionDate: [new Date(this.session.sessionBeginDate), Validators.required],
      courseSessionBeginTime: [this.beginHour, [Validators.required, Validators.pattern(time)]],
      courseSessionEndTime: [this.endHour, [Validators.required, Validators.pattern(time)]],


    });
  }

  selectChoice(event) {
   
  }
  addTime(event: MatDatepickerInputEvent<Date>) {
    // this.times.push(event.value);
   
    //this.courseBeginTime = this.times[this.events.length - 1];
    this.beginHour = this.horizontalStepperStep1.getRawValue().courseSessionBeginTime
   
    //this.courseBeginTime=new Date();
    this.courseBeginTime.setHours(Number(this.beginHour.substring(0, 2)));
    this.courseBeginTime.setMinutes(Number(this.beginHour.substring(3, 5)));
    this.checkTime();


  }
  checkTime() {
    this.endHour = this.horizontalStepperStep1.getRawValue().courseSessionEndTime
    this.timeNotValid = false;

    this.courseEndTime = new Date(this.courseDate);
    this.courseEndTime.setHours(Number(this.endHour.substring(0, 2)));
    this.courseEndTime.setMinutes(Number(this.endHour.substring(3, 5)));

    if (this.courseEndTime.getTime() < this.courseBeginTime.getTime()) {
      this.timeNotValid = true;
    }
    /*
    //assign the date and beginHour - endHour to the session corresponding fields
    this.session.sessionBeginDate=new Date (this.courseDate)
    this.session.sessionEndDate=new Date (this.courseDate)
    this.session.sessionBeginDate.setHours(this.courseBeginTime.getHours(), this.courseBeginTime.getMinutes());
    this.session.sessionEndDate.setHours(this.courseEndTime.getHours(), this.courseEndTime.getMinutes());
    
    */


  }
  addDate(event: MatDatepickerInputEvent<Date>) {
    this.isFreeDay = false;
    this._addSessionService.deselectContacts();
    this.testDate = false;

    this.events.push(event.value);
    this.courseDate = this.events[this.events.length - 1];
 

    this.sessionsByProgram.forEach(session => {
      let d = new Date(session.sessionBeginDate);
      if (this.courseDate.toDateString() === d.toDateString()) {
        this.testDate = true;
      }
    });
    this.freeDays.forEach(day => {
      let start = new Date(day.start);
      let end = new Date(day.end);

      if ((this.courseDate.toDateString() === end.toDateString()) || (this.courseDate.toDateString() === start.toDateString())) {
        this.isFreeDay = true;
      }
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.isFreeDay = false;
    this._addSessionService.deselectContacts();
    this.testDate = false;
    this.events.push(event.value);
    this.courseDate = this.events[this.events.length - 1];
    this.courseDateMinHour = this.events[this.events.length - 1];
    this.courseDateMinHour.setHours(this.courseDate.getHours(), this.courseDate.getMinutes() + this.minSessionDuration);
    this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear(), this.courseDate.getMonth(), this.courseDate.getDate())


    this.sessionsByProgram.forEach(session => {
      let d = new Date(session.sessionBeginDate);

      if ((session.id != this.sessionId) && (this.courseDate.toDateString() === d.toDateString())) {

        this.testDate = true;
      }


    });
    this.freeDays.forEach(day => {
      let start = new Date(day.start);
      let end = new Date(day.end);

      if ((this.courseDate.toDateString() === end.toDateString()) || (this.courseDate.toDateString() === start.toDateString())) {
        this.isFreeDay = true;

      }


    });
   
  }

  disableLabel1(): void {
  }

  selectInstitution(institution): void {
    this.selectedClassRoom = null;
    this._addSessionService.getClassRooms();
    this.classRooms = this._addSessionService.classRooms;
    this.chosenInstitutionName = this.currentInstitution;
    this._addSessionService.chosenInstitutionId = institution.id;
    this.filteredClassrooms = [];
    this.classRooms.forEach(contact => {
      if (contact.institution.id == institution.id) {
        if (!this.filteredClassrooms.includes(contact))
          this.filteredClassrooms.push(contact);
      }

    });

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
    this.buttonSuiv2Selected = true;
    this.session.sessionName = this.horizontalStepperStep1.value.courseSessionName;

    //assign the date and beginHour - endHour to the session corresponding fields
    /*this.session.sessionBeginDate = new Date(this.courseDate)
    this.session.sessionEndDate = new Date(this.courseDate)
    this.session.sessionBeginDate.setHours(this.courseBeginTime.getHours(), this.courseBeginTime.getMinutes());
    this.session.sessionEndDate.setHours(this.courseEndTime.getHours(), this.courseEndTime.getMinutes());
    */
    this.session.trainer = this.selectedTrainer;
    this.session.themeDetailInstance = this.selectedThemeDet;



    setTimeout(() => {
      this._addSessionService.getInstitutions().then(() => {
        this.institutions = this._addSessionService.institutions;

      }
      );
    });

  }

  sendDate(): void {
    let pl = JSON.parse(this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
    if (pl != null) {
      this.place = pl.name;
    }
    this.session.sessionBeginDate = new Date(this.courseDate)
    this.session.sessionEndDate = new Date(this.courseDate)
    this.session.sessionBeginDate.setHours(this.courseBeginTime.getHours(), this.courseBeginTime.getMinutes());
    this.session.sessionEndDate.setHours(this.courseEndTime.getHours(), this.courseEndTime.getMinutes());
 
    this._addSessionService.selectedDate = this.horizontalStepperStep1.value.courseSessionDate;
    this._addSessionService.selectedEndDate = this.session.sessionEndDate;
    this._addSessionService.selectedBeginDate = this.session.sessionBeginDate;
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

    this.buttonSuiv3Selected = true;
    if (this.currentClassroom != null) {
      this.session.classRoom = this.currentClassroom;
    }
  }

  finishHorizontalStepper(): void {





    setTimeout(() => {
      this._addSessionService.updateCourseSessionAndEvent(this.session).then(() => {
        this._addSessionService.getEvents();

        localStorage.setItem('sessionId', this.session.id.toString());
        localStorage.setItem('session', JSON.stringify(this.session));
        this.router.navigate(['/apps/academy/allSessions']);
        //window.location.reload();
      });
    });



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


}

