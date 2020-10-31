import { Component, Inject, ViewEncapsulation, ViewChild , LOCALE_ID  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';


//import { Training } from 'app/main/apps/academy/trainings/training.model';
import { CourseSession } from 'app/main/apps/academy/course-session/courseSession.model';
import { ThemePalette } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CourseSessionService } from '../../course-session.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-course-session-form',
  templateUrl: './course-session-form.component.html',
  styleUrls: ['./course-session-form.component.scss'],
  animations   : fuseAnimations
})


export class CourseSessionFormComponent  {

  action: string;
  contact: CourseSession;
  contactForm: FormGroup;
  dialogTitle: string;
  dateCourse: Date ; 
  beginHour: any ; 
  endHour: any ; 
  datetotry: Date ; 
  courseDate:Date ; 
  courseDateMaxHour: Date ; 
  events: any[] = [];
  cursusBeginDate: Date ; 
  cursusEndDate: Date ; 

  

/**
   * Constructor
   *
   * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<CourseSessionFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _contactsService: CourseSessionService,

)
{
    // Set the defaults
    this.action = _data.action;
    //this.dateCourse=new Date(2019, 0O5, 0O5, 0o0, 0o0, 0o0, 0o0);  
    //this.datetotry= new Date(2018, 0O5, 0O5, 17, 23, 42, 11);  
    //this.courseDate=new Date(2020, 0O1, 0O1, 0o0, 0o0, 0o0, 0o0); 
    //

    this.courseDateMaxHour=new Date() ; 
    this.courseDateMaxHour.setHours(23 , 59,59) ;
    this.events.push( new Date()) ;
    this.courseDate=this.events[this.events.length-1];
   
  
   // this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear())
    console.log("courseDate");
    console.log(this.courseDate)
    //this.courseDateMaxHour.setHours(23 , 11,59) ; 
    console.log("courseDate");
    console.log(this.courseDate)
    console.log("event lekhraa");
    console.log(this.events[this.events.length-1])
    console.log("courseDateMAX");
    console.log(this.courseDateMaxHour)


    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Modifier Scéance';
        this.contact = _data.contact;
        console.log("_data") ;

        console.log(_data) ;

       // this.contact.course=_data.contact.course ; 
        this.contact.classRoom=_data.contact.classRoom; 

        console.log("edit") ; 
        //console.log(this.contact.course) ;
        console.log(this.contact.classRoom) ;



    }
    else
    {
        this.dialogTitle = 'Nouvelle Scéance';
        this.cursusBeginDate=new Date(this._contactsService.chosenCursus.cursusBeginDate);
        this.cursusEndDate=new Date(this._contactsService.chosenCursus.cursusEndDate);
       
        

        this.contact = new CourseSession({});
        
        //this.contact.course=_data.foreignKeyCourse ; 
       

        console.log("foreign key te3 hetha") ; 
        //console.log(this.contact.course) ; 
        this.contact.classRoom=_data.foreignKeyInstitution; 
        
        //console.log("foreign key institution") ; 
        //console.log(this.contact.institution.institutionName) ; 




    }
    console.log("contact l had lenna") ;
    console.log(this.contact) ;


    this.contactForm = this.createContactForm();
    
    //this.contact.courseSessionBeginDate.setDate(this.dateCourse.getDate()) ; 
    //this.contact.courseSessionEndDate.setDate(this.dateCourse.getDate()) ; 
    //this.contact.courseSessionBeginDate.setHours(this.beginHour.getHours(),this.beginHour.getMinutes())
    //this.contact.courseSessionEndDate.setDate(this.dateCourse) ;
    /*console.log("this.datetotry.toLocaleTimeString");

    console.log(this.datetotry.toLocaleTimeString());
    console.log("this.datetotry.toLocaleDateString()");
    console.log(this.datetotry.toLocaleDateString());

   // console.log("date course date : "+this.dateCourse.getUTCDate().toString()) 
  //  console.log("course session begin time : "+this.contact.courseSessionBeginDate.toLocaleTimeString() ) 
  this.datetotry.setHours(this.dateCourse.getHours(),this.dateCourse.getMinutes()); 

    this.datetotry.setFullYear(this.dateCourse.getFullYear()); 
    console.log("this.datetotry.toLocaleDateString() afteerrrr") ;  
console.log(this.datetotry.toLocaleDateString());
console.log(this.datetotry.toLocaleTimeString());


    console.log("date to try ");
    console.log(this.datetotry); 

    console.log("course DATE ");
    console.log(this.courseDate); 
    console.log("contact baad create form") ;
    console.log(this.contact) ;*/
}

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------
addEvent( event: MatDatepickerInputEvent<Date>) {


  this.events.push( event.value);
  this.courseDate=this.events[this.events.length-1];
  this.courseDateMaxHour.setFullYear(this.courseDate.getFullYear(),this.courseDate.getMonth(),this.courseDate.getDate())

  //console.log("courseDate changeddd");
 // console.log(this.courseDate);

  //console.log("courseDate changeddd");
  //console.log(this.courseDate);

 // console.log("courseDate Max changed");
 // console.log(this.courseDateMaxHour) ; 
}
/**
 * Create contact form
 *
 * @returns {FormGroup}
 */




createContactForm(): FormGroup
{
    return this._formBuilder.group({
        id      : [this.contact.id],
        courseSessionName   : [this.contact.courseSessionName],

      //  dateCourse: this.courseDate , 
      //  beginHour:this.beginHour,
      //  endHour:this.endHour , 
        courseSessionBeginDate : [this.contact.courseSessionBeginDate],
      
        courseSessionEndDate: [this.contact.courseSessionEndDate],
      //  institution :[this.contact.institution],
        //course:[this.contact.course],

        classRoom: [this.contact.classRoom],
        //institutionName  : [this.contact.institutionName],
        city  : [this.contact.city],
   
       
    });
}



}
