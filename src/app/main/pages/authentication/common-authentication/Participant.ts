export class Participant {
    _id : string;
    email : string;
    password : string;
    phoneNumber : string;
    address : string;
    role : string;
	firstName : string;
	lastName: string;
	gender : string;
    birthdate : Date
    currentPosition:string ;
    level : string ; 
    abandon :boolean ; 

    
    isVerified : boolean;
    constructor(){
        this.isVerified = false;
    }
}