
import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import {  CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import {MyEvent} from './mycalendar-utils'
//import {CalendarEventTitleFormatterCustomized} from 'app/main/apps/calendar/CustomEventTitleFormatter'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private localeFr: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: MyEvent): string {
    return `<b>${new DatePipe(this.localeFr).transform(
      event.start,
      'd/M/yy à HH:mm',
      this.localeFr
    )}</b>  ${event.courseSession.course.courseName}-${event.title}`;
  }

  week(event: MyEvent): string {
    return `<b>${new DatePipe(this.localeFr).transform(
      event.start,
      'HH:mm',
      this.localeFr
    )}</b>  ${event.courseSession.course.courseName}-${event.title} `;
  }

  day(event: MyEvent): string {
    return `<b>${new DatePipe(this.localeFr).transform(
      event.start,
      'HH:mm',
      this.localeFr
    )}</b> ${event.courseSession.course.courseName}-${event.title}`;
  }
}

