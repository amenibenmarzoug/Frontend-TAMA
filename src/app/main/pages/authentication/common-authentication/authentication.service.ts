// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// //import { environment } from '@environments/environment';

// import { User } from './User';

// @Injectable({ providedIn: 'root' })
// export class AuthenticationService {
//     private currentUserSubject: BehaviorSubject<User>;
//     public currentUser: Observable<User>;

//     constructor(private http: HttpClient) {
//         this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
//         this.currentUser = this.currentUserSubject.asObservable();

//     }

//     public get currentUserValue(): User {
//         //console.log(this.currentUserSubject.value) ;

//         return this.currentUserSubject.value;

//     }

//     login(email: string, password: string) {
//        // console.log(email) ; 
//         return this.http.post<any>(`http://localhost:4000/users/authenticate`, { email, password })
//             .pipe(map(user => {
//                 console.log (email) ;
//                 // login successful if there's a jwt token in the response
//                 if (user && user.token) {
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     localStorage.setItem('currentUser', JSON.stringify(user));
//                     this.currentUserSubject.next(user);
//                 }

//                 return user;
//             }));
//     }

//     logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//         this.currentUserSubject.next(null);
//     }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements Resolve<any>{

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

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.value.email,
      password: credentials.value.password

    }
      , httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      //address: user.address,
      street: user.street,
      city: user.city,
      postalCode: user.postalCode,
      role: user.role
    }, httpOptions);
  }
  registerParticipant(participant): Observable<any> {


    console.log(participant.value.firstNameP)
    return this.http.post(AUTH_API + 'signupParticipant', {
      email: participant.value.email,
      password: participant.value.phoneNumber,
      phoneNumber: participant.value.phoneNumber,
      //address: user.value.street,
      street: participant.value.street,
      city: participant.value.city,
      postalCode: participant.value.postalCode,
      //role: participant.role,
      firstName: participant.value.firstNameP,
      lastName: participant.value.lastNameP,
      gender: participant.value.gender,
      birthday: participant.value.birthday,
      programInstance:participant.value.classe,
      educationLevel:participant.value.educationLevel,
      company:participant.value.company,
      currentPosition:participant.value.currentPosition,
      experience : participant.value.experience,
      level:participant.value.level,
      

    }, httpOptions);

  }
  registerTrainer(trainer, user): Observable<any> {
    console.log("trainer specification");
    console.log(user.value.specification);
    return this.http.post(AUTH_API + 'signup', {
      email: user.value.email,
      password: user.value.password,
      phoneNumber: user.value.phoneNumber,
      //address: user.value.street+ ", " + user.value.city+", " +user.value.postalCode,
      street: user.value.street,
      city: user.value.city,
      postalCode: user.value.postalCode,
      //role: trainer.role,
      firstName: trainer.value.firstNameT,
      lastName: trainer.value.lastNameT,
      //specification: trainer.value.specification,
      gender: trainer.value.genderT,
    }, httpOptions);

  }
  registerEnterprise(entreprise, user): Observable<any> {
    
    return this.http.post(AUTH_API + 'signupEnterprise', {
      email: user.value.email,
      password: user.value.password,
      phoneNumber: user.value.phoneNumber,
      //address: user.value.street,
      street: user.value.street,
      city: user.value.city,
      postalCode: user.value.postalCode,
      // role: entreprise.value.role,
      enterpriseName: entreprise.value.nameE,
      website: entreprise.value.webSite,
      managerFirstName: entreprise.value.firstNameP,
      managerLastName: entreprise.value.lastNameP,
      managerPosition:entreprise.value.positionM,
      nbMinParticipants:entreprise.value.participNumber,
      programInstance: entreprise.value.classe,
      provider: entreprise.value.provider,
    }, httpOptions);
  }

  registerInstitution(institution, user): Observable<any> {
    console.log("institu NAME");
    console.log(institution.value.nameI);
    return this.http.post(AUTH_API + 'signupInstitution', {
      email: user.value.email,
      password: user.value.password,
      phoneNumber: user.value.phoneNumber,
      //address: user.value.street,
      street: user.value.street,
      city: user.value.city,
      postalCode: user.value.postalCode,
      //role: institution.role,
      institutionName: institution.value.nameI,
    }, httpOptions);
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
