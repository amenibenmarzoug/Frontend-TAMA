import { FuseUtils } from '@fuse/utils';

export class MyClasses
{
    id: Number;
    avatar: string;
    classRoomName:string;
    capacity: number;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.avatar = 'assets/images/avatars/institution.png';
            this.classRoomName= contact.classRoomName || '';
            this.capacity = contact.capacity || '' ;
            
        }
    }
}
