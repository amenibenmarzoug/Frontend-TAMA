import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { Program } from '../academy/program.model';


export class ProgramInst{

    id: number;
    programInstName: string;
    nbDaysProgInst: number;
    location:string;
    program:Program;

   


    constructor(programInst)
    {
       // cursus = cursus || {};
        this.id = programInst.id;
        this.programInstName=programInst.programInstName || '';
        this.nbDaysProgInst=programInst.nbDaysProgInst || '';
        this.location = programInst.location || '';
        this.program = programInst.program || '';
        

    
    }
}
