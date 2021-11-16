

//used to be named ENTREPRISE
export class Enterprise
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
     * @param enterprise
     */
    constructor(enterprise)
    {
        {
            this.id = enterprise.id || '';
            this.enterpriseName = enterprise.enterpriseName || '';
            this.website = enterprise.website || '';
            this.phoneNumber = enterprise.phoneNumber || '';
            this.email = enterprise.email || '';
            this.managerFirstName=enterprise.managerFirstName || '';
            this.managerLastName=enterprise.managerLastName || '';
            this.street = enterprise.street || '';
            this.city = enterprise.city || '';
            this.postalCode = enterprise.postalCode || '';
            this.programInstance=enterprise.programInstance || null;
            this.validated = enterprise.validated || '';
            this.managerPosition=enterprise.managerPosition || '';
            this.nbMinParticipants=enterprise.nbMinParticipants || '';
            this.provider = enterprise.provider || '';

           
        }
    }
}
