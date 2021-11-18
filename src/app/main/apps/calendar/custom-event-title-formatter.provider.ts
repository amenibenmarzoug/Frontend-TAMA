
import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { MyEvent } from './mycalendar-utils'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AttendanceTrainerSidebarsComponent } from '../attendance-trainer/attendance-trainer-sidebars/attendance-trainer-sidebars.component';

registerLocaleData(localeFr, 'fr');

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private localeFr: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  /**
   * This method create the format in which the event title in the calendar 
   * is going to be shown (for the month view)
   * @param event 
   * @returns 
   */
  month(event: MyEvent): string {
    if (event.session != null) {
      if (event.session.trainer != null) {
        if (event.session.classRoom != null) {
          return `<b>${new DatePipe(this.localeFr).transform(
            event.start,
            'd/M/yy à HH:mm',
            this.localeFr
          )}</b> ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName} ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location}  - ${event.title}<br>
          <b>     Salle: </b> ${event.session.classRoom.classRoomName} à ${event.session.classRoom.institution.institutionName}<br>
          <b>     Formateur: </b> ${event.session.trainer.firstName} ${event.session.trainer.lastName}`;

        }
        else {
          return `<b>${new DatePipe(this.localeFr).transform(
            event.start,
            'd/M/yy à HH:mm',
            this.localeFr
          )}</b> ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName} ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location}  - ${event.title}<br>
          <b>     Formateur: </b> ${event.session.trainer.firstName} ${event.session.trainer.lastName}`;


        }
      }
      else {
        if (event.session.classRoom != null) {
          return `<b>${new DatePipe(this.localeFr).transform(
            event.start,
            'd/M/yy à HH:mm',
            this.localeFr
          )}</b> ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName} ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location}  - ${event.title}<br>
          <b>     Salle: </b> ${event.session.classRoom.classRoomName} à ${event.session.classRoom.institution.institutionName}<br>
          <b>     Formateur: </b> Pas de formateur actuellement`;

        }
        else {
          return `<b>${new DatePipe(this.localeFr).transform(
            event.start,
            'd/M/yy à HH:mm',
            this.localeFr
          )}</b> ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.programInstName} ${event.session.themeDetailInstance.moduleInstance.themeInstance.programInstance.location}  - ${event.title}<br>
          <b>     Formateur: </b>  Pas de formateur actuellement`;


        }
      }
    

    }
    else {
      return `<b>${new DatePipe(this.localeFr).transform(
        event.start,
        'd/M/yy ',
        this.localeFr
      )}</b> 
    <b>  ${event.title}</b> `;
    }
  }

  week(event: MyEvent): string {
    return `<b>${new DatePipe(this.localeFr).transform(
      event.start,
      'HH:mm',
      this.localeFr
    )}</b>  ${event.session.themeDetailInstance.themeDetail.themeDetailName}-${event.title} `;
  }

  day(event: MyEvent): string {
    return `<b>${new DatePipe(this.localeFr).transform(
      event.start,
      'HH:mm',
      this.localeFr
    )}</b> ${event.session.themeDetailInstance.themeDetail.themeDetailName}-${event.title}`;
  }
}

