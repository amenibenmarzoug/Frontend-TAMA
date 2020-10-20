import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import{Cursus} from 'app/main/apps/academy/cursus.model';

@Injectable({
  providedIn: 'root'
})
export class CursusTrainingService {

  products: any[];
  onProductsChanged: BehaviorSubject<any>;

  courses: Cursus[] ; 
  constructor( private _httpClient: HttpClient) {
    // Set the defaults
    this.onProductsChanged = new BehaviorSubject({}); }
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
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-products')
                .subscribe((response: any) => {
                    this.products = response;
                    this.onProductsChanged.next(this.products);
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
            this._httpClient.get('api/academy-courses')
                .subscribe((response: any) => {
                    this.courses = response;
                   // this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }


    updateCourse(course): Promise<any>
   {
       return new Promise((resolve, reject) => {

           this._httpClient.post('api/academy-courses/' + course.id, {...course})
               .subscribe(response => {
                   this.getCourses();
                   resolve(response);
               });
       });
   }

}
