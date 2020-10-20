import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CourseTrainerService } from 'app/main/apps/course-trainer/coursetrainer.service';


const USER_KEY ='auth-user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any;
    filterBy: string;
    disponibilities: any[];
    trainers:any[]=[];
    trainersId:any[]=[];
    courses: any[];
    currenttrainer: string;
    trainerId: any;
    courseId: any;
    courseSessions: any[] = [];
    data:any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CourseTrainerService} _courseTrainerService
     */
    constructor(
        private _courseTrainerService: CourseTrainerService
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
        //this.filterBy = this._courseTrainerService.filterBy || 'all';
    
        this._courseTrainerService.onDisponibilitiesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(trainers => {
                this.disponibilities = trainers;
                console.log("trianers");
                console.log(this.disponibilities);
            });

        this._courseTrainerService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
               /* courses.forEach(course => {
                    if(course.trainer==null)
                        this.courses.push(course);
                });*/
                this.courses = courses;
                console.log("courses");
                console.log(this.courses);
            });


        this._courseTrainerService.onUserDataChanged
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
        this.filterBy=null;
        
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
        
        this.filterBy = filter;
        this._courseTrainerService.onFilterChanged.next(this.filterBy);
    }

    getTrainerId(event): void {

        console.log("trainer id");

        console.log(event);
        this.trainerId = event;
        this._courseTrainerService.trainer = event;


    }

    getCourseIdAndTrainer(event): void {

       
        this.courseId = event;
        this._courseTrainerService.courseId = event;
   
        this._courseTrainerService.contacts.forEach(contact => {
            if (contact.course.id == event) {
                if (!this.courseSessions.includes(contact))
                    this.courseSessions.push(contact);
            }

        });
       
        this.data=JSON.parse(sessionStorage.getItem(USER_KEY));
        console.log(this.data);
        this.trainerId=this.data.id
        this._courseTrainerService.getTrainerById(this.data.id)
        //this._disponibilityTrainerService.trainerId=this._disponibilityTrainerService.trainer; 
        this._courseTrainerService.onAvailableTrainersChanged.next(this.courseSessions);
     
        this.courseSessions = []

    }

    getCourseId(event): any {

        //this._courseTrainerService.deselectContacts;
        
        this.courseId = event;
        this._courseTrainerService.courseId = event;
        console.log("dispo main");
        console.log(this._courseTrainerService.disponibilities);
       /* this._courseTrainerService.disponibilities.forEach(disponibility => {
            
            if (disponibility.courseSession.course.id == event) {
              
                if (!this.trainers.includes(disponibility.trainer.id)){
                    console.log(disponibility.trainer.id);
                    
                    this.trainersId.push(disponibility.trainer.id);}
              
            }

        });

        this._courseTrainerService.trainers.forEach(trainer => {
            
            
                if (this.trainersId.includes(trainer.id)){
                    
                    
                    this.trainers.push(trainer);}
              
            

        });
        console.log(new Set(this.trainers));
       console.log("this trainers");
       console.log(this.trainers);
   
        this._courseTrainerService.onAvailableTrainersChanged.next(this.trainers);
     
        this.courseSessions = [];
        this.trainers=[];
        this.trainersId=[];*/
       
        //this._courseTrainerService.selectedContacts=[];
        return event;

    }

  /*  getCourseSessions(event): void {
        console.log("Course in MAIN");
        //this._disponibilityTrainerService.getSpecificCourseSessions(event);
    }*/
    /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
    connect(): Observable<any[]> {
        return this._courseTrainerService.onDisponibilitiesChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }

}
