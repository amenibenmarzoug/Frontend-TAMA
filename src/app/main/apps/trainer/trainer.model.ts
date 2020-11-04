import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    specifications: string;
    email: string;
    password : string;
    phoneNumber: string;
    gender: string;
    //address: string;
    street: string;
    city: string;
    postalCode: string
    disponibilityDays:any;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.firstName = contact.firstName || '';
            this.lastName = contact.lastName || '';
            this.avatar = 'assets/images/avatars/profile.jpg';
            this.specifications = contact.specifications || '';
            this.email = contact.email || '';
            this.password = contact.password ;
            this.phoneNumber = contact.phoneNumber || '';
            //this.address = contact.address || '';
            this.gender = contact.gender || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
            this.disponibilityDays=contact.disponibilityDays || '';
        }
    }
}
