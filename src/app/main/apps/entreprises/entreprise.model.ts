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
    managerFirstName:string;
    managerLastName:string;
    managerPosition:string;
    nbMinParticipants:number;
    notes : string ;
    programInstance:any;
    validated : boolean ;
    provider : boolean ;

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
            //this.password = contact.password || '';
            this.phoneNumber = contact.phoneNumber || '';
            this.email = contact.email || '';
            this.managerFirstName=contact.managerFirstName || '';
            this.managerLastName=contact.managerLastName || '';
            this.street = contact.street || '';
            this.city = contact.city || '';
            this.postalCode = contact.postalCode || '';
            //this.roles = contact.roles || '';
            this.programInstance=contact.programInstance || null ;
            this.validated = contact.validated || '';
            this.managerPosition=contact.managerPosition || '';
            this.nbMinParticipants=contact.nbMinParticipants || '';
            this.provider = contact.provider || '';

           
        }
    }
}
