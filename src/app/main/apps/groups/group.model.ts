import { FuseUtils } from '@fuse/utils';

export class Group
{
    id: number;
    groupName: string;


    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id ;
            this.groupName = contact.groupName || '';

        }
    }
}
