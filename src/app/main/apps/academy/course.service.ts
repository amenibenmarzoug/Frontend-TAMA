import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API1 = 'http://localhost:8080/api/';
const USER_KEY = 'auth-user';
@Injectable()
export class AcademyCourseService implements Resolve<any>
{
    onCourseChanged: BehaviorSubject<any>;
    onTrainingsChanged: BehaviorSubject<any>;
    trainings:any;
    cursusId:any;
    cursusName:string;

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
        this.onCourseChanged = new BehaviorSubject({});
        this.onTrainingsChanged = new BehaviorSubject({});
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
    { let role = JSON.parse(sessionStorage.getItem(USER_KEY)).roles
        console.log(role)
        return new Promise((resolve, reject) => {
            Promise.all([
                console.log("manag") ,
               this.getCursus(route.params.courseId,route.params.courseName),
            this.getTrainings(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
    /* if (role==["MANAGER"]) {
            Promise.all([
                console.log("manag") ,
              //  this.getCursus(route.params.courseId,route.params.courseName),
                //this.getTrainings(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );}

            else if (role==["PARTICIPANT"]) {
                Promise.all([
               
                   // this. getTrainings(),
                    //  this. getParticipantCourses()
                     ]).then(
                         () => {
                             resolve();
                         },
                         reject
                     );
            }*/
        });
    }
  

    /**
     * Get course
     *
     * @param courseId
     * @param courseSlug
     * @returns {Promise<any>}
     */
    /*getCourse(courseId, courseSlug): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-course/' + courseId + '/' + courseSlug)
                .subscribe((response: any) => {
                    this.onCourseChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }*/

    getCursus(courseId,courseName): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API1+"cursus/"+ courseId)
                .subscribe((response: any) => {
                    this.cursusId=courseId;
                    this.cursusName=courseName;
                    this.onCourseChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    getParticipantCourses(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let id = JSON.parse(sessionStorage.getItem(USER_KEY)).id;
            const params = new HttpParams().set('id', id);
            this._httpClient.get(AUTH_API1+'cursusParticipant', {params:params})
                .subscribe((response: any) => {
                   // this.cursusId=courseId;
                   // this.cursusName=courseName;
                    this.onCourseChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }


    getTrainings(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API1+"course")
                .subscribe((response: any) => {
                    this.trainings=response;
                    this.onTrainingsChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
