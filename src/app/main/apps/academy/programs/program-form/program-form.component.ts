import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Program } from 'app/main/apps/academy/program.model';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.scss']
})
export class ProgramFormComponent implements OnInit {
  action: string;
  program: Program;
  event: CalendarEvent;
  programForm: FormGroup;
  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<ProgramFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,

    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier Programme';
      this.program = _data.program;

    }
    else {


      this.dialogTitle = 'Nouveau Programme';
      this.program = new Program({});

    }
    this.programForm = this.createProgramForm();
  }

  ngOnInit(): void {
  }


  createProgramForm(): FormGroup {

    return this._formBuilder.group({
      id: [this.program.id],
      programName: [this.program.programName],
      nbDaysProg: [this.program.nbDaysProg]


    });

  }

}
