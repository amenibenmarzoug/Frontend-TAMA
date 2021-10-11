import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EditSessionService } from 'app/main/apps/academy/edit-session/edit-session.service';
import { Session } from 'app/main/apps/academy/add-session/session.model';
import {MyClasses} from 'app/main/apps/classrooms/classrooms.model'
import { Institution } from 'app/shared/models/institution.model';

import { CursusCoursessService } from 'app/main/apps/cursus/courses/coursess.service';
import { CursusCoursesComponent } from 'app/main/apps/cursus/courses/courses.component';
import { TokenStorageService } from 'app/main/pages/authentication/common-authentication/token-storage.service';
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
import { ActivatedRoute } from '@angular/router';

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
  institutionForm:FormGroup;


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
   courseBeginTime: Date ; 
   courseEndTime: Date ; 
   timeNotValid: boolean ; 
   programBeginDate: Date;
   programEndDate: Date;
   program : any ; 


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
  freeDays:any[];
  isFreeDay:boolean;
  labelDisabled: boolean = true;
  session: Session;
  isDisabled: boolean = true;
  place:string;
  event: CalendarEventModel;
  alertDialog: MatDialogRef<AlertDialogComponent>;
  // Private
  private _unsubscribeAll: Subject<any>;
  private sub: any;
  currentStep: any;
  buttonSuiv1Selected:boolean=false;
  buttonSuiv2Selected:boolean=false;
  buttonSuiv3Selected:boolean=false;
  buttonSuiv4Selected:boolean=false;
  buttonPrec2Selected:boolean=false;
  buttonPrec3Selected:boolean=false;
  buttonPrec4Selected:boolean=false;

  formErrorsStepper1 = {


    'program': '',
    'module': '',
    'theme': '',

    'themeDet': '',
    'courseSessionName': 'Invalide',
    'courseSessionBeginDate': 'Invalide',
    'courseSessionEndDate': 'Invalide',
    'courseSessionBeginTime': '',
    'courseSessionTime':''

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

    },
    'courseSessionEndTime': {
      'required': "L'heure de fin est requise",

    },
  }
  chosenClassroom: any;
  sessionClassroom: MyClasses;
  sessionInstitution: Institution;
  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _addSessionService: EditSessionService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private _matDialog: MatDialog, private translate: TranslateService, private dateAdapter: DateAdapter<Date>
  ) {

    this.sub = this.route.params.subscribe(params => {
      this.sessionId = Number(localStorage.getItem('sessionId'));
      console.log("SESSION ID INIT");
      console.log(this.sessionId);
      this.session = new Session(JSON.parse(localStorage.getItem('session')));
      console.log("THIS SESSION");
      console.log(this.session);

      this.beginHour=this.session.sessionBeginDate.toTimeString().substring(0,5)
      this.endHour=this.session.sessionEndDate.toTimeString().substring(0,5)
      console.log("THIS begin Hour");
      console.log(this.beginHour);
      console.log("THIS end hour");
      console.log(this.endHour);
      /*  this._addSessionService.getSessionsById(this.sessionId).then(() => {
         this.session = new Session(this._addSessionService.session);
         console.log("THIS SESSION");
         console.log(this.session);
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
      console.log("SESSION ID INIT");
      console.log(this.sessionId);
      this.session = new Session(JSON.parse(localStorage.getItem('session')));
      console.log("THIS SESSION");
      console.log(this.session);

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
     /* console.log("SELECTED DAY IN CONSTRUCTOR");
      this._addSessionService.selectedDate = this.session.sessionBeginDate;
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
      console.log("SELECTED DAY IN CONSTRUCTOR");
      console.log(this._addSessionService.selectedDay);
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

      this.courseBeginTime=new Date(this.session.sessionBeginDate);
      this.courseEndTime=new Date (this.session.sessionEndDate);
     
      //this.courseBeginTime.setHours(Number(this.beginHour.substring(0,2))) ;
      //this.courseBeginTime.setMinutes(Number(this.beginHour.substring(3,5))) ;
      


      this.program=this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance
      
      this.programBeginDate=this.program.beginDate;
      this.programEndDate=this.program.endDate;
      console.log("variable intermediaire : program begin end date")
      console.log(this.programBeginDate)
      console.log(this.programEndDate)


      this._addSessionService.getSessionsByProgram(this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.id).then(() => {
        this.sessionsByProgram = this._addSessionService.sessionsByProgram;

      }
      );

      //  });
    });

    this.courseDate=new Date(this.session.sessionBeginDate ); 
    this.courseDateMinHour=new Date (this.session.sessionBeginDate ); 
    this.courseDateMinHour.setHours(this.courseDate.getHours(), this.courseDate.getMinutes()+this.minSessionDuration); 
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

    this.horizontalStepperStep3 = this._formBuilder.group({
      institution: [this.session.classRoom.institution],
      classroom: [this.session.classRoom],
    });
    console.log("Horizentaaalll")
    console.log("Horizentaaalll")
    console.log(this.horizontalStepperStep3.getRawValue())

    this.sessionClassroom=this.session.classRoom;
    this.sessionInstitution= this.sessionClassroom.institution

    const toSelect = this.institutions.find(p => p.id == this.sessionInstitution.id);
    this.horizontalStepperStep3.get('institution').setValue(toSelect);
    console.log("instititution from stepper*****")
    console.log(this.horizontalStepperStep3.get('institution').value)

/*    
    this.horizontalStepperStep1.valueChanges
      .subscribe(data => this.onValueChangedStepper1(data));*/

    //this.stepper.selected.completed = false;
    /*
    this.sessionClassroom=this.session.classRoom;
    this.sessionInstitution= this.sessionClassroom.institution
    console.log("onInit")
    console.log("this.Classroommmm in init")
    console.log(this.sessionClassroom)

    if (this.sessionInstitution !== undefined)
    {
    const toSelect = this.institutions.find(p => p.id == this.sessionInstitution.id);
    this.horizontalStepperStep3.get('institution').setValue(toSelect);
    console.log("instititution *****")
    console.log(this.horizontalStepperStep3.get('institution').value)
    }
    */


    /*
    if (this.sessionClassroom !== undefined)
    {
    const toSelect = this.classRooms.find(p => p.id == this.sessionClassroom.id);
    this.horizontalStepperStep3.get('classroom').setValue(this.sessionClassroom);
    console.log("classroom *****")
    console.log(toSelect)
    console.log(this.horizontalStepperStep3.get('classroom').value)
    console.log("Horizentaaalll")
    console.log(this.horizontalStepperStep3.getRawValue())

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


    return this._formBuilder.group({
      program: [{ value: this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName+ " - " + this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location, disabled: true }, Validators.required],
      module: [{ value: this.session.themeDetailInstance.moduleInstance.moduleInstanceName, disabled: true }, Validators.required],
      theme: [{ value: this.session.themeDetailInstance.moduleInstance.themeInstance.themeInstName, disabled: true }, Validators.required],
      themeDet: [{ value: this.session.themeDetailInstance.themeDetailInstName, disabled: true }, Validators.required],
      courseSessionName: [this.session.sessionName, Validators.required],
      //courseSessionBeginDate: [new Date(this.session.sessionBeginDate), Validators.required],
      //courseSessionEndDate: [new Date(this.session.sessionEndDate), Validators.required],

      courseSessionDate: [new Date(this.session.sessionBeginDate), Validators.required],
      courseSessionBeginTime: [this.beginHour, Validators.required],
      courseSessionEndTime: [this.endHour, Validators.required],


    });
  }

  selectChoice(event){
    console.log("choice");

    console.log(event);
  }
  addTime(event: MatDatepickerInputEvent<Date>){
    //console.log("timeeee");
   // this.times.push(event.value);
    //console.log(event.value)
    //this.courseBeginTime = this.times[this.events.length - 1];
    this.beginHour = this.horizontalStepperStep1.getRawValue().courseSessionBeginTime
    console.log("courseTime");
    console.log(this.beginHour)
    console.log(typeof this.beginHour);
    //this.courseBeginTime=new Date();
    this.courseBeginTime.setHours(Number(this.beginHour.substring(0,2))) ;
    this.courseBeginTime.setMinutes(Number(this.beginHour.substring(3,5))) ;
    console.log(this.courseBeginTime);
    this.checkTime(); 
    

  }
  checkTime(){
    this.endHour=this.horizontalStepperStep1.getRawValue().courseSessionEndTime
    this.timeNotValid= false ; 

    this.courseEndTime=new Date(this.courseDate);
    this.courseEndTime.setHours(Number(this.endHour.substring(0,2))) ;
    this.courseEndTime.setMinutes(Number(this.endHour.substring(3,5))) ;

    console.log(this.courseEndTime);
    console.log(this.courseBeginTime);
    if (this.courseEndTime.getTime()< this.courseBeginTime.getTime()){
      console.log("end time less than begin date")
      this.timeNotValid=true;
    }
    console.log("time not valid")
    console.log(this.timeNotValid)
    /*
    //assign the date and beginHour - endHour to the session corresponding fields
    this.session.sessionBeginDate=new Date (this.courseDate)
    this.session.sessionEndDate=new Date (this.courseDate)
    this.session.sessionBeginDate.setHours(this.courseBeginTime.getHours(), this.courseBeginTime.getMinutes());
    this.session.sessionEndDate.setHours(this.courseEndTime.getHours(), this.courseEndTime.getMinutes());
    console.log("session date after update")
    console.log(this.session.sessionBeginDate)
    console.log(this.session.sessionEndDate)
    */
    

  }
  addDate(event: MatDatepickerInputEvent<Date>) {
    this.isFreeDay=false;
    this._addSessionService.deselectContacts();
    this.testDate = false;

    this.events.push(event.value);
    this.courseDate = this.events[this.events.length - 1];
    console.log("courseDate");
    console.log(this.courseDate)
    
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

      if ((session.id != this.sessionId) && (this.courseDate.toDateString() === d.toDateString())) {

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

  disableLabel1(): void {
    console.log(this.stepper.steps);
  }

  selectInstitution(institution): void {
    this.selectedClassRoom = null;
    console.log("chosen institution");
    this._addSessionService.getClassRooms();
    console.log(this._addSessionService.classRooms);
    this.classRooms = this._addSessionService.classRooms;
    console.log(this.classRooms);
    this.chosenInstitutionName = this.currentInstitution;
    this._addSessionService.chosenInstitutionId = institution.id;
    console.log(this.currentInstitution);
    this.filteredClassrooms = [];
    this.classRooms.forEach(contact => {
      if (contact.institution.id == institution.id) {
        if (!this.filteredClassrooms.includes(contact))
          this.filteredClassrooms.push(contact);
      }

    });
    console.log(this.classRooms);
    console.log(this.filteredClassrooms);


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
    //console.log("BUTTON")
    // console.log(document.getElementById('button1'));
    this._addSessionService.getClassRooms();
    this._addSessionService.selectedContacts.forEach(select => {
      this.selectedTrainers.push(select.toString());

    });

    console.log("selected selectedTrainers");
    console.log(this.selectedTrainers);
    console.log(this._addSessionService.trainers);

    this._addSessionService.trainers.forEach(trainer => {

      if (this.selectedTrainers.includes(trainer.id.toString())) {
        this.selectedTrainer = trainer;

      }

    });
    this.buttonSuiv2Selected=true;
    this.session.sessionName = this.horizontalStepperStep1.value.courseSessionName;

    //assign the date and beginHour - endHour to the session corresponding fields
    this.session.sessionBeginDate=new Date (this.courseDate)
    this.session.sessionEndDate=new Date (this.courseDate)
    this.session.sessionBeginDate.setHours(this.courseBeginTime.getHours(), this.courseBeginTime.getMinutes());
    this.session.sessionEndDate.setHours(this.courseEndTime.getHours(), this.courseEndTime.getMinutes());
    console.log("session date after update")
    console.log(this.session.sessionBeginDate)
    console.log(this.session.sessionEndDate)
    
    this.session.trainer = this.selectedTrainer;
    this.session.themeDetailInstance = this.selectedThemeDet;

    

    setTimeout(() => {
      this._addSessionService.getInstitutions().then(() => {
        this.institutions = this._addSessionService.institutions;

      }
      );
    });
   
    console.log(this.horizontalStepperStep3.getRawValue());
  }

  sendDate(): void {
   
    console.log("STEPS");
    console.log(this.stepper.steps);
    console.log("prog prog prog");

    let pl=JSON.parse(this.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.place);
    console.log(pl)
    if(pl!=null){
      this.place=pl.name;
    }
    this._addSessionService.selectedDate = this.horizontalStepperStep1.value.courseSessionDate;
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
    this.buttonSuiv1Selected=true;
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
    
    this.buttonSuiv3Selected=true;
    console.log(this.currentClassroom)
    if(this.currentClassroom != null )
    {
    this.session.classRoom = this.currentClassroom;
    }
  }

  finishHorizontalStepper(): void {





    setTimeout(() => {
      this._addSessionService.updateCourseSessionAndEvent(this.session).then(() => {
        this._addSessionService.getEvents();
        window.location.reload();
      });
    });



  }
  PrecButton2(): void {
    this.buttonSuiv1Selected=false;
  }

  PrecButton3(): void {
    this.buttonSuiv2Selected=false;
  }

  PrecButton4(): void {
    this.buttonSuiv3Selected=false;
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

