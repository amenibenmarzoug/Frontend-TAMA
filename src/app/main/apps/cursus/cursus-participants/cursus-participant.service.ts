import { Injectable, EventEmitter,  } from "@angular/core";
import { List } from "lodash";
@Injectable()
export class CursusParticipantService {
    // 1
    par: any[];
     
     
    receivedFilter: EventEmitter<any[]>;
    constructor() {
        this.receivedFilter = new EventEmitter<any[]>();
    }
    // 2
    raiseEvent(par:any[]): void {
        this.par = par ;
        this.receivedFilter.emit(par);
    }
}