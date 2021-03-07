import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Thematique } from '../thematique.model';
import { ProgramDetailsService } from '../../../programDetails.service';
import { Subject } from 'rxjs';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';

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

  programTotalDaysNumber: any;
  actualDaysNumberAffected: number;
  alertDialog: any;
  oldDaysAffectedValue: number;

  constructor(
    public dialog: MatDialog,

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
    const nbrPattern= '^[0-9]*$';
    return this._formBuilder.group({
      id: [this.theme.id],
      themeName: [this.theme.themeName],
      nbDaysTheme: [this.theme.nbDaysTheme,[Validators.required, Validators.pattern(nbrPattern)]],
     


    });

  }

  closeNewThemeForm(){
  
    this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected ; 
    this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg;   
    this.actualDaysNumberAffected = this._programDetailsService.actualDaysNumberAffected + Number(this.theme.nbDaysTheme)  ; 
    console.log("this.theme.nbDaysTheme") ; console.log(this.theme.nbDaysTheme)
    if (this.actualDaysNumberAffected > this.programTotalDaysNumber) {
      this.addThematiqueAlert("Vous avez dépassé le nombre des jours du Programme");
      console.log(`Exceeded`);
      
      //return; 
    }
    else{

      this.matDialogRef.close(this.themeForm) 
    }
  }

  closeEditThemeForm(message){

    this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg; 
    this.oldDaysAffectedValue= this._programDetailsService.oldDaysAffectedNumber
    
    console.log("this.oldDaysAffectedValue in the close") ;console.log(this.oldDaysAffectedValue) ;

    this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected -this.oldDaysAffectedValue+ Number(this.theme.nbDaysTheme)  ; 
                        
    // case where the modified days number exceeded the limit
    if(this.actualDaysNumberAffected >= this.programTotalDaysNumber) {
                            
      this.addThematiqueAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
      console.log(`Exceeded`);                    
  }
  else {
    this.matDialogRef.close(['save',this.themeForm])
  }
}

  addThematiqueAlert(message): void {
    this.alertDialog = this.dialog.open(AlertDialogComponent, {
        disableClose: false
    });

    this.alertDialog.componentInstance.dialogMessage = message;

    this.alertDialog.afterClosed().subscribe(result => {
        if (result) {

        }
        this.alertDialog = null;
    });
}

 

}
