import { FuseUtils } from '@fuse/utils';

/*export class Training
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

    /**
     * Constructor
     *
     * @param contact
     
    constructor(training)
    {
        {
            this.id = training.id ||FuseUtils.generateGUID();
            this.name = training.name || '';
            this.lastName = training.lastName || '';
            this.avatar = training.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = training.nickname || '';
            this.company = training.company || '';
            this.jobTitle = training.jobTitle || '';
            this.email = training.email || '';
            this.phone = training.phone || '';
            this.address = training.address || '';
            this.birthday = training.birthday || '';
            this.notes = training.notes || '';
        }
    }
}
*/

export class Training
{
    id: any;
    courseName: string;
    content: string;
    theme: string;
    nbmaxParticipants: number;
    fees: number;
    cursus:any  ;
    
    /**
     * Constructor
     *
     * @param training
     */
    constructor(training)
    {
        {
            this.id = training.id ;
            this.courseName = training.courseName || '';
            this.content = training.content || '';
            this.theme = training.theme || '';
            this.nbmaxParticipants = training.nbmaxParticipants || '';
            this.fees = training.fees || '';
            this.cursus=training.cursus|| '' ; 
        
        }
    }
}
