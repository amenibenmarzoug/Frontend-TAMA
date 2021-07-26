export class Trainer {
    _id : string;
    email : string;
    password : string;
    phoneNumber : string;
    //address : string;
    street: string;
    city: string;
    postalCode:string;
    role : string;
    firstName : string;
    lastName: string;
    specification: string;
	gender : string;
    validated : boolean;
    field  : string ; 
    constructor(){
        this.validated = false;
    }
}