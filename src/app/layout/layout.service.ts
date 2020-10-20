/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class LayoutService  implements Resolve<any>{

 

  trainerOnChanged: BehaviorSubject<any>;
  trainer: any;
  participantOnChanged: BehaviorSubject<any>;
  participant: any;
  institutionOnChanged: BehaviorSubject<any>;
  institution: any;
  entrepriseOnChanged: BehaviorSubject<any>;
  entreprise: any;
  data: any;
  userId: any;
  cursusId: any;

  filterBy: any;
  courseSessionsSpec: any[] = [];
  courseSessions: any;
  user: any;
  userRole: any;*/

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  /*constructor(
      private _httpClient: HttpClient
  ) {
      // Set the defaults
    
      this.trainerOnChanged = new BehaviorSubject({});
      this.participantOnChanged = new BehaviorSubject({});
      this.institutionOnChanged = new BehaviorSubject({});
      this.entrepriseOnChanged = new BehaviorSubject({});

      this.data = JSON.parse(sessionStorage.getItem(USER_KEY));
     // console.log(this.data);
      this.userId = this.data.id;
      this.userRole = this.data.roles;
      console.log(this.userRole.includes("PARTICIPANT"));
      if (this.userRole.includes("PARTICIPANT"))
          this.getParticipantById(this.userId);
      if (this.userRole.includes("TRAINER"))
          this.getTrainerById(this.userId);
      if (this.userRole.includes("ENTREPRISE"))
          this.getEntrepriseById(this.userId);
      if (this.userRole.includes("INSTITUTION"))
          this.getInstitutionById(this.userId);
  }
*/
  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
 /* resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      console.log(this.userId);
      if (this.userRole.includes("PARTICIPANT")) {
          return new Promise((resolve, reject) => {
              Promise.all([
                  
                  this.getParticipantById(this.userId)
              ]).then(
                  () => {
                      resolve();
                  },
                  reject
              );
          });
      }
      if (this.userRole.includes("TRAINER")) {
          return new Promise((resolve, reject) => {
              Promise.all([
                  this.getTrainerById(this.userId),
              ]).then(
                  () => {
                      resolve();
                  },
                  reject
              );
          });
      }
      if (this.userRole.includes("ENTREPRISE")) {
          return new Promise((resolve, reject) => {
              Promise.all([
                  this.getEntrepriseById(this.userId),
              ]).then(
                  () => {
                      resolve();
                  },
                  reject
              );
          });
      }
      if (this.userRole.includes("INSTITUTION")) {
          return new Promise((resolve, reject) => {
              Promise.all([
                  this.getInstitutionById(this.userId),
              ]).then(
                  () => {
                      resolve();
                  },
                  reject
              );
          });
      }

    
  }

  

  getParticipantById(id): Promise<any> {


      return new Promise((resolve, reject) => {
          this._httpClient.get(AUTH_API + 'participants/' + id)
              .subscribe((response: any) => {


                  this.participant = response;
                  this.participantOnChanged.next(this.participant);
                  console.log(this.participant);
                  resolve(response);
              }, reject);
      }
      );
  }

  getInstitutionById(id): Promise<any> {


      return new Promise((resolve, reject) => {
          this._httpClient.get(AUTH_API + 'institutions/' + id)
              .subscribe((response: any) => {


                  this.institution = response;
                  this.institutionOnChanged.next(this.institution);
                  console.log(this.institution);
                  resolve(this.institution);
              }, reject);
      }
      );
  }

  getEntrepriseById(id): Promise<any> {


      return new Promise((resolve, reject) => {
          this._httpClient.get(AUTH_API + 'entreprises/' + id)
              .subscribe((response: any) => {


                  this.entreprise = response;
                  this.entrepriseOnChanged.next(this.entreprise);
                  console.log(this.entreprise);
                  resolve(this.entreprise);
              }, reject);
      }
      );
  }


  getTrainerById(id): Promise<any> {
      

      return new Promise((resolve, reject) => {
          this._httpClient.get(AUTH_API + 'trainers/' + id)
              .subscribe((response: any) => {
                console.log("trianer in get");
                console.log(response);

                  this.trainer = response;
                  this.trainerOnChanged.next(this.trainer);
                  resolve(this.trainer);
              }, reject);
      }
      );
  }




}*/
