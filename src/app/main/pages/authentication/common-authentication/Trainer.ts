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
    isVerified : boolean;
    field  : string ; 
    constructor(){
        this.isVerified = false;
    }
}