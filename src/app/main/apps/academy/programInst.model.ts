import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { Program } from '../academy/program.model';
import { FuseUtils } from '@fuse/utils';


export class ProgramInst{

    id: number;
    programInstName: string;
    nbDaysProgInst: number;
    location:string;
    program:Program;
    BeginDate:Date;
    endDate:Date;
   


    constructor(programInst)
    {
       // cursus = cursus || {};
        this.id = programInst.id  || FuseUtils.generateGUID();
        this.programInstName=programInst.programInstName || '';
        this.nbDaysProgInst=programInst.nbDaysProgInst || '';
        this.location = programInst.location || '';
        this.program = programInst.program || '';
        this.BeginDate=programInst.dateDebut || '';
        this.endDate=programInst.endDate || '';
        

    
    }
}
