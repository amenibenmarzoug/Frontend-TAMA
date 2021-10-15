import { CalendarEventAction } from 'angular-calendar';

export class CalendarEventModel {
  id: number;
  session: any;
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
  freeDay?: boolean;

  /**
   * Constructor
   *
   * @param data
   */
  constructor(data) {
    data = data || {};
    this.id = data.id || '';

    if (data.session != null) {
       this.session = data.session ;
      this.title = data.session.sessionName;

      this.start = new Date(data.session.sessionBeginDate);
      this.end = new Date(data.session.sessionEndDate);

    }

    else {
      this.session=null;
      this.title = data.title ||'Jour Férié';
      // this.courseSession =  null;
      this.start = new Date(data.start) || null;
      this.end = new Date(data.end) || null;
    }

    this.colorPrimary = data.colorPrimary || '#1e90ff';
    this.colorSecondary = data.colorSecondary || '#1e90ff';
    this.color = {
      colorPrimary: data.colorPrimary || '#1e90ff',//|| '#1e90ff' || colors.yellow.primary || colors.red.primary || colors.green.primary,
      colorSecondary: data.colorSecondary || '#1e90ff',//|| '#D1E8FF'
    };
    this.freeDay = data.freeDay || false;
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