export class Entreprise {
    _id : string;
    email : string;
    password : string;
    phoneNumber : string;
    address : string;
    role : string;
	name : string;
	webSite: string;
    isVerified : boolean;
    website : string ; 
    constructor(){
        this.isVerified = false;
    }
}
