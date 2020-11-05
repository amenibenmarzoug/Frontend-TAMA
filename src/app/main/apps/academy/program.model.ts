import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';

export class Program{

    id: number;
    programName:string;
    nbDaysProg: number;


   


    constructor(program)
    {
       // cursus = cursus || {};
        this.id = program.id;
        this.programName = program.programName || '';
        this.nbDaysProg = program.nbDaysProg || '';
        

    
    }
}
