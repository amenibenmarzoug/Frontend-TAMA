import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgramInst } from 'app/main/apps/academy/programInst.model';
import { Program } from 'app/shared/models/program.model';
import {environment} from 'environments/environment';



const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class ProgramSpecService {

  onCategoriesChanged: BehaviorSubject<any>;
  onProgramsChanged: BehaviorSubject<any>;
  onBasicProgramsChanged : BehaviorSubject<any>;

  programs: Program[];
  id: number;
  program: Program;
  programId: any;
    basicPrograms: any;



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
      this.onBasicProgramsChanged= new BehaviorSubject({});

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
              this.getPrograms(),
              this.getBasePrograms()
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
  //get specific programs   //this.programs : specific ones 
  getPrograms(): Promise<any> {
      return new Promise((resolve, reject) => {
          this._httpClient.get(AUTH_API + 'programs')
              .subscribe((response: any) => {
                  this.programs = response;
                  this.programs=  this.programs.filter(program => {
                      if(program.specificProgram==true) {
                          return true ; 
                      }
                      return false;
                  }
                      
                  )

                  this.onProgramsChanged.next(this.programs);
                  resolve(this.programs);
              }, reject);
      });
  }


  /**
   * Get Base Programs
   *
   * @returns {Promise<any>}
   */
  //get basic programs 
  getBasePrograms(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'programs')
            .subscribe((response: any) => {
                this.basicPrograms = response;
                this.basicPrograms=  this.basicPrograms.filter(program => {
                    if(program.specificProgram==false) {
                        return true ; 
                    }
                    return false;
                }
                    
                )

                this.onBasicProgramsChanged.next(this.basicPrograms);
                resolve(this.basicPrograms);
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
      programSpec.specificProgram=true;
    return new Promise((resolve, reject) => {
       
               this._httpClient.post(AUTH_API +'specificProgram', programSpec)
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
          this._httpClient.delete(AUTH_API + 'programs/'+program.id)
              .subscribe(response => {
                  this.getPrograms();

                  resolve(response);
              });
      });
  }


  updateProgram(program): Promise<any> {
      program.specificProgram=true;
      return new Promise((resolve, reject) => {
          this._httpClient.put(AUTH_API + 'programEdit', program)
              .subscribe(response => {
                this.getPrograms();

                  resolve(response);
              });
      });
  }


 


}
