export class User {
    _id : string;
    email : string;
    password : string;
    firstname : string;
    lastname : string;
    birthdate : Date;
    isVerified : boolean;

    constructor(){
       
        this.isVerified = false;
    }
}
