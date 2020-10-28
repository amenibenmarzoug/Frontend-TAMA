import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CourseSessionService } from 'app/main/apps/academy/course-session.service';
import { Program } from '../../program.model';
import { Training } from '../../trainings/training.model';
import { isThisISOWeek } from 'date-fns/esm';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit, OnDestroy {

  user: any;
  filterBy: string;

  categories: any[];
  courses: any[];
  classRooms:any[];
  cursus:any[]; 
  coursesSessions:any[]; 
  institutions:any[]; 
  coursesFilteredByCategory: any[];
  filteredCourses: any[];
  filteredCourseById:any[];
  filteredClassrooms: any[] ; 
  filteredCourseSessionsByInstitution:any[] ;
  filteredCourseSessionsByClassroom:    any[] ;

  currentCategory: string;
  currentTraining:string; 
  currentInstitution:string ;
  currentClassroom: string ; 
  searchTerm: string;
  chosenCursusId:any;
  chosenTrainingId:any; 
  chosenInstitutionName:string ; 


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ContactsService} _contactsService
   */
  constructor(
      private _contactsService: CourseSessionService
  )
  {
      this.currentCategory = 'all';
      this.searchTerm = '';
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

   
  ngOnInit(): void
  {

      this.filterBy = this._contactsService.filterBy || 'all';

      this._contactsService.onUserDataChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
              this.user = user;
          });

          this._contactsService.onCoursesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(courses => {
              this.courses = courses;
              console.log("courses");
              console.log(this.courses);
          });

          this._contactsService.onCursusChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(cursus => {
              this.cursus = cursus;
              console.log("cursus");
              console.log(this.cursus);
          }); 

          this._contactsService.onCoursesSessionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(coursesSessions => {
              this.coursesSessions = coursesSessions;
              console.log("CourseSessions");
              console.log(this.coursesSessions);
          });
          this._contactsService.onInstitutionsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(institutions => {
              this.institutions = institutions;
              console.log("institutions");
              console.log(this.institutions);
          });
          this._contactsService.onClassRoomsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(classRooms => {
              this.classRooms = classRooms;
              console.log("classRooms");
              console.log(this.classRooms);
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
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
  changeFilter(filter): void
  {
      this.filterBy = filter;
      this._contactsService.onFilterChanged.next(this.filterBy);
  }

  selectCursus():void
  {
  
      //console.log("chosennnn cursus -_________-");

            this.chosenCursusId=this.currentCategory;
            this._contactsService.getCursusById(this.chosenCursusId) ; 
            this._contactsService.chosenCursusId=this.currentCategory;
            console.log("this.chosenCursusId");

            console.log(this.chosenCursusId);
            this.coursesFilteredByCategory = this.courses.filter((course) => {
               // console.log("chosennnn cursus ");
    
    
                //console.log(this.chosenCursusId);
                  return course.cursus.id === this.currentCategory;
              });
              this.chosenTrainingId=this.currentTraining
              this._contactsService.chosenTrainingId=this.currentTraining
              this._contactsService.getCourseById(this.chosenTrainingId); 
              
              //console.log(this.currentTraining);
              //console.log("chosennnn cursus");
             // console.log(this.currentCategory);
              //console.log(this.coursesFilteredByCategory);
              if ( this.currentCategory === 'all' )
      {
        //console.log("dkhalt lel if tee l all ");


          //this.coursesFilteredByCategory = this.courses;
          this.filteredCourses = this._contactsService.contacts;
          console.log("el filtered coursess all");

             console.log(this.filteredCourses);
              this._contactsService.onContactsChanged.next(this.filteredCourses);

      }
      else
      {
      

              this.filteredCourses=[];
              
              for (var val of this.coursesFilteredByCategory) {
                  let valId=val.id;
                  this._contactsService.contacts.forEach(contact => {
                    if (contact.course.id == val.id) {
                        if (!this.filteredCourses.includes(contact))
                            this.filteredCourses.push(contact);
                    }
        
                });

                

                //console.log(val); // prints values: 10, 20, 30, 40
              }
    
    
    
              //this.filteredCourses = [...this.coursesFilteredByCategory];
              console.log("el filtered coursess")

              console.log(this.filteredCourses)
             
    
          
         this._contactsService.onContactsChanged.next(this.filteredCourses);
    
          // Re-filter by search term
          //this.filterCoursesByTerm();
            }         

   
}

  selectCourse():void {
    /*if ( this.currentTraining === 'all' )
    {

        this.coursesFilteredByCategory = this.courses;
        this.filteredCourses = this.courses;
    }
    else
    {
        this.coursesFilteredByCategory = this.courses.filter((course) => {
          console.log("chosennnn cursus ");


          console.log(this.chosenCursusId);
            return course.cursus.id === this.currentCategory;
        });*/
        this.chosenTrainingId=this.currentTraining
        this._contactsService.chosenTrainingId=this.currentTraining
        this._contactsService.getCourseById(this.chosenTrainingId);
        if(! (this.currentTraining === 'all') ) {


            this.filteredCourseById=[];
            /*  for (var val of this.filteredCourses) {
                  let valId=val.id;
                  this._contactsService.contacts.forEach(contact => {
                    if (contact.course.id == val.id) {
                        if (!this.filteredCourses.includes(contact))
                            this.filteredCourses.push(contact);
                    }
        
                });

                //console.log(val); // prints values: 10, 20, 30, 40
              }*/
              this.filteredCourses.forEach(contact => {
                if (contact.course.id == this.chosenTrainingId) {
                    if (!this.filteredCourseById.includes(contact))
                        this.filteredCourseById.push(contact);
                }
    
            });
    
    
    
              //this.filteredCourses = [...this.coursesFilteredByCategory];
              //console.log("el filtered coursess")

             // console.log(this.filteredCourses)
             
    
          
         this._contactsService.onContactsChanged.next(this.filteredCourseById);

        }
        
        //console.log(this.currentTraining);
        //console.log("chosennnn cursus");
        //console.log(this.currentCategory);
        //console.log(this.coursesFilteredByCategory);



        //this.filteredCourses = [...this.coursesFilteredByCategory];
        console.log(this.filteredCourseById)

    //}
    //this._contactsService.onContactsChanged.next(this.filteredCourses);
      
  }

  selectInstitution():void
  {
  
      console.log("chosen institution");

            this.chosenInstitutionName=this.currentInstitution;
            this._contactsService.chosenInstitutionId=this.currentInstitution ; 

            this.filteredClassrooms=[];
             this.classRooms.forEach(contact => {
                if (contact.institution.id == this.currentInstitution) {
                    if (!this.filteredClassrooms.includes(contact))
                        this.filteredClassrooms.push(contact);
                }
    
            });
            


            this.filteredCourseSessionsByInstitution=[];
            this.filteredCourseById.forEach(contact => {
                if (contact.classRoom.institution.id == this.currentInstitution) {
                    if (!this.filteredCourseSessionsByInstitution.includes(contact))
                        this.filteredCourseSessionsByInstitution.push(contact);
                }
    
            });

            console.log("filteredCourseSessionsByInstitution");
            console.log(this.filteredCourseSessionsByInstitution);


            this._contactsService.onContactsChanged.next(this.filteredCourseSessionsByInstitution);





            //this._contactsService.chosenClassRoom=event;
            

            //console.log(this.chosenInstitutionName);
           /* this.coursesFilteredByCategory = this.courses.filter((course) => {
                console.log("chosennnn cursus ");
    
    
                console.log(this.chosenCursusId);
                  return course.cursus.id === this.currentCategory;
              });
              this.chosenTrainingId=this.currentTraining
              this._contactsService.chosenTrainingId=this.currentTraining
              this._contactsService.getCourseById(this.chosenTrainingId); 
              
              //console.log(this.currentTraining);
              //console.log("chosennnn cursus");
              //console.log(this.currentCategory);
              //console.log(this.coursesFilteredByCategory);
              if ( this.currentCategory === 'all' )
      {
        console.log("dkhalt lel if tee l all ");


          //this.coursesFilteredByCategory = this.courses;
          this.filteredCourses = this._contactsService.contacts;
          console.log("el filtered coursess all")

              console.log(this.filteredCourses)
              this._contactsService.onContactsChanged.next(this.filteredCourses);

      }
      else
      {
        console.log("fel elseee mech all ");


              this.filteredCourses=[];
              
              for (var val of this.coursesFilteredByCategory) {
                  let valId=val.id;
                  this._contactsService.contacts.forEach(contact => {
                    if (contact.course.id == val.id) {
                        if (!this.filteredCourses.includes(contact))
                            this.filteredCourses.push(contact);
                    }
        
                });

                //console.log(val); // prints values: 10, 20, 30, 40
              }
    
    
    
              //this.filteredCourses = [...this.coursesFilteredByCategory];
              console.log("el filtered coursess")

              console.log(this.filteredCourses)
             
    
          
         this._contactsService.onContactsChanged.next(this.filteredCourses);
    
          // Re-filter by search term
          //this.filterCoursesByTerm();
            }*/         

   
}
selectClassroom(event):void { 



    this._contactsService.chosenClassRoom=event;
   /* console.log("chosen classroom");
    console.log(this._contactsService.chosenClassRoom)
     console.log(this.chosenInstitutionName);

     this.filteredCourseSessionsByClassroom=[];
     this.filteredCourseById.forEach(contact => {
         if (contact.classRoom== this._contactsService.chosenClassRoom) {
             if (!this.filteredCourseSessionsByClassroom.includes(contact))
                 this.filteredCourseSessionsByClassroom.push(contact);
         }

     });

     console.log("filteredCourseSessionsByClassroom");
     console.log(this.filteredCourseSessionsByClassroom);


     this._contactsService.onContactsChanged.next(this.filteredCourseSessionsByClassroom);*/


     

            

}

  filterCoursesByCategory(): void
  {


      //this.chosenCursusId=this.currentCategory;
      //this._contactsService.chosenCursusId=this.currentCategory;


      // Filter
      if ( this.currentTraining === 'all' )
      {

          this.coursesFilteredByCategory = this.courses;
          this.filteredCourses = this.courses;
      }
      else
      {
          this.coursesFilteredByCategory = this.courses.filter((course) => {
            console.log("chosen cursus ");


            console.log(this.chosenCursusId);
              return course.cursus.id === this.currentCategory;
          });
          this.chosenTrainingId=this.currentTraining
          this._contactsService.chosenTrainingId=this.currentTraining
          this._contactsService.getCourseById(this.chosenTrainingId); 
          
          //console.log(this.currentTraining);
          //console.log("chosennnn cursus");
          //console.log(this.currentCategory);
          //console.log(this.coursesFilteredByCategory);



          this.filteredCourses = [...this.coursesFilteredByCategory];
          console.log(this.filteredCourses)

      }
      this._contactsService.onContactsChanged.next(this.filteredCourses);

      // Re-filter by search term
      this.filterCoursesByTerm();
  }

  /**
   * Filter courses by term
   */
  filterCoursesByTerm(): void
  {
      const searchTerm = this.searchTerm.toLowerCase();

      // Search
      if ( searchTerm === '' )
      {
          this.filteredCourses = this.coursesFilteredByCategory;
      }
      else
      {
          this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
              return course.cursusName.toLowerCase().includes(searchTerm);
          });
      }
  }
}
