import { FuseUtils } from '@fuse/utils';
import { startOfDay, endOfDay } from 'date-fns';


export class Session {
    id: number;
    classRoom: any;

    themeDetailInstance: any;
    sessionBeginDate: Date;
    sessionName: string;
    sessionEndDate: Date;
    dateCourse: Date;
    group: any;
    trainer: any;



    /**
     * Constructor
     *
     * @param contact*/

    constructor(contact) {
        {
            this.id = contact.id;// || FuseUtils.generateGUID();
            this.classRoom = contact.classRoom || '';

            this.sessionBeginDate = new Date(contact.sessionBeginDate) || startOfDay(new Date());
            //this.institutionName= contact.classRoom.institution.institutionName || '';
            //this.city=contact.classRoom.institution.city || '';
            this.sessionName = contact.sessionName || '';
            this.themeDetailInstance = contact.themeDetailInstance || '';
            this.sessionEndDate = new Date(contact.sessionEndDate) || endOfDay(new Date());;
            this.trainer = contact.trainer || null;
            this.group = contact.group || null;


        }
    }
}

