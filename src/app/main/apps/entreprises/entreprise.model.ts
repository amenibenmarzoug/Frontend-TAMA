import { FuseUtils } from '@fuse/utils';

export class Entreprise
{
    id: Number;
    email : string;
    password : string;
    phoneNumber : string;
    street: string;
    city: string;
    postalCode: string
    roles : string [];
    enterpriseName: string;
    website : string ;
    notes : string ;
    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || '';
            this.enterpriseName = contact.enterpriseName || '';
            this.website = contact.website || '';
            this.password = contact.password || '';
            this.phoneNumber = contact.phoneNumber || '';
            this.email = contact.email || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
            this.roles = contact.roles || '';

           
        }
    }
}
