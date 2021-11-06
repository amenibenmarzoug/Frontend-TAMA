import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClassRoom } from 'app/shared/models/classroom.model';
import { Equipment } from 'app/shared/models/equipment.model';


@Component({
    selector: 'ressources-form',
    templateUrl: './ressources-form.component.html',
    styleUrls: ['./ressources-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RessourcesFormComponent {
    action: string;
    equipment: Equipment;
    class: ClassRoom;

    equipmentForm: FormGroup;
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
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Ressource';
            this.equipment = _data.contact;
        }
        else {
            this.dialogTitle = 'Ajouter Ressource';
            this.equipment = new Equipment({});
        }

        this.equipmentForm = this.createEquipmentForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createEquipmentForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.equipment.id],
            equipmentName: [this.equipment.equipmentName],
            quantity: [this.equipment.quantity],
            classroom: [this.equipment.classroom],


        });
    }


}
