import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';

/*export class Cursus
{
    
    start: Date;
    end?: Date;
    title: string;
    trainings:Array<String> ; 
    
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

    /**
     * Constructor
     *
     * @param data
     */
    /*constructor(data)
    {
        data = data || {};
        this.start = new Date(data.start) || startOfDay(new Date());
        this.end = new Date(data.end) || endOfDay(new Date());
        this.title = data.title || '';
        this.trainings=data.trainings||["f1"]
        this.draggable = data.draggable;
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd   : data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        
        this.cssClass = data.cssClass || '';
        this.meta = {
            location: data.meta && data.meta.location || '',
            notes   : data.meta && data.meta.notes || ''
        };
    }
}*/

export class Cursus{

    id: number;
    cursusName:string;
    cursusBeginDate: Date;
    cursusEndDate: Date;


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



    constructor(cursus)
    {
       // cursus = cursus || {};
        this.id = cursus.id;
        this.cursusName = cursus.cursusName || '';
        this.cursusBeginDate = new Date(cursus.cursusBeginDate) || startOfDay(new Date());
        this.cursusEndDate = new Date(cursus.cursusEndDate) || endOfDay(new Date());

        
        this.draggable = cursus.draggable;
        this.resizable = {
            beforeStart: cursus.resizable && cursus.resizable.beforeStart || true,
            afterEnd   : cursus.resizable && cursus.resizable.afterEnd || true
        };
        this.actions = cursus.actions || [];
        
        this.cssClass = cursus.cssClass || '';
        this.meta = {
            location: cursus.meta && cursus.meta.location || '',
            notes   : cursus.meta && cursus.meta.notes || ''
        };
    }
}
