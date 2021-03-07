import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/';



@Injectable()
export class Register2Service implements Resolve<any>{

    onClassesChanged: BehaviorSubject<any>;
    classes: any[];

    constructor(private http: HttpClient) {
        this.onClassesChanged = new BehaviorSubject([]);
    }


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
                this.getClasses(),
            ]).then(
                ([files]) => {



                    resolve();

                },
                reject
            );
        });
    }



    getClasses(): Promise<any> {


        return new Promise((resolve, reject) => {
            this.http.get(AUTH_API + 'programsInst')
                .subscribe((response: any) => {
                    this.onClassesChanged.next(response);
                    this.classes = response;
                    console.log("CLASSES");
                    console.log(response);
                    resolve(response);
                }, reject);
        }
        );
    }
}
