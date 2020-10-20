import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cursus } from 'app/main/apps/academy/cursus.model';



const AUTH_API = 'http://localhost:8080/api/';
@Injectable()
export class AcademyCoursesService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;

    courses: Cursus[] ; 
    id: number;
    course:any ; 
    courseId:any;
    


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onCoursesChanged = new BehaviorSubject({});
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
                this.getCourses()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-categories')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    

    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getCourses(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+'cursus')
                .subscribe((response: any) => {
                    this.courses = response;
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    /*create(data) {
        return this._httpClient.post(baseUrl, data);
      }*/

/*
      deleteCursus(cursus): void
      {   
          const contactIndex = this.courses.indexOf(cursus);
          this.courses.splice(contactIndex, 1);
          this.onCoursesChanged.next(this.courses);
      }  */
      

      /**
     * Delete cursus
     *
     * @param id
     */
      deleteCursus(course):Promise<any>
      
    {  //console.log("function entryy") ; 
        //console.log(course.id)  ;
        
     
       return new Promise((resolve, reject) => {
        const courseIndex = this.courses.indexOf(course.id);
        this.courses.splice(courseIndex, 1);
        this.onCoursesChanged.next(this.courses);
        this._httpClient.delete(AUTH_API +`cursus/${course.id}`)
            .subscribe(response => {
               this.getCourses();
               console.log("function 2") ; 
              
                resolve(response);
            });
    }); 
    }



      saveCourse(course,createdTrainings): Promise<any>
   {
       return new Promise((resolve, reject) => {

           this._httpClient.post(AUTH_API +'cursus',course)
               .subscribe(response => {
                   this.getCourses();
                   this.course=response;
                   resolve(response);
                   console.log("enii fel poooost"); 
                  // console.log(this.course.id) ;
                   //this.courseId = this.course.id; 
                   console.log(this.courseId);
                   for (var i =0;i< createdTrainings.length;i++){
                    createdTrainings[i].cursus=response;
                    this.addTraining(createdTrainings[i]);
                   }
                   


                   


               });
       });
   }

   
   /*getCursusid():number{
    console.log("course") ; 
    console.log(this.course.id) ; 
    this.courseId=this.course.id;
       return(this.course.id);
   }*/

   updateCourse1(course): Promise<any>
    {
        return new Promise((resolve, reject) => {
    console.log (course) ;             
            this._httpClient.put(AUTH_API + 'cursus'  , course )
                .subscribe(response => {
                    //this.getCourses();
                    resolve(response);
                });
        });
    }


    addTraining(contact): Promise<any>
   {
       return new Promise((resolve, reject) => {
          // contact.cursus=cursus;
           this._httpClient.post(AUTH_API +'course', contact)
               .subscribe(response => {
                  // this.getContacts();
                   resolve(response);
               });
       });
   }


 /*  getContacts(): Promise<any>
   {
       return new Promise((resolve, reject) => {
               this._httpClient.get(AUTH_API + 'course')
                   .subscribe((response: any) => {

                       this.contacts = response;

                      /* if ( this.filterBy === 'starred' )
                       {
                           this.contacts = this.contacts.filter(_contact => {
                               return this.user.starred.includes(_contact.id);
                           });
                       }

                       if ( this.filterBy === 'frequent' )
                       {
                           this.contacts = this.contacts.filter(_contact => {
                               return this.user.frequentContacts.includes(_contact.id);
                           });
                       }*/

                     /*  if ( this.searchText && this.searchText !== '' )
                       {
                           this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                       }

                       this.contacts = this.contacts.map(contact => {
                           return new Training(contact);
                       });

                       this.onContactsChanged.next(this.contacts);
                       resolve(this.contacts);
                   }, reject);
           }
       );
   }*/

}
