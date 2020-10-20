export class Institution {
    _id : string;
    email : string;
    password : string;
    phoneNumber : string;
    address : string;
    role : string;
	name : string;
    isVerified : boolean;
    constructor(){
        this.isVerified = false;
    }
}