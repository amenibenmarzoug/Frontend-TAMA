import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';
import { Entreprise } from '../../entreprises/entreprise.model';


export class Disponibility{

    id: number;
    day:string;
     time: string;
    entreprise:any;




    constructor(disponibility)
    {
       // cursus = cursus || {};
        this.id = disponibility.id ||'' ;
        this.day = disponibility.day || '';
        this.time = disponibility.time || '';
        this.entreprise = disponibility.entreprise || '';
    }
}
