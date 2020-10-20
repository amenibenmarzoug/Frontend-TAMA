import { FuseUtils } from '@fuse/utils';
import { Institution } from 'app/main/apps/academy/course-session/institution.model';


export class ClassRoom
{
    id: number;
    institution: Institution;
    classRoomName:any ; 


    /**
     * Constructor
     *
     * @param contact*/
     
    constructor(contact)
    {
        {
            this.id = contact.id ||FuseUtils.generateId();
            this.classRoomName= contact.classRoomName||'';
            this.institution=contact.institution ||''; 
         
           
          

        }
    }
}
