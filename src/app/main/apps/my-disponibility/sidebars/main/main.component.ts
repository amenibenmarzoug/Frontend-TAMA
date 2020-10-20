import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MyDisponibilityService } from 'app/main/apps/my-disponibility/mydisponibility.service';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any;
  filterBy: string;
  trainers: any[];
  courses: any[];
  currenttrainer: string;
  trainerId: any;
  courseId: any;
  courseSessions: any[] = [];
  data: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {MyDisponibilityService} _mydisponibilityService
   */
  constructor(
    private _mydisponibilityService: MyDisponibilityService
  ) {
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
    this.filterBy = this._mydisponibilityService.filterBy || 'all';

    this._mydisponibilityService.onTrainersChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(trainers => {
        this.trainers = trainers;
        console.log("trianers");
        console.log(this.trainers);
      });

    this._mydisponibilityService.onCoursesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(courses => {
        this.courses = courses;
        console.log("courses");
        console.log(this.courses);
      });


    this._mydisponibilityService.onUserDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        this.user = user;
      });


    /*this._disponibilityTrainerService.onSelectedTrainerChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(selectedTrainer => {
       
           this.trainerId=selectedTrainer;

            console.log("id trainer");
            console.log(this.trainerId);
        
   
    });*/
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Change the filter
   *
   * @param filter
   */
  changeFilter(filter): void {
    this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
    console.log(this.data);
    this.trainerId = this.data.id
    this._mydisponibilityService.getTrainerById(this.data.id)
    this.filterBy = filter;
    this._mydisponibilityService.onFilterChanged.next(this.filterBy);
  }

  getTrainerId(event): void {

    console.log("trainer id");

    console.log(event);
    this.trainerId = event;
    this._mydisponibilityService.trainer = event;


  }

  getCourseIdAndTrainer(event): void {


    this.courseId = event;
    this._mydisponibilityService.courseId = event;

    this._mydisponibilityService.contacts.forEach(contact => {
      if (contact.course.id == event) {
        if (!this.courseSessions.includes(contact))
          this.courseSessions.push(contact);
      }

    });

    this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
    console.log(this.data);
    this.trainerId = this.data.id
    this._mydisponibilityService.getTrainerById(this.data.id)
    //this._disponibilityTrainerService.trainerId=this._disponibilityTrainerService.trainer; 
    this._mydisponibilityService.onSpecificCourseSessionsChanged.next(this.courseSessions);

    this.courseSessions = []

  }

  /* getCourseId(event): void {
 
      
       this.courseId = event;
       this._disponibilityTrainerService.courseId = event;
  
       this._disponibilityTrainerService.contacts.forEach(contact => {
           if (contact.course.id == event) {
               if (!this.courseSessions.includes(contact))
                   this.courseSessions.push(contact);
           }
 
       });
      
  
       this._disponibilityTrainerService.onSpecificCourseSessionsChanged.next(this.courseSessions);
    
       this.courseSessions = []
 
   }*/

  /*  getCourseSessions(event): void {
        console.log("Course in MAIN");
        //this._disponibilityTrainerService.getSpecificCourseSessions(event);
    }*/
  /**
 * Connect function called by the table to retrieve one stream containing the data to render.
 * @returns {Observable<any[]>}
 */
  connect(): Observable<any[]> {
    return this._mydisponibilityService.onTrainersChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }

}
