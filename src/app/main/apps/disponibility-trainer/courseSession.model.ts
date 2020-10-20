import { FuseUtils } from '@fuse/utils';

export class CourseSession
{
    id: number;
    classRoom:any;
    institution:any;
    city:string;
    course:any;
    institutionName:string;
    courseSessionBeginDate: string;
    courseSessionName: string;
   // courseSessionEndDate: Date;
  /* idTrainerDisponibility: number;
   trainer: any;
   courseSession: any;
   disponibility:boolean;*/


    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.classRoom= contact.classRoom;
            this.courseSessionBeginDate= new Date(contact.courseSessionBeginDate).toISOString() || '';
            this.institutionName= contact.classRoom.institution.institutionName || '';
            this.city=contact.classRoom.institution.city || '';
            this.courseSessionName=contact.courseSessionName || '';
            this.course=contact.course || '';
            //this.courseSessionEndDate= contact.courseSessionEndDate || '';
           
          

        }
    }
}
