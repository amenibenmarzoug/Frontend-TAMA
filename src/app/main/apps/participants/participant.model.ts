

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
    age: string
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
            if (contact.birthday != null) {
                this.birthday = contact.birthday || '';

            }
            else {
                this.birthday = new Date();
            }
            this.notes = contact.notes || '';
            this.educationLevel = contact.educationLevel || '';
            this.abandon = contact.abandon || '';
            this.gender = contact.gender || '';
            this.level = contact.level || '';
            this.validated = contact.validated || '';
            this.experience = contact.experience || '';
            this.status = contact.status || '';
            this.age = contact.age || '';
            //this.age= contact.birthday.getFullYear()
            // this.password = contact.password;
        }
    }
}
