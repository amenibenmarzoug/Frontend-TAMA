
export class Participant {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    street: string;
    city: string;
    postalCode: string;
    roles: string[];
    firstNameP: string;
    lastNameP: string;
    gender: string;
    birthday: Date;
    currentPosition: string;
    level: string;
    abandon: boolean;
    validated: boolean;
    entreprise: any;
    programInstance: any;
    educationLevel: string;
    experience: number; 
    status: string;
    notes: string;
    age:string ; 



    

    /**
     * Constructor
     *
     * @param participant
     */
    constructor(participant) {
       
        {
            this.id = participant.id || '';
            this.firstNameP = participant.firstNameP || '';
            this.lastNameP = participant.lastNameP || '';
            this.currentPosition = participant.currentPosition || '';
            this.entreprise = participant.entreprise || null;
            this.programInstance = participant.programInstance || null;
            this.email = participant.email || '';
            this.phoneNumber = participant.phoneNumber || '';
            this.street = participant.street || '';
            this.city = participant.city || '';
            this.postalCode = participant.postalCode || '';
            this.birthday = participant.birthday || '';
            this.notes = participant.notes || '';
            this.educationLevel = participant.educationLevel || '';
            this.abandon = participant.abandon || '';
            this.gender = participant.gender || '';
            this.level = participant.level || '';
            this.validated = participant.validated || '';
            this.experience= participant.experience || '';
            this.status= participant.status || '';
            this.age=participant.age || '';

        }
    }
}


