
//shoulb be fixed as Classroom in both front and back
export class ClassRoom {
    id: number;
    avatar: string;
    classRoomName: string;
    capacity: number;
    institution: any;
    fees : number;

    /**
     * Constructor
     *
     * @param classroom
     */
    constructor(classroom) {
        {
            this.id = classroom.id || '';
            this.avatar = 'assets/images/avatars/institution.png';
            this.classRoomName = classroom.classRoomName || '';
            this.capacity = classroom.capacity || '';
            this.institution = classroom.institution;
            this.fees= classroom.fees || '';

        }
    }
}
