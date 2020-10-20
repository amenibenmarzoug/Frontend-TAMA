import { FuseUtils } from '@fuse/utils';

export class MyEquipments
{
    id: Number;
    avatar: string;
    equipmentName:string;
    quantity: number;
    classroom:any;

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
            this.equipmentName= contact.equipmentName || '';
            this.quantity = contact.quantity || '' ;
            this.classroom=contact.classroom;
            
        }
    }
}
