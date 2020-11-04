import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Thematique } from '../thematique.model';
import { ProgramDetailsService } from '../../../programDetails.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-thematique-form',
  templateUrl: './thematique-form.component.html',
  styleUrls: ['./thematique-form.component.scss']
})
export class ThematiqueFormComponent implements OnInit {
  action: string;

  theme: Thematique;
  themeForm: FormGroup;
  dialogTitle: string;
  programs:any[] ;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public matDialogRef: MatDialogRef<ThematiqueFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _programDetailsService : ProgramDetailsService,
    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Thèmatique';
      this.theme = _data.theme;
      this._programDetailsService.program=this.theme.program;

    }
    else {

      this.dialogTitle = 'Nouveau Thème';
      this.theme = new Thematique({});

    }
    this.themeForm = this.createThemeForm();
    this._unsubscribeAll = new Subject();
    // this.programs=this._programDetailsService.programs;
  }

  ngOnInit(): void {
  }


  createThemeForm(): FormGroup {

    return this._formBuilder.group({
      id: [this.theme.id],
      themeName: [this.theme.themeName],
      nbDaysTheme: [this.theme.nbDaysTheme],
     


    });

  }

 

}
