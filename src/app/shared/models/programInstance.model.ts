
import { Program } from './program.model';
import { FuseUtils } from '../../../@fuse/utils'; 

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
        this.id = programInstance.id  ||  FuseUtils.generateGUID();;
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


