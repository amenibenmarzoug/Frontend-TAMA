import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProgramInstDetailService } from '../../../program-inst-detail.service';
import { ThematiqueInst } from '../thematiqueInst.model';

@Component({
  selector: 'app-thematique-inst-form',
  templateUrl: './thematique-inst-form.component.html',
  styleUrls: ['./thematique-inst-form.component.scss']
})
export class ThematiqueInstFormComponent implements OnInit {
  action: string;

  themeInst: ThematiqueInst;
  themeInstForm: FormGroup;
  dialogTitle: string;
  programsInst:any[] ;
  themes : any [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    public matDialogRef: MatDialogRef<ThematiqueInstFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _programDetailsService : ProgramInstDetailService,
    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Thèmatique Dédiée';
      this.themeInst = _data.themeInst;
      this._programDetailsService.programInst=this.themeInst.programInstance;
      this._programDetailsService.theme  = this.themeInst.theme;

    }
    else {

      this.dialogTitle = 'Nouveau Thème Dédié';
      this.themeInst = new ThematiqueInst({});

    }
    this.themeInstForm = this.createThemeInstForm();
    this._unsubscribeAll = new Subject();
    // this.programs=this._programDetailsService.programs;
    this.themes = this._programDetailsService.themes;
  }

  ngOnInit(): void {
  }


  createThemeInstForm(): FormGroup {

    return this._formBuilder.group({
      id: [this.themeInst.id],
      themeInstName: [this.themeInst.themeInstName],
      nbDaysthemeInst: [this.themeInst.nbDaysthemeInst],
      theme : [this.themeInst.theme],
      /*themeInstBeginDate: ['', Validators.required],
      themeInstEndDate: ['', Validators.required],*/
      
     


    });

  }
  getThemeForm(event){
     
    this._programDetailsService.theme=event;          
}
 

}
