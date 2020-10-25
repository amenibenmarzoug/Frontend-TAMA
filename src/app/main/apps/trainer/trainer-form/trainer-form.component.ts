import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from 'app/main/apps/trainer/trainer.model';
import { Days } from 'app/main/apps/my-disponibility/days';
import { TrainerService } from 'app/main/apps/trainer/trainer.service';
@Component({
    selector     : 'trainer-form',
    templateUrl  : './trainer-form.component.html',
    styleUrls    : ['./trainer-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TrainerFormComponent
{
    action: string;
    contact: Contact;
    
    days: any[]=Days;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<TrainerFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<TrainerFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,private _serviceTrainer: TrainerService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Formateur';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Nouveau Formateur';
            this.contact = new Contact({});
        }

        this.contactForm = this.createContactForm();
    }

    changeFilter(filter): void {
        console.log(filter);
        this._serviceTrainer.disponibilities=filter;
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
            firstName    : [this.contact.firstName],
            lastName: [this.contact.lastName],
            specification: [this.contact.specification],
            email   : [this.contact.email],
            phoneNumber   : [this.contact.phoneNumber],
            //address   : [this.contact.address],
            gender : [this.contact.gender],
            password:[this.contact.password],
            street :[this.contact.street],
            city    : [this.contact.city],
            postalCode: [this.contact.postalCode],
            disponibilityDays:[this.contact.disponibilityDays]
            
        });
    }
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba','Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan','Kasserine','Sidi Bouzid', 'Gabès', 'Mednine','Tataouine','Gafsa','Tozeur','Kebili'
        
      ];
      specifications: String[] = [
        'Soft Skills', 'Management', 'LEAN'
    ];
}
