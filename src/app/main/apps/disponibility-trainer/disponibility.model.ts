import { FuseUtils } from '@fuse/utils';
import { Injectable } from '@angular/core';


export class Disponibility {
    /*id: number;
    classRoom:any;
    institution:any;
    city:string;
    institutionName:string;
    courseSessionBeginDate: string;
    courseSessionName: string;
   // courseSessionEndDate: Date;*/
    idTrainerDisponibility: number;
    trainer: any;
    trainerId: any;
    courseSession: any;
    courseSessionId: any;
    disponibility: boolean;

    /**
  * Constructor
  *
  * @param trainer @param courseSession
  */
    constructor(trainer, courseSession) {
        this.idTrainerDisponibility = FuseUtils.generateGUID();
        this.trainer = trainer;
        this.courseSession = courseSession;
        this.disponibility = true;

    }



    /**
     * Constructor
     *
     * @param contact
     */
    /*  constructor(contact)
      {
          {
              this.id = contact.id || FuseUtils.generateGUID();
              this.classRoom= contact.classRoom;
              this.courseSessionBeginDate= new Date(contact.courseSessionBeginDate).toISOString() || '';
              this.institutionName= contact.classRoom.institution.institutionName || '';
              this.city=contact.classRoom.institution.city || '';
              this.courseSessionName=contact.courseSessionName || '';
              //this.courseSessionEndDate= contact.courseSessionEndDate || '';
             
            
  
          }
      }*/
}
