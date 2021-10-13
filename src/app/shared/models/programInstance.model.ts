
import { Program } from './program.model';

// used to be named programInst
export class ProgramInstance{

    id: number;
    programInstanceName: string;
    nbDaysProgInst: number;
    location:string;
    program:Program;
    beginDate:Date;
    endDate:Date;
    validated:boolean;
    place: string;
   


    constructor(programInstance)
    {
       // cursus = cursus || {};
        this.id = programInstance.id  || '';
        this.programInstanceName=programInstance.programInstanceName || '';
        this.nbDaysProgInst=programInstance.nbDaysProgInst || '';
        this.location = programInstance.location || '';
        this.program = programInstance.program || '';
        this.beginDate=programInstance.beginDate;
        this.endDate=programInstance.endDate;
        this.validated=programInstance.validated || '';
        this.place=programInstance.place || '';
        

    
    }
}
