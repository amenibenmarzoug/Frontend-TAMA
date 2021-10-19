import { ClassRoom } from 'app/shared/models/classroom.model';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClassroomsManagerService } from '../classrooms-manager.service';

@Component({
    selector: 'app-classrooms-form',
    templateUrl: './classrooms-manager-form.component.html',
    styleUrls: ['./classrooms-manager-form.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ClassroomsManagerFormComponent {


    action: string;
    contact: ClassRoom;
    contactForm: FormGroup;
    dialogTitle: string;
    institutions: any[];
    classes: any[];
    courses: any[];
    title: string;
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {MatDialogRef<ParticipantFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {ParticipantsService} _ParticipantsService
     */
    constructor(
        public matDialogRef: MatDialogRef<ClassroomsManagerFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _classroomsManagerService: ClassroomsManagerService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier Salle';
            this.contact = _data.contact;
            this._classroomsManagerService.institution = this.contact.institution;
        }
        else {
            if (this._classroomsManagerService.institution != null){
                this.title=  this._classroomsManagerService.institution.institutionName;
                this.dialogTitle = 'Nouvelle Salle au sein de : ' + this.title;
            }
            else{
                this.dialogTitle = 'Nouvelle Salle au sein de : ' 
            }
            
            this.contact = new ClassRoom({});
        }

        this.contactForm = this.createContactForm();
        this._unsubscribeAll = new Subject();
        this.institutions = this._classroomsManagerService.institutions;


    }




    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contact.id],
            classRoomName: [this.contact.classRoomName],
            capacity: [this.contact.capacity],
            fees : [this.contact.fees],
            institution: [this.contact.institution],

        });



    }

    // onValueChangedP(data?: any) {
    //     if (!this.contactForm) { return; }
    //     const form = this.contactForm;
    //     for (const field in this.contactForm) {
    //         if (this.contactForm.hasOwnProperty(field)) {
    //             // clear previous error message (if any)
    //             this.contactForm[field] = '';
    //             const control = form.get(field);
    //             // console.log(control)
    //             if (control && (control.dirty || control.touched) && !control.valid) {
    //                 const messages = this.validationMessagesP[field];
    //                 for (const key in control.errors) {
    //                     if (control.errors.hasOwnProperty(key)) {
    //                         this.contactForm[field] += messages[key] + ' ';
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    getInstitutionForm(event) {

        this._classroomsManagerService.institution = event;
    }

  



}