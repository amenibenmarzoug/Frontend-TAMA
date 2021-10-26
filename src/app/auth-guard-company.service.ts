import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenStorageService } from './main/pages/authentication/common-authentication/token-storage.service';



@Injectable()
export class AuthGuardCompanyService implements CanActivate {

    token:string=null;
    roles:any[]=[];
    routeURL: string;
    isLoggedIn:boolean;

    constructor(private router: Router,private tokenStorage: TokenStorageService) {
        this.routeURL = this.router.url;
    }

   
    canActivate(): Promise<boolean>  {
        this.token=this.tokenStorage.getToken();
        this.roles=this.tokenStorage.getUser().roles;
        if((this.token!="")&& (this.token!=null)&& (this.roles.includes("ENTREPRISE"))){
            return new Promise((resolve, reject) => {
                return resolve(true);
            });
        }
        else{
            return new Promise((resolve, reject) => {
                //this.token=null;
                alert("Vous n'êtes pas autorisé à voir cette page! Vous êtes redirigé vers la page de Login");
                this.tokenStorage.signOut();
                this.router.navigate(['pages/auth/login-2']);
                return resolve(false);
            });
        }

    
    }
  }