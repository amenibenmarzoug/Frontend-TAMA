import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AttendanceParticipantService } from './attendance-participant.service';

@Component({
  selector: 'app-attendance-participant',
  templateUrl: './attendance-participant.component.html',
  styleUrls: ['./attendance-participant.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AttendanceParticipantComponent implements OnInit {

  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  presencesNumber: any;
  absencesNumber: any ; 
  justifiedAbsencesNumber : any ; 


  constructor(     private attendanceService: AttendanceParticipantService,
    ) { 
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
    


  }

  ngOnInit(): void {
    this.searchInput.valueChanges
    .pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(searchText => {
      this.attendanceService.onSearchTextChanged.next(searchText);
    });

    this.attendanceService.onPresenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.presencesNumber = number;
    });
    
    this.attendanceService.onAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.absencesNumber = number;
    });

    this.attendanceService.onJustifiedAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.justifiedAbsencesNumber = number;
    });

  }
 

}
