import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassesService } from '../../classes.service';
import { ProgramInstance } from 'app/shared/models/programInstance.model';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {

  action: string;
  //course:AcademyCoursesComponent;

  placeForm: FormGroup;
  dialogTitle: string;
  programInst: ProgramInstance;
  enterprises: any[];
  place:string;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, public matDialogRef: MatDialogRef<PlaceFormComponent>,
    private classService: ClassesService) {
    this.action = _data.action;
    this.dialogTitle = 'Lieu de la formation';
    this.programInst = _data.programInst;
    let pl=JSON.parse(this.programInst.place);
    console.log(pl)
    if(pl!=null){
      this.place=pl.name;
    }

    console.log("programins");
    console.log(this.programInst);
    this.placeForm = this.createPlaceForm();
  }

  ngOnInit(): void {
    this.classService.onEnterprisesChanged.subscribe((enterprises) => {
      this.enterprises = enterprises;
    })
  }


  selectEnterprise(enterprise) {
   
    let place = { type: 'Enterprise', id: enterprise.id, name:enterprise.enterpriseName  };
    this.programInst.place = JSON.stringify(place);
  }

  update() {
    console.log(this.programInst);
    this.classService.updateClass(this.programInst).then(() => {
      this.matDialogRef.close();
    })

  }

  createPlaceForm(): FormGroup {

    return new FormGroup({

      //choice: new FormControl(),
      enterprise: new FormControl()
      // dateDebut: new FormControl(this.programInst.dateDebut),

    });
  }

}
