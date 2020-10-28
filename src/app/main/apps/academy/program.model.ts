import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';

export class Program{

    id: number;
    programName:string;
    nbDaysProg: number;


    actions?: CalendarEventAction[];
    
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        notes: string
    };



    constructor(program)
    {
       // cursus = cursus || {};
        this.id = program.id;
        this.programName = program.programName || '';
        this.nbDaysProg = program.nbDaysProg || '';
        

        
        this.draggable = program.draggable;
        this.resizable = {
            beforeStart: program.resizable && program.resizable.beforeStart || true,
            afterEnd   : program.resizable && program.resizable.afterEnd || true
        };
        this.actions = program.actions || [];
        
        this.cssClass = program.cssClass || '';
        this.meta = {
            location: program.meta && program.meta.location || '',
            notes   : program.meta && program.meta.notes || ''
        };
    }
}
