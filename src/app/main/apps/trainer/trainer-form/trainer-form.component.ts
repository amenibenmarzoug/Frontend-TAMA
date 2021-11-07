import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Trainer } from 'app/shared/models/trainer.model';
import { Days } from 'app/main/apps/my-disponibility/days';
import { TrainerService } from 'app/main/apps/trainer/trainer.service';
@Component({
    selector: 'trainer-form',
    templateUrl: './trainer-form.component.html',
    styleUrls: ['./trainer-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TrainerFormComponent {
    action: string;
    contact: Trainer;
    specifications:any[];
    themes:any[];
    days: any[] = Days;
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
        private _formBuilder: FormBuilder, private _serviceTrainer: TrainerService
    ) {
        // Set the defaults
        this.action = _data.action;
        this._serviceTrainer.onModulesChanged.subscribe((modules)=>{
            this.specifications=modules;
        })
       
        this._serviceTrainer.onThemesChanged.subscribe((themes)=>{
            this.themes=themes;
        })
        console.log(this.specifications)
        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Formateur';
            
            this.contact = _data.contact;
            //let pl=JSON.parse(this.contact.fees);
            //console.log(pl)
            console.log(this.contact);
        }
        else {
            this.dialogTitle = 'Nouveau Formateur';
            this.contact = new Trainer({});
        }

        this.contactForm = this.createContactForm();
    }

    changeFilter(filter): void {
        console.log(filter);
        //this._serviceTrainer.specifications = filter.specifications;
        this.contactForm.patchValue({disponibilityDays:filter.disponibilityDays})
       //this._serviceTrainer.disponibilities=filter.disponibilityDays;
    }


    chooseTheme(theme): void {
        console.log("theme");
        console.log(theme);
        //this._serviceTrainer.specifications = filter.specifications;
       //this._serviceTrainer.themeId=themeId;
       this._serviceTrainer.getModulesNames(theme);
       //this._serviceTrainer.getModules();
    }

    sendSpecifications(spec): void {
        console.log(spec);
        this.contactForm.patchValue({specifications:spec.specifications})
        //this._serviceTrainer.specifications = spec.specifications;
       //this._serviceTrainer.disponibilities=spec.disponibilityDays;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contact.id],
            firstName: [this.contact.firstName],
            lastName: [this.contact.lastName],
            specifications: [this.contact.specifications],
            email: [this.contact.email],
            phoneNumber: [this.contact.phoneNumber],
            //address   : [this.contact.address],
            gender: [this.contact.gender],
            street: [this.contact.street],
            city: [this.contact.city],
            postalCode: [this.contact.postalCode],
            //fees :   [this.contact.fees],
            disponibilityDays: [this.contact.disponibilityDays],
            theme:[''],

            
            fees : this._formBuilder.group({
                amount      : [this.contact.fees.amount],
                currency            : [this.contact.fees.currency]
                
                }),
                

        });
    }
    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];
   
}
