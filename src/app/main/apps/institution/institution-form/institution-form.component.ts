import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from 'app/main/apps/institution/institution.model';


@Component({
    selector     : 'institution-form',
    templateUrl  : './institution-form.component.html',
    styleUrls    : ['./institution-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class InstitutionFormComponent
{
    action: string;
    contact: Contact;
    
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<InstitutionFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<InstitutionFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Institution';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Ajouter Institution';
            this.contact = new Contact({});
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
            institutionName:[this.contact.institutionName],
            email   : [this.contact.email],
            phoneNumber   : [this.contact.phoneNumber],
            street :[this.contact.street],
            city    : [this.contact.city],
            postalCode: [this.contact.postalCode]
            
        });
    }
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba','Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan','Kasserine','Sidi Bouzid', 'Gabès', 'Mednine','Tataouine','Gafsa','Tozeur','Kebili'
        
      ];
     
}
