
//used to be MyEquipments
export class Equipment
{
    id: Number;
    avatar: string;
    equipmentName:string;
    quantity: number;
    classroom:any;

    /**
     * Constructor
     *
     * @param equipment
     */
    constructor(equipment)
    {
        {
            this.id = equipment.id || '';
            this.avatar = 'assets/images/avatars/institution.png';
            this.equipmentName= equipment.equipmentName || '';
            this.quantity = equipment.quantity || '' ;
            this.classroom=equipment.classroom;
            
        }
    }
}
