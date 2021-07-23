import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cursus } from 'app/main/apps/cursus/cursus.model';
import { Disponibility } from './cursus-participants/disponibility.model';
import { Entreprise } from '../entreprises/entreprise.model';


const USER_KEY = 'auth-user';

const AUTH_API1 = 'http://localhost:8080/api/';
@Injectable()
export class CursusCoursesService implements Resolve<any>

{   onEntrpriseChanged: BehaviorSubject<any>;
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    entreprises:any[];
    courses: Cursus[] ; 
    id: number;
    course:any ; 
    courseId:any;
    user: any;
    disponibility :Disponibility ;
    entreprise : any ; 

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router
    )
    {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onCoursesChanged = new BehaviorSubject({});
        this.onEntrpriseChanged = new BehaviorSubject([]);
        this.entreprise=this.getEntreprise(JSON.parse(sessionStorage.getItem(USER_KEY)).id) ;
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
    {   //let role = JSON.parse(sessionStorage.getItem(USER_KEY)),
        return new Promise<void>((resolve, reject) => {

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
            this._httpClient.get(AUTH_API1+'cursus')
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
      
    {  console.log("function entryy") ; 
        console.log(course.id)  ;
        
     
       return new Promise((resolve, reject) => {
        const courseIndex = this.courses.indexOf(course.id);
        this.courses.splice(courseIndex, 1);
        this.onCoursesChanged.next(this.courses);
        this._httpClient.delete(AUTH_API1 +`cursus/${course.id}`)
            .subscribe(response => {
               this.getCourses();
               console.log("function 2") ; 
              
                resolve(response);
            });
    }); 
    }



      saveCourse(course): Promise<any>
   {
       return new Promise((resolve, reject) => {

           this._httpClient.post(AUTH_API1 +'cursus',course)
               .subscribe(response => {
                   this.getCourses();
                   this.course=response;
                   resolve(response);
                   console.log("enii fel poooost"); 
                   console.log(this.course.id) ;
                   this.courseId = this.course.id; 
                   console.log(this.courseId);
                   


                   


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
            this._httpClient.put(AUTH_API1 + 'cursus'  , course )
                .subscribe(response => {
                    //this.getCourses();
                    resolve(response);
                });
        });
    }
    getEntreprise(id): Promise<any>
    {
      
       
         return new Promise((resolve, reject) => {
            id = JSON.parse(sessionStorage.getItem(USER_KEY)).id ;
                this._httpClient.get('http://localhost:8080/api/entreprises/'+id )
                .subscribe((response: any) => {
                   console.log("response");
             // console.log(response);
                   // this.onEntrpriseChanged.next(response);
                    this.entreprise=response;
                    resolve(response);
                    
                   // console.log( this.entreprise);
                }, reject);
            }
        );
    }
    updateDispoEntr(disponibility): Promise<any>
    {
        return new Promise((resolve, reject) => {
         disponibility.entreprise=null  ;
         let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
         const params = new HttpParams().set('id', id);
    
        // console.log(disponibility);
            this._httpClient.post('http://localhost:8080/api/disponibility',disponibility,{params:params} )
                .subscribe((response: any) => {
                  //  this.getCourses();
                  console.log(response);
                    resolve(response);
                    this.router.navigate(['./apps/my-participants']);

                }, reject);
        });
    }


    updateEntrCursus(entreprise ,cursusId ): Promise<any> {
        return new Promise((resolve, reject) => {
           
            let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
         
            const params = new HttpParams({fromObject: { 'id':id , 'cursusId':cursusId }});
            //const obj = { id: 'id', cursusId: 'cursusId'};
            //console.log(contact);
            //const params = new HttpParams().set('cursusId', cursusId );
            this._httpClient.put('http://localhost:8080/api/entreprises/CursusId',entreprise,  { params: params } )
                .subscribe(response => {
                    console.log(response) ;

                    resolve(response);
                });
        });
    }

 

}
