import { Injectable, EventEmitter,  } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CursusTrainingService {

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
