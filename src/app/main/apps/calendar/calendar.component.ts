import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEventTitleFormatter, CalendarEvent, CalendarDateFormatter,CalendarView, DAYS_OF_WEEK,CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarMonthViewBeforeRenderEvent } from 'angular-calendar';

import {MyEvent,MyEventAction} from './mycalendar-utils'


import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { CalendarService } from 'app/main/apps/calendar/calendar.service';
import { CalendarEventModel } from 'app/main/apps/calendar/event.model';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { forEach } from 'lodash';

  import { CustomDateFormatter } from './custom-date-formatter.provider';

const USER_KEY ='auth-user';


@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styles: [
        `
          .cal-month-view .bg-pink,
          .cal-week-view .cal-day-columns .bg-pink,
          .cal-day-view .bg-pink {
            background-color: red !important;
          }
        `,
    ],
    providers: [
        {
            provide: CalendarEventTitleFormatter,
            useClass: CustomEventTitleFormatter,
        },
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter,
          },
    ],
})
export class CalendarComponent implements OnInit {
    actions: MyEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: MyEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    locale: string = 'fr';
    eventsDates:string[]=[];

    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  
    CalendarView = CalendarView;



    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService
    ) {
      
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        this.actions = [
            /*{
                label: '<i class="material-icons s-16">edit</i>',
                onClick: ({ event }: { event: MyEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16">delete</i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }*/
        ];

        /**
         * Get events from service/server
         */
      
        //this.setEventsCustomized(2);
        this.setEvents();
    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        /**
         * Watch re-render-refresh for updating db
         */
        
        this.refresh.subscribe(updateDB => {
            
            if (updateDB) {
             
                this._calendarService.updateEvents(this.events);
            }
        });

        this._calendarService.onEventsUpdated.subscribe(events => {

            this.setEvents();
            //this.setEventsCustomized(2);
            this.refresh.next();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    setEvents(): void {
      //  this._calendarService.getEvents();
        this.events = this._calendarService.events.map(item => {
            const date=new Date(item.start);
            this.eventsDates.push(date.toDateString());
            item.actions = this.actions;
            return new CalendarEventModel(item);
        });
        console.log("DATES");
        console.log(this.eventsDates);
    }


    setEventsCustomized(id: any): void {
        var eventCustomized;
        var eventsList;
        eventsList = [];


        this._calendarService.events.forEach(item => {
            //if (item.idOwner == id)
                eventsList.push(item);
        });
        //this.events=eventsList;

        this.events = eventsList.map(item => {



            item.actions = this.actions;
            return new CalendarEventModel(item);
        });

        console.log(this.events);
    }

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({ header, body }): void {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }

    beforeMonthViewRenderCustomized(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
        renderEvent.body.forEach((day) => {

            const dayOfMonth = day.date.getDay();
            console.log(day.date.toDateString());
            if (this.eventsDates.includes(day.date.toDateString()) && day.inMonth) {
                console.log(day.date);
                day.cssClass = 'bg-unclicked';
            }
        });
    }


    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {MyEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     *
     * @param {string} action
     * @param {MyEvent} event
     */
    editEvent(action: string, event: MyEvent): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event: event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':
                        console.log(formData.getRawValue());
                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this._calendarService.updateEvent(this.events[eventIndex]);
                        console.log(this.events[eventIndex]);
                        this.refresh.next(true);
                        

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEvent(event);

                        break;
                }
            });
    }

    /**
     * Add Event
     */
    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }
}


