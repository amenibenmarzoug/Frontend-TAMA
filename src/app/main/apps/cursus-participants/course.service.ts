import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CursusCoursessPartService } from './courses/coursess.service';
import { CursusCoursesPartService } from './courses.service';
import {environment} from 'environments/environment';


const AUTH_API1 = environment.backend_url+ 'api/';

@Injectable()
export class CursusCoursePartService implements Resolve<any>
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
        private serviceCursusId : CursusCoursessPartService ,
        private _cursusCoursesPartService : CursusCoursesPartService,
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
        return new Promise<void>((resolve, reject) => {

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
