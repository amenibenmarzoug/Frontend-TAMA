import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProgramSpecDetailService} from '../../../program-spec-detail.service';
import { Thematique } from '../../../../programDetails/tabs/thematique/thematique.model';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';



@Component({
  selector: 'app-thematique-spec-form',
  templateUrl: './thematique-spec-form.component.html',
  styleUrls: ['./thematique-spec-form.component.scss']
})
export class ThematiqueSpecFormComponent implements OnInit {

  action: string;

  themeSpec:  Thematique;
  themeInstForm: FormGroup;
  dialogTitle: string;
  programsInst:any[] ;
  themes : any [];
  allThemes : any[];
  private _unsubscribeAll: Subject<any>;
  actualDaysNumberAffected: number;
  programTotalDaysNumber: any;
  oldDaysAffectedValue: number;
  alertDialog: any;

  constructor(
    public matDialogRef: MatDialogRef<ThematiqueSpecFormComponent >,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _programDetailsService : ProgramSpecDetailService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier Thèmatique Dédiée';
      this.themeSpec = _data.theme;
      this._programDetailsService.program=this.themeSpec.program;
    //  this._programDetailsService.theme  = this.themeSpec.theme;

    }
    else {

      this.dialogTitle = 'Nouveau Thème Dédié';
      this.themeSpec = new Thematique({});

    }
    this.themeInstForm = this.createThemeInstForm();
    this._unsubscribeAll = new Subject();
    // this.programs=this._programDetailsService.programs;
    //this._programDetailsService.getThemes();
    
   
    
    this.themes = this._programDetailsService.themes;
    this.allThemes = this._programDetailsService.allThemes;
    
  }

  ngOnInit(): void {
  }


  createThemeInstForm(): FormGroup {
    const nbrPattern= '^[0-9]*$';
    return this._formBuilder.group({
      id: [this.themeSpec.id],
      themeName: [this.themeSpec.themeName],
      nbDaysTheme: [this.themeSpec.nbDaysTheme,[Validators.required, Validators.pattern(nbrPattern)]],
      //theme : [this.themeInst.theme],
      /*themeInstBeginDate: ['', Validators.required],
      themeInstEndDate: ['', Validators.required],*/
      
     


    });

  }
  getThemeForm(event){
     
    this._programDetailsService.theme=event;  
    this.themeSpec.themeName = event.themeName;
    this.themeSpec.nbDaysTheme=event.nbDaysTheme;        
}


closeNewThemeForm(){
  
  this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected ; 
  this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg;   
  this.actualDaysNumberAffected = this._programDetailsService.actualDaysNumberAffected + Number(this.themeSpec.nbDaysTheme)  ; 
  console.log("this.theme.nbDaysTheme") ; console.log(this.themeSpec.nbDaysTheme)
  if (this.actualDaysNumberAffected > this.programTotalDaysNumber) {
    this.addThematiqueAlert("Vous avez dépassé le nombre des jours du Programme");
    console.log(`Exceeded`);
    
    //return; 
  }
  else{

    this.matDialogRef.close(this.themeInstForm) 
  }
}

closeEditThemeForm(message){

  this.programTotalDaysNumber=this._programDetailsService.program.nbDaysProg;  
  this.oldDaysAffectedValue= this._programDetailsService.oldDaysAffectedNumber
  
  console.log("this.oldDaysAffectedValue in the close") ;console.log(this.oldDaysAffectedValue) ;

  this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected -this.oldDaysAffectedValue+ Number(this.themeSpec.nbDaysTheme)  ; 
                      
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected >= this.programTotalDaysNumber) {
                          
    this.addThematiqueAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
    console.log(`Exceeded`);                    
}
else {
  this.matDialogRef.close(['save',this.themeInstForm])
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
