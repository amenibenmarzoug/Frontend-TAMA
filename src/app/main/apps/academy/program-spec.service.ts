import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgramInst } from 'app/main/apps/academy/programInst.model';
import { Program } from './program.model';
import {environment} from 'environments/environment';



const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class ProgramSpecService {

  onCategoriesChanged: BehaviorSubject<any>;
  onProgramsChanged: BehaviorSubject<any>;

  programs: Program[];
  id: number;
  program: Program;
  programId: any;



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
      this.onProgramsChanged = new BehaviorSubject({});

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
      return new Promise<void>((resolve, reject) => {

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
                  this.onProgramsChanged.next(response);
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


  addProgramSpec(programSpec): Promise<any> {
    return new Promise((resolve, reject) => {
       // programInst.program = program;
       //console.log("programSpeeeeeeeeeec");
       //console.log(programSpec);
               this._httpClient.post(AUTH_API +'program', programSpec)
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
  deleteProgram(program): Promise<any> {
      return new Promise((resolve, reject) => {
          const courseIndex = this.programs.indexOf(program.id);
          this.programs.splice(courseIndex, 1);
          this.onProgramsChanged.next(this.programs);
          this._httpClient.delete(AUTH_API + `programs/${program.id}`)
              .subscribe(response => {
                  this.getPrograms();

                  resolve(response);
              });
      });
  }


  updateProgram(program): Promise<any> {
      return new Promise((resolve, reject) => {
          this._httpClient.put(AUTH_API + 'programEdit', program)
              .subscribe(response => {
                  //this.getCourses();
                  resolve(response);
              });
      });
  }


 


}
