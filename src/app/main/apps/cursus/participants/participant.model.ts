import { FuseUtils } from '@fuse/utils';

export class MyParticipant {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    street: string;
    city: string;
    postalCode: string;
    role: string;
    firstNameP: string;
    lastNameP: string;
    gender: string;
    birthday: Date;
    currentPosition: string;
    level: string;
    abandon: boolean;
    entreprise: any;
    educationLevel: string;
    validated: boolean;
    cursus: any;

    notes: string;
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
            this.entreprise = contact.entreprise || '';
            // this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phoneNumber = contact.phoneNumber || '';
            // this.address = contact.address || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
            this.birthday = contact.birthday || '';
            this.notes = contact.notes || '';
            this.educationLevel = contact.educationLevel || '';
            this.abandon = contact.abandon || '';
            this.gender = contact.gender || '';
            this.level = contact.level || '';
            this.validated = contact.validated || '';
            // this.cursus = contact.cursus;
        }
    }
}
