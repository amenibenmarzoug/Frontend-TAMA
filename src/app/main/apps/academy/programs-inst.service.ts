import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgramInst } from 'app/main/apps/academy/programInst.model';
import { Program } from './program.model';
import {environment} from 'environments/environment';



const AUTH_API = environment.backend_url+ 'api/';

@Injectable({
  providedIn: 'root'
})
export class ProgramsInstService {

    onCategoriesChanged: BehaviorSubject<any>;
    onProgramsInstChanged: BehaviorSubject<any>;
    onProgramChanged: BehaviorSubject<any>;
    programsInst: ProgramInst[];
    id: number;
    programInst: any;
    programInstId: any;
    program:any;
    programs: Program[];
    lastprogramInst:any;


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
        this.onProgramsInstChanged = new BehaviorSubject({});
        this.onProgramChanged =  new BehaviorSubject({});

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
                this.getProgramsInst(),
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
    getProgramsInst(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API +'programsInst')
                .subscribe((response: any) => {
                    this.programsInst = response;
                    this.onProgramsInstChanged.next(response);
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
    addProgramInst(programInst,program): Promise<any> {
        return new Promise((resolve, reject) => {
            programInst.program = program;
            this._httpClient.post(AUTH_API +'programsInst', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);


                    
                });
        });
    }

    addClass(programInst,program): Observable<any>{
        programInst.program = program;


       return this._httpClient.post(AUTH_API +'programsInst', programInst);
       
       
    }


  

   

    /**
   * Delete cursus
   *
   * @param id
   */
    deleteProgramInst(program): Promise<any> {
        return new Promise((resolve, reject) => {
            const courseIndex = this.programsInst.indexOf(program.id);
            this.programsInst.splice(courseIndex, 1);
            this.onProgramsInstChanged.next(this.programsInst);
            this._httpClient.delete(AUTH_API + `programsInst/${program.id}`)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }




    updateProgramInst(programInst,program): Promise<any> {
       
        return new Promise((resolve, reject) => {
            programInst.program = program;
            this._httpClient.put(AUTH_API + 'programsInst', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }

    getPrograms(): Promise<any>
    {
        
         return new Promise((resolve, reject) => {
                this._httpClient.get(environment.backend_url+ 'api/programs')
                .subscribe((response: any) => {
                    this.onProgramChanged.next(response);
                    this.programs=response;
                    resolve(response);
                }, reject);
            }
        );
    }


   

}
