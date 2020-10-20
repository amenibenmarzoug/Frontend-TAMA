import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MyClasses } from '../../classrooms.model';
import { MyEquipments } from '../ressources.model';


@Component({
    selector     : 'ressources-form',
    templateUrl  : './ressources-form.component.html',
    styleUrls    : ['./ressources-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RessourcesFormComponent
{
    action: string;
    contact: MyEquipments;
    class: MyClasses;
    
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<RessourcesFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<RessourcesFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Ressource';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Ajouter Ressource';
            this.contact = new MyEquipments({});
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
            //classRoomName:[this.class.classRoomName],
            equipmentName:[this.contact.equipmentName],
            quantity   : [this.contact.quantity],
            classroom:[this.contact.classroom],
            
            
        });
    }
    
     
}
