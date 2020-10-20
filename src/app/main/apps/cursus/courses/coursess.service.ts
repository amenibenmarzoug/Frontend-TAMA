import { Injectable, EventEmitter,  } from "@angular/core";
import { List } from "lodash";
@Injectable({providedIn:"root"})
export class CursusCoursessService {
    // 1
   cursusId:number ;
     
     
    receivedFilter: EventEmitter<number>;
    constructor() {
        this.receivedFilter = new EventEmitter<number>();
    }
    // 2
    raiseEvent(cursusId:number): void {
        console.log("emittinggg") ;
        this.cursusId =cursusId ;
        this.receivedFilter.emit(cursusId);
    }
}