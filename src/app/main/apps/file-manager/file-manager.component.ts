

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Training } from '../academy/trainings/training.model';

import { TrainingsService } from 'app/main/apps/academy/trainings.service';

@Component({
    selector     : 'file-manager',
    templateUrl  : './file-manager.component.html',
    styleUrls    : ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FileManagerComponent implements OnInit,OnDestroy
{

  selected: any;
  pathArr: string[];
  // Private
  private _unsubscribeAll: Subject<any>;


  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;


   formation: Training;
 
   filterBy: string;
   currentCategory: string;
   courses: any[];
   selectedTraining :Training;

  //fileInfos: any;




  /**
   * Constructor
   *
   * @param {FileManagerService} _fileManagerService
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor(
      private _fileManagerService: FileManagerService,
      private _fuseSidebarService: FuseSidebarService,
      private _contactsService:  FileManagerService
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();

      this.currentCategory = 'all';
        //this.searchTerm = '';
        
        
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this.currentCategory = 'all';
  

      this._fileManagerService.onFileSelected
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selected => {
          this.selected = selected;
          //this.pathArr = selected.location.split('>');
      });

      this._contactsService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
                this.courses = courses;
                console.log("courses");
                console.log(this.courses);
            });

      
  }



  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log("eni eveent");
    console.log(event);
  }
  
  
  upload(): void {
    // this.formation= new Training({"courseName":"Angulaaar","content":"oooooo"});
     //console.log(this.formation);
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    console.log("selecteeeeed Training");
    console.log(this.selectedTraining.id);
    this._fileManagerService.upload(this.currentFile,this.selectedTraining.id).subscribe(
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
        this.message = 'Impossible de télécharger le fichier!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  changeFilter(filter): void
  {
      this.filterBy = filter;
    
  }

  getTraining(formation):void{
    
    /*console.log("hiiiiiiiiii");*/
    console.log(formation.value);
    this.selectedTraining=formation.value;
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  
  

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }





    
}