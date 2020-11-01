import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AddSessionService } from 'app/main/apps/academy/add-session/add-session.service';
import { Session } from 'app/main/apps/academy/add-session/session.model';

import { CursusCoursessService } from 'app/main/apps/cursus/courses/coursess.service';
import { CursusCoursesComponent } from 'app/main/apps/cursus/courses/courses.component';
import { TokenStorageService } from 'app/main/pages/authentication/common-authentication/token-storage.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { takeUntil } from 'rxjs/operators';
import { CalendarEventModel } from '../../calendar/event.model';



const USER_KEY = 'auth-user';
@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit, OnDestroy {
  form: FormGroup;

  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;

  // Vertical Stepper
  verticalStepperStep1: FormGroup;
  verticalStepperStep2: FormGroup;
  verticalStepperStep3: FormGroup;

  dateCourse: Date;
  beginHour: any;
  endHour: any;
  datetotry: Date;
  courseDate: Date;
  courseDateMaxHour: Date;
  events: any[] = [];
  cursusBeginDate: Date;
  cursusEndDate: Date;
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
  themes: any[];
  modules: any[];
  themeDetails: any[];
  chosenInstitutionName: string;
  selectedThemeDet: any;
  selectedTrainers: any[] = [];
  selectedTrainer: any;
  session: Session;
  event: CalendarEventModel;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _addSessionService: AddSessionService, private _formBuilder: FormBuilder
  ) {
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

    this._addSessionService.onInstitutionsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(institutions => {
        this.institutions = institutions;
        console.log("institutions");
        console.log(this.institutions);
      });
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
    // Reactive Form
    this.form = this._formBuilder.group({
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
    });

    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({
      //id      : [this.contact.id],
      courseSessionName: ['', Validators.required],

      //  dateCourse: this.courseDate , 
      //  beginHour:this.beginHour,
      //  endHour:this.endHour , 
      courseSessionBeginDate: ['', Validators.required],

      courseSessionEndDate: ['', Validators.required],
      //  institution :[this.contact.institution],
      //    course:['', Validators.required],

      //    classRoom: ['', Validators.required],
      //institutionName  : [this.contact.institutionName],
      //   city  : ['', Validators.required],
      //     firstName: ['', Validators.required],
      //     lastName : ['', Validators.required]
    });

    /* this.horizontalStepperStep2 = this._formBuilder.group({
         maliste: ['']
     });*/

    this.horizontalStepperStep3 = this._formBuilder.group({
      /*city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]]*/
    });

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


    this.events.push(event.value);
    this.courseDate = this.events[this.events.length - 1];
    this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear(), this.courseDate.getMonth(), this.courseDate.getDate())

    //console.log("courseDate changeddd");
    // console.log(this.courseDate);

    //console.log("courseDate changeddd");
    //console.log(this.courseDate);

    // console.log("courseDate Max changed");
    // console.log(this.courseDateMaxHour) ; 
  }


  selectInstitution(institutionId): void {

    console.log("chosen institution");

    this.chosenInstitutionName = this.currentInstitution;
    this._addSessionService.chosenInstitutionId = institutionId;
    console.log(this.currentInstitution);
    this.filteredClassrooms = [];
    this.classRooms.forEach(contact => {
      if (contact.institution.id == institutionId) {
        if (!this.filteredClassrooms.includes(contact))
          this.filteredClassrooms.push(contact);
      }

    });
    console.log(this.classRooms);
    console.log(this.filteredClassrooms);


  }

  selectProgram(programId): void {
    this.filteredThemes = [];
    this.themes.forEach(theme => {
      if (theme.programInstance.id == programId) {
        if (!this.filteredThemes.includes(theme))
          this.filteredThemes.push(theme);
      }

    });

    console.log(this.filteredThemes);
  }

  selectTheme(themeId): void {
    this.filteredModules = [];
    this.modules.forEach(module => {
      if (module.themeInstance.id == themeId) {
        if (!this.filteredModules.includes(module))
          this.filteredModules.push(module);
      }

    });

    console.log(this.filteredModules);
  }

  selectModule(moduleId): void {
    this.filteredThemeDetails = [];
    this.themeDetails.forEach(themeDetail => {
      if (themeDetail.moduleInstance.id == moduleId) {
        if (!this.filteredThemeDetails.includes(themeDetail))
          this.filteredThemeDetails.push(themeDetail);
      }

    });

    console.log(this.filteredThemeDetails);
  }

  selectThemeDetail(themeDet): void {

    //this._addSessionService.chosenClassRoom = event;
    this.selectedThemeDet = themeDet;

  }

  selectClassroom(event): void {

    this._addSessionService.chosenClassRoom = event;
    this.currentClassroom = event;

  }



  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Finish the horizontal stepper
   */
  finishHorizontalStepper(): void {
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
    console.log(this.selectedTrainer);
    console.log(this.currentClassroom);
    console.log(this.horizontalStepperStep1);
    this.session = new Session({});
    this.session.sessionName = this.horizontalStepperStep1.value.courseSessionName;
    this.session.sessionBeginDate = this.horizontalStepperStep1.value.courseSessionBeginDate;
    this.session.sessionEndDate = this.horizontalStepperStep1.value.courseSessionEndDate;
    this.session.trainer = this.selectedTrainer;
    this.session.themeDetailInstance = this.selectedThemeDet;
    this.session.classRoom=this.currentClassroom;
    console.log(this.session);
    console.log(this.selectedThemeDet);
    this.event = new CalendarEventModel(null);


    this.event.title = this.session.sessionName;
    this.event.start =  this.session.sessionBeginDate ;
    this.event.end = this.session.sessionEndDate ;

    this._addSessionService.saveCourseSessionAndEvent(this.session,this.event)
    alert('You have finished the horizontal stepper!');
  }

  /**
   * Finish the vertical stepper
   */
  finishVerticalStepper(): void {
    alert('You have finished the vertical stepper!');
  }
}