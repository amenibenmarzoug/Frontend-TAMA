import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import{Document} from 'app/main/apps/file-manager/file.model';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';




@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent  {
 /* action: string;
    document: MyDocument;
    fileForm: FormGroup;
    dialogTitle: string;


    selectedFiles: FileList;
    currentFile: File;
    progress = 0;
    message = '';
  
    fileInfos: Observable<any>;
  
  /**
     * Constructor
     *
     * @param {MatDialogRef<TrainingFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
   /* constructor(
      public matDialogRef: MatDialogRef<FileFormComponent >,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder,
      private _fileManagerService: FileManagerService,
  )
  {
      // Set the defaults
      this.action = _data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Supprimer document';
          this.document = _data.document;
      }
      else
      {
          this.dialogTitle = 'Ajout Document';
        //  this.contact.cursus=_data.course;
        //  console.log("foreign key te3 hetha") ; 
         // console.log(this.contact.cursus) ; 
          this.document = new MyDocument({});
         // this.contact.cursus=_data.foreignKeyCursus ; 


      }

      this.fileForm = this.createContactForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
 /* createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.document.id],
          documentName: [this.document.documentName],
          documentType:[this.document.documentType],
          data   : [this.document.data],
          course : [this.document.course],
          trainer: [this.document.trainer],
          
         
      });
  }


  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log("eni eveent");
    console.log(event);
  }
  
  
  /*upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this._fileManagerService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this._fileManagerService.getFiles();

          
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }*/


 
  }



     

  

