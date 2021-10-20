import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClassRoom } from 'app/shared/models/classroom.model';


@Component({
    selector     : 'classrooms-form',
    templateUrl  : './classrooms-form.component.html',
    styleUrls    : ['./classrooms-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ClassroomsFormComponent
{
    action: string;
    classroom: ClassRoom;
    
    classroomForm: FormGroup;
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
            this.classroom = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Ajouter Salle';
            this.classroom = new ClassRoom({});
        }

        this.classroomForm = this.createClassroomForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
     createClassroomForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.classroom.id],
            classRoomName:[this.classroom.classRoomName],
            fees : [this.classroom.fees],
            capacity   : [this.classroom.capacity],
            
            
        });
    }
    
     
}
