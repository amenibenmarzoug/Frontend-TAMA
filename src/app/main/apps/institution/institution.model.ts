import { FuseUtils } from '@fuse/utils';

export class Contact
{
    id: number;
    avatar: string;
    institutionName:string;
    email: string;
    password : string;
    phoneNumber: string;
    street: string;
    city: string;
    postalCode: string

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || '';
            this.avatar = 'assets/images/avatars/institution.png';
            this.institutionName= contact.institutionName || '';
            this.email = contact.email || '';
            this.password = contact.password ;
            this.phoneNumber = contact.phoneNumber || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
        }
    }
}
