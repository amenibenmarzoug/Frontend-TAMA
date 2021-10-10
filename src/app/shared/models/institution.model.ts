
export class Institution
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
     * @param institution
     */
    constructor(institution)
    {
        {
            this.id = institution.id || '';
            this.avatar = 'assets/images/avatars/institution.png';
            this.institutionName= institution.institutionName || '';
            this.email = institution.email || '';
            this.password = institution.password ;
            this.phoneNumber = institution.phoneNumber || '';
            this.street = institution.street || '';
            this.city = institution.city || '';
            this.postalCode = institution.postalCode || '';
        }
    }
}
