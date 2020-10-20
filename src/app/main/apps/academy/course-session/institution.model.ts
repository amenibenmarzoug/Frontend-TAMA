//import { FuseUtils } from '@fuse/utils';


export class Institution
{
    institutionName:any;
    city:string;
   
 


    /**
     * Constructor
     *
     * @param contact*/
     
    constructor(contact)
    {
        {
            //this.id = contact.id ||'';//FuseUtils.generateId();
            this.institutionName= contact.institutionName || '';
            this.city=contact.city || '';
            
           
          

        }
    }
}