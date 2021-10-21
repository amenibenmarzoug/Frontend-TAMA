import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { CalendarEventModel } from 'app/main/apps/calendar/event.model';
import { MyEvent } from '../mycalendar-utils';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateAdapter } from '@angular/material/core';

registerLocaleData(localeFr, 'fr');

@Component({
    selector     : 'calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent
{
    action: string;
    event: CalendarEventModel;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,private dateAdapter: DateAdapter<Date>
    )
    {
        this.dateAdapter.setLocale('fr');
        this.event = _data.event;
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = this.event.title;
        }
        else
        {
            this.dialogTitle = 'Jour Férié';
            this.event = new CalendarEventModel({
               
                start: _data.date,
                end  : _data.date
            });
        }

        this.eventForm = this.createEventForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup
    {
       /* return new FormGroup({
            id: new FormControl(this.event.id),
            title : new FormControl(this.event.title),
            start : new FormControl(this.event.start),
            end   : new FormControl(this.event.end),
             colorPrimary  : new FormControl(this.event.colorPrimary),
            colorSecondary: new FormControl(this.event.colorSecondary),
           
            allDay: new FormControl(this.event.allDay),
            courseSession:new FormControl(this.event.courseSession),
            color : this._formBuilder.group({
                colorPrimary : new FormControl(this.event.colorPrimary),
                colorSecondary   : new FormControl(this.event.colorSecondary),
               // colorPrimary  : new FormControl(this.event.colorPrimary),
               // colorSecondary: new FormControl(this.event.colorSecondary)
            }),
            
        });*/
        return this._formBuilder.group({
            title: [this.event.title],
            start: [this.event.start],
            end: [this.event.end],
            //allDay: new FormControl(this.event.allDay),
            color: this._formBuilder.group({   colorPrimary: [this.event.colorPrimary],
                colorSecondary: [this.event.colorSecondary]
    }),
         
        });
    }
}