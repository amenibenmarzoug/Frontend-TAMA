import { FuseUtils } from '@fuse/utils';
//import { Training } from '../trainings/training.model';
import { startOfDay, endOfDay } from 'date-fns';


export class EventCourseSession
{
    
    event:any;
    courseSession: any;
 


    /**
     * Constructor
     *
     * @param event,@param courseSession*/
     
    constructor(event,courseSession)
    {
       
            this.event=event;
            this.courseSession= courseSession;
            //this.institutionName= contact.classRoom.institution.institutionName || '';
            //this.city=contact.classRoom.institution.city || '';
           
    }

}
