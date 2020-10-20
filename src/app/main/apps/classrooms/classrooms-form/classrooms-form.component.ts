import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MyClasses } from 'app/main/apps/classrooms/classrooms.model';


@Component({
    selector     : 'classrooms-form',
    templateUrl  : './classrooms-form.component.html',
    styleUrls    : ['./classrooms-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ClassroomsFormComponent
{
    action: string;
    contact: MyClasses;
    
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ClassroomsFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ClassroomsFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Salle';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Ajouter Salle';
            this.contact = new MyClasses({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.contact.id],
            classRoomName:[this.contact.classRoomName],
            capacity   : [this.contact.capacity],
            
            
        });
    }
    
     
}
