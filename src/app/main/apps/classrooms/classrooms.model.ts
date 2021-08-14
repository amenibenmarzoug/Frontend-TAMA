import { FuseUtils } from '@fuse/utils';

export class MyClasses {
    id: number;
    avatar: string;
    classRoomName: string;
    capacity: number;
    institution: any;
    fees : number;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact) {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.avatar = 'assets/images/avatars/institution.png';
            this.classRoomName = contact.classRoomName || '';
            this.capacity = contact.capacity || '';
            this.institution = contact.institution;
            this.fees= contact.fees || '';

        }
    }
}
