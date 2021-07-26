import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEventTitleFormatter,CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarMonthViewBeforeRenderEvent } from 'angular-calendar';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { CalendarService } from 'app/main/apps/calendar/calendar.service';
import { CalendarEventModel } from 'app/main/apps/calendar/event.model';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export interface MyEvent extends CalendarEvent {
    id: number;
    session:any;
    colorPrimary?:string;
    colorSecondary:string;
   // color:MyEventColor;
 /*color: MyEventColor;
    colorPrimary?:string;
    colorSecondary:string;
    start: Date;
    end?: Date;
    title: string;
   
    actions?: MyEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };*/

}

export interface MyEventAction extends CalendarEventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: MyEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;}

    export interface MyEventColor  {
        primary: string;
        secondary: string;
    }