import { FuseUtils } from '@fuse/utils';

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
    birthYear : number ;
    currentPosition: string;
    level: string;
    abandon: boolean;
    validated: boolean;
    entreprise: any;
    programInstance: any;
    educationLevel: string;
    experience: number; 
    // cursus: any;
    notes: string;
   // age: number;
    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact) {
       
        {
            this.id = contact.id || '';
            this.firstNameP = contact.firstNameP || '';
            this.lastNameP = contact.lastNameP || '';
            // this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.currentPosition = contact.currentPosition || '';
            this.entreprise = contact.entreprise || null;
            this.programInstance = contact.programInstance || null;
            // this.cursus = contact.cursus || null;
            // this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phoneNumber = contact.phoneNumber || '';
            // this.address = contact.address || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
            this.birthday = contact.birthday || '';
            this.birthYear = contact.birthYear || '';
            this.notes = contact.notes || '';
            this.educationLevel = contact.educationLevel || '';
            this.abandon = contact.abandon || '';
            this.gender = contact.gender || '';
            this.level = contact.level || '';
            this.validated = contact.validated || '';
            this.experience= contact.experience || '';
            //this.age= contact.birthday.getFullYear()
            // this.password = contact.password;
        }
    }
}
