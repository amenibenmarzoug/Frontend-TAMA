import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CursusCoursessService } from './courses/coursess.service';

const AUTH_API1 = 'http://localhost:8080/api/';

@Injectable()
export class CursusCourseService implements Resolve<any>
{
    onCourseChanged: BehaviorSubject<any>;
    onTrainingsChanged: BehaviorSubject<any>;
    trainings:any;
    cursusId:any;
    cursusName:string;
    trainingsPerCursus : any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private serviceCursusId : CursusCoursessService ,
    )
    {
        // Set the defaults
        this.onCourseChanged = new BehaviorSubject({});
        this.onTrainingsChanged = new BehaviorSubject({});
      //  console.log(this.serviceCursusId.cursusId)
      //  this.trainingsPerCursus=this.getTrainingsPerCursus(this.serviceCursusId.cursusId);
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
                this.getCursus(route.params.courseId,route.params.courseName),
                this.getTrainings(),
               // this.getTrainingsPerCursus(route.params.courseId),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
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
    getTrainingsPerCursus(cursusId): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const params = new HttpParams().set('cursusId', cursusId );
            this._httpClient.get(AUTH_API1+"coursePerCursus/" , {params:params})
                .subscribe((response: any) => {
                    //this.cursusId=courseId;
                   // this.cursusName=courseName;
                   this.trainingsPerCursus=response ;
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
