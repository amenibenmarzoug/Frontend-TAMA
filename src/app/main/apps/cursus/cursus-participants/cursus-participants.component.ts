import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CursusParticipantsService } from '../cursus-participants.service';
import { fuseAnimations } from '@fuse/animations';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { MatListOption } from '@angular/material/list';



import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


import { CursusCoursesService } from 'app/main/apps/cursus/courses.service';
import { SelectorListContext } from '@angular/compiler';
import { ParticipantsService } from '../participants.service';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantFormComponent } from 'app/main/apps/cursus/participants/participant-form/participant-form.component';
import { MyParticipant } from '../participants/participant.model';
import { Disponibility } from './disponibility.model';
import { Router } from '@angular/router';
import { CursusParticipantService } from './cursus-participant.service';
import { CursusCoursessService } from '../courses/coursess.service';
import { CursusCoursesComponent } from '../courses/courses.component';
import { TokenStorageService } from 'app/main/pages/authentication/common-authentication/token-storage.service';





const USER_KEY = 'auth-user';

@Component({
  selector: 'app-cursus-participants',
  templateUrl: './cursus-participants.component.html',
  styleUrls: ['./cursus-participants.component.scss'],
  animations   : fuseAnimations
})
export class CursusParticipantsComponent implements OnInit {
//day= new FormControl();
  
  
  selectedOptions: SelectorListContext;
  dialogRef: any;
  onContactsChanged: BehaviorSubject<any>;

  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  options1: MatListOption[];
  cursusid: number;
  test: boolean
  contacts: MyParticipant[];
  id: Number;
  disponibility: Disponibility
   y =10 ;

  par: any[] = [];
  cursusId: number;

//
   private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    email: string;


  // Private
  private _unsubscribeAll: Subject<any>;



  constructor(private _formBuilder: FormBuilder,
    private _academyCoursesService: CursusCoursesService,
   private serviceCursusId : CursusCoursessService ,
    private serv: CursusParticipantService ,
    private router: Router,
    private _contactsService: ParticipantsService,
    private tokenStorageService: TokenStorageService ,
    private _matDialog: MatDialog
  ) {
     this._unsubscribeAll = new Subject();
     this.onContactsChanged = new BehaviorSubject([]);
     this.cursusId=0  ;
    //this.y=5 ;
    let that =this ;
    this.serviceCursusId.receivedFilter.subscribe((param: number) => {
      that.cursusId = param;
     // console.log("recieved"); 
     
      that .f(param) ;
     // 
     console.log("recieved"); 
     
    })
 }

  ngOnInit(): void {
  
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('TRAINER');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.email = user.email;
    }
   
    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this._formBuilder.group({

      day: [ '', Validators.required],
     //day:new FormControl() ,
      time: ['', Validators.required],
      id: [''],
      entreprise: ['']
    });

    this.horizontalStepperStep2 = this._formBuilder.group({
      // address: ['', Validators.required],
      maliste: ['']

    });
    // console.log(this.horizontalStepperStep2);

    this.horizontalStepperStep3 = this._formBuilder.group({
      //city      : ['', Validators.required],
      //state     : ['', Validators.required],
      //postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    });


  }
  days: String[] = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'

  ];
  times: String[] = [
    'Matin', 'Après-midi', 'soir'

  ];

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their value
    this.options1 = options.map(o => o.value);
    //console.log("options    "+options);
    console.log(options.map(o => o.value));


  }
  f(x){
    console.log("f") ;
    console.log(x) ;
    this.cursusId=x ;

  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
   // this._unsubscribeAll.next();
    //this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Finish the horizontal stepper
   */
  finishHorizontalStepper(): void {
    //alert('You have finished the horizontal stepper!');
console.log("thisis")
    //console.log(this.horizontalStepperStep1.getRawValue());
    // console.log(this.options1);
    // this._academyCoursesService.saveCourse(this.horizontalStepperStep1.getRawValue());

    // this.cursusid =this._academyCoursesService.getCursusid();
    //this._academyCoursesService.getCursusid
    //console.log("idddd baaaed appel");
    // console.log(this._academyCoursesService.courseId);

    //console.log("this.horizontalStepperStep1.getRawValue().id");

    // console.log(this.horizontalStepperStep1.getRawValue().id);



  }
  newList() {
if (this.par.length!==0){alert("Veuillez remplir la liste des étudiants")}



  }

  newContact(): void {
    // console.log("je suis la" + this._academyCoursesService.courseId);
    this.dialogRef = this._matDialog.open(ParticipantFormComponent, {
      panelClass: 'training-form-dialog',
      data: {
        action: 'new',

      }
    });
    let participants = [];
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        //console.log(response) ;
        if (!response) {
          return;
        }
        //console.log(response.getRawValue())
        participants.push(response.getRawValue());
        //console.log("participants")
        // console.log(JSON.stringify(participants)) ;
        for (let i in participants) {
          this.par.push(participants[i]);
        }

        // console.log("par")
        // console.log(this.par)
        this.serv.raiseEvent(this.par);


      });

  }
  
  /*getCursusId ()
{
  console.log("click"); 
  this.serviceCursusId.receivedFilter.subscribe((param: number) => {
    this.cursusId = param;
    console.log( this.cursusId); 
   
  })
  return this.cursusId ;
}*/

  confirm() {
     alert("L'inscription est Validée.")
    let entreprise = this._academyCoursesService.getEntreprise(JSON.parse(sessionStorage.getItem(USER_KEY)).id)
    console.log(entreprise)
    console.log("Confirmation")

    console.log(this.serviceCursusId.cursusId)
    
      for (let i in this.par) {
       console.log(this.par[i]);
      //console.log(this._contactsService.getCursus(this.serviceCursusId.cursusId))
        this._contactsService.updateContact(this.par[i], this.serviceCursusId.cursusId);
      } 

 this._academyCoursesService.updateDispoEntr(this.horizontalStepperStep1.getRawValue())

   

    this._academyCoursesService.updateEntrCursus( entreprise,this.serviceCursusId.cursusId)
    //this.router.navigate(['./apps/my-participants']);
  
}







}

