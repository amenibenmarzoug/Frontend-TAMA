import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';

import { CourseSession } from '../academy/course-session/courseSession.model';

export class CalendarEventModel {
  id: number;
  courseSession: any;
  start: Date;
  end?: Date;
  title: string;
  colorPrimary?: string;
  colorSecondary: string;
  color: {
    colorPrimary: string;
    colorSecondary: string;
  };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  /* meta?: {
         location: string,
         notes: string
     };*/

  /**
   * Constructor
   *
   * @param data
   */
  constructor(data) {
    data = data || {};
    this.id = data.id || FuseUtils.generateGUID();

    if (data.courseSession != null) {
       this.courseSession = data.courseSession;
      this.title = data.courseSession.courseSessionName;

      this.start = new Date(data.courseSession.courseSessionBeginDate);
      this.end = new Date(data.courseSession.courseSessionEndDate);

    }

    else {

      this.title = 'event';
      // this.courseSession =  null;
      this.start = new Date() || new Date(data.courseSession.courseSessionBeginDate) || null;
      this.end = new Date() || new Date(data.courseSession.courseSessionEndDate) || null;
    }

    this.colorPrimary = data.colorPrimary || '#1e90ff';
    this.colorSecondary = data.colorSecondary || '#1e90ff';
    this.color = {
      colorPrimary: data.colorPrimary || '#1e90ff',//|| '#1e90ff' || colors.yellow.primary || colors.red.primary || colors.green.primary,
      colorSecondary: data.colorSecondary || '#1e90ff',//|| '#D1E8FF'
    };
    this.draggable = data.draggable || false;
    this.resizable = {
      beforeStart: data.resizebeforeStart || true,
      afterEnd: data.resizeafterEnd || true
    };
    this.actions = data.actions || [];
    this.allDay = data.allDay || false;
    this.cssClass = data.cssClass || '';
    /*  this.meta = {
          location: data.meta && data.meta.location || '',
          notes   : data.meta && data.meta.notes || ''
      };*/
  }


}

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};