import { FuseUtils } from '@fuse/utils';
//import { Training } from '../trainings/training.model';
import { startOfDay, endOfDay } from 'date-fns';
import { MyClasses } from '../../classrooms/classrooms.model';


export class CourseSession
{
    id: number;
    classRoom:MyClasses;
    institution: any;
    city:string;
    //course:Training;
    institutionName:string;
    courseSessionBeginDate: Date;
    courseSessionName: string;
    courseSessionEndDate: Date;
    dateCourse: Date ; 
 


    /**
     * Constructor
     *
     * @param contact*/
     
    constructor(contact)
    {
        {
            this.id = contact.id;// || FuseUtils.generateGUID();
            this.classRoom= contact.classRoom||'';
            this.institution=contact.institution ||''; 
            this.courseSessionBeginDate= new Date(contact.courseSessionBeginDate)|| startOfDay(new Date());
            //this.institutionName= contact.classRoom.institution.institutionName || '';
            //this.city=contact.classRoom.institution.city || '';
            this.courseSessionName=contact.courseSessionName || '';
            //this.course=contact.course || '';
            this.courseSessionEndDate= new Date(contact.courseSessionEndDate)|| endOfDay(new Date());;
           
          

        }
    }
}

/*import { FuseUtils } from '@fuse/utils';

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
   courseSessionEndDate: string;
  /* idTrainerDisponibility: number;
   trainer: any;
   courseSession: any;
   disponibility:boolean;*/


    /**
     * Constructor
     *
     * @param contact
     
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
            this.courseSessionEndDate=new Date( contact.courseSessionEndDate).toISOString() || '';
           
          

        }
    }
}*/