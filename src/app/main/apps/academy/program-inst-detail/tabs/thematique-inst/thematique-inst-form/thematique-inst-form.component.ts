import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProgramInstDetailService } from '../../../program-inst-detail.service';
import { ThematiqueInst } from '../thematiqueInst.model';
import { AlertDialogComponent } from '@fuse/components/alert-dialog/alert-dialog/alert-dialog.component';
import Swal from 'sweetalert2';

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
  actualDaysNumberAffected: number;
  programTotalDaysNumber: any;
  oldDaysAffectedValue: number;
  alertDialog: any;

  constructor(
    public matDialogRef: MatDialogRef<ThematiqueInstFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _programDetailsService : ProgramInstDetailService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Modifier Thème';
      this.themeInst = _data.themeInst;
      this._programDetailsService.programInst=this.themeInst.programInstance;
      this._programDetailsService.theme  = this.themeInst.theme;
      console.log(this.themeInst)

    }
    else {

      this.dialogTitle = 'Nouveau Thème ';
      this.themeInst = new ThematiqueInst({});

    }
    this.themeInstForm = this.createThemeInstForm();
    this._unsubscribeAll = new Subject();
    // this.programs=this._programDetailsService.programs;
    this.themes = this._programDetailsService.themes;
    console.log("this.themes")
    console.log(this.themes)
  }

  ngOnInit(): void {

    
    if (this.themeInst.theme !== undefined)
    {
    const toSelect = this.themes.find(p => p.id == this.themeInst.theme.id);
    this.themeInstForm.get('theme').setValue(toSelect);
    console.log(this.themeInstForm.get('theme'))
    }
  }


  createThemeInstForm(): FormGroup {
    const nbrPattern= '^[0-9]*$';
    return this._formBuilder.group({
      id: [this.themeInst.id],
      themeInstName: [this.themeInst.themeInstName],
      nbDaysthemeInst: [this.themeInst.nbDaysthemeInst,[Validators.required, Validators.pattern(nbrPattern)]],
      theme : [this.themeInst.theme],
      /*themeInstBeginDate: ['', Validators.required],
      themeInstEndDate: ['', Validators.required],*/
      
     


    });

  }
  getThemeForm(event){
     
    this._programDetailsService.theme=event;  
    this.themeInst.themeInstName = event.themeName;
    this.themeInst.nbDaysthemeInst=event.nbDaysTheme;        
}


closeNewThemeForm(){
  
  this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected ; 
  this.programTotalDaysNumber=this._programDetailsService.programInst.nbDaysProgInst;   
  this.actualDaysNumberAffected = this._programDetailsService.actualDaysNumberAffected + Number(this.themeInst.nbDaysthemeInst)  ; 
  console.log("this.theme.nbDaysTheme") ; console.log(this.themeInst.nbDaysthemeInst)
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

  this.programTotalDaysNumber=this._programDetailsService.programInst.nbDaysProgInst;  
  this.oldDaysAffectedValue= this._programDetailsService.oldDaysAffectedNumber
  
  console.log("this.oldDaysAffectedValue in the close") ;console.log(this.oldDaysAffectedValue) ;

  this.actualDaysNumberAffected=this._programDetailsService.actualDaysNumberAffected -this.oldDaysAffectedValue+ Number(this.themeInst.nbDaysthemeInst)  ; 
                      
  // case where the modified days number exceeded the limit
  if(this.actualDaysNumberAffected >= this.programTotalDaysNumber) {
                          
    //this.addThematiqueAlert("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme");
    this.ErrorMessage("Vous ne pouvez pas faire la mise à jour car vous avez dépassé le nombre des jours total du programme")
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

ErrorMessage(message): void {
  Swal.fire(
    {
      title: message,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#38a9ff',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Retour'
    }
)

}


 

}
