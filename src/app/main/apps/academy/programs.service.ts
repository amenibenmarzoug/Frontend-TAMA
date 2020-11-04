import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Program } from 'app/main/apps/academy/program.model';



const AUTH_API = 'http://localhost:8080/api/';
@Injectable()
export class ProgramsService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;

    programs: Program[];
    id: number;
    course: any;
    courseId: any;



    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                //this.getCategories(),
                this.getPrograms()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    



    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getPrograms(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programs')
                .subscribe((response: any) => {
                    this.programs = response;
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    addProgram(program): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'program', program)
                .subscribe(response => {
                    this.getPrograms();
                    resolve(response);
                });
        });
    }

    /**
   * Delete cursus
   *
   * @param id
   */
    deleteCursus(program): Promise<any> {
        return new Promise((resolve, reject) => {
            const courseIndex = this.programs.indexOf(program.id);
            this.programs.splice(courseIndex, 1);
            this.onCoursesChanged.next(this.programs);
            this._httpClient.delete(AUTH_API + `programs/${program.id}`)
                .subscribe(response => {
                    this.getPrograms();
                    console.log("function 2");

                    resolve(response);
                });
        });
    }



    saveCourse(course, createdTrainings): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'program', course)
                .subscribe(response => {
                    this.getPrograms();
                    this.course = response;
                    resolve(response);
                    console.log("enii fel poooost");
                    // console.log(this.course.id) ;
                    //this.courseId = this.course.id; 
                    console.log(this.courseId);
                    for (var i = 0; i < createdTrainings.length; i++) {
                        createdTrainings[i].cursus = response;
                    }






                });
        });
    }



    updateCourse1(course): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(course);
            this._httpClient.put(AUTH_API + 'programEdit', course)
                .subscribe(response => {
                    //this.getCourses();
                    resolve(response);
                });
        });
    }


   



}
