
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
     * @param session*/

    constructor(session) {
        {
            this.id = session.id;// || FuseUtils.generateGUID();
            this.classRoom = session.classRoom ;
            this.sessionBeginDate = new Date(session.sessionBeginDate) || startOfDay(new Date());
            this.sessionName = session.sessionName || '';
            this.themeDetailInstance = session.themeDetailInstance || '';
            this.sessionEndDate = new Date(session.sessionEndDate) || endOfDay(new Date());;
            this.trainer = session.trainer || null;
            this.group = session.group || null;


        }
    }
}

