import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cursus } from 'app/main/apps/cursus/cursus.model';


const USER_KEY = 'auth-user';

const AUTH_API1 = 'http://localhost:8080/api/';
@Injectable()
export class CursusCoursesPartService implements Resolve<any>

{   onEntrpriseChanged: BehaviorSubject<any>;
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    entreprises:any[];
    courses: Cursus[] ; 
    id: number;
    course:any ; 
    courseId:any;
    user: any;
    participant : any ; 
    cursus:any;

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
        this.participant=this.getParticipant(JSON.parse(sessionStorage.getItem(USER_KEY)).id) ;
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

    getParticipant(id): Promise<any>
    {
      
       
         return new Promise((resolve, reject) => {
            id = JSON.parse(sessionStorage.getItem(USER_KEY)).id ;
                this._httpClient.get('http://localhost:8080/api/participants/'+id )
                .subscribe((response: any) => {
                   console.log("response");
                    
                    this.participant=response;
                    this.cursus =this.participant.cursus.id;
                    resolve(response);
                }, reject);
            }
        );
    }

    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getCourses(): Promise<any>
    {
        const params = JSON.parse(sessionStorage.getItem(USER_KEY)).id
        let id = new HttpParams().set('id', params);
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API1+'cursusParticipant',{params:id})
                .subscribe((response: any) => {
                    this.courses = response;
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
  
   

   
   
   

 

}
