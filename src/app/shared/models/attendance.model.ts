
export class Attendance {
    id: number ; 
    participant : any ; 
    session : any ; 
    attendanceState : any ; 

    /**
     * Constructor
     *
     * @param attendance
     */
     constructor(attendance) {
        {
            this.id = attendance.id || '';
            this.participant = attendance.participant || '';
            this.session = attendance.session || '';
            this.attendanceState = attendance.attendanceState || '';
        }
    }


}