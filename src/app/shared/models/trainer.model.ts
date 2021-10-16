
export class Trainer
{
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    specifications: string[];
    email: string;
    password : string;
    phoneNumber: string;
    gender: string;
    street: string;
    city: string;
    postalCode: string
    disponibilityDays:any;
    validated : any

    /**
     * Constructor
     *
     * @param trainer
     */
    constructor(trainer)
    {
        {
            this.id = trainer.id ||'';
            this.firstName = trainer.firstName || '';
            this.lastName = trainer.lastName || '';
            this.avatar = 'assets/images/avatars/profile.jpg';
            this.specifications = trainer.specifications || '';
            this.email = trainer.email || '';
            this.password = trainer.password ;
            this.phoneNumber = trainer.phoneNumber || '';
            this.validated = trainer.validated || '';
            this.gender = trainer.gender || '';
            this.street = trainer.street || '';
            this.city = trainer.city || '';
            this.postalCode = trainer.postalCode || '';
            this.disponibilityDays=trainer.disponibilityDays || '';
        }
    }
}
