import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';

@Component({
    selector   : 'file-manager-details-sidebar',
    templateUrl: './details.component.html',
    styleUrls  : ['./details.component.scss'],
    animations : fuseAnimations
})
export class FileManagerDetailsSidebarComponent implements OnInit, OnDestroy
{
    selected: any;
    ch: string;
sh :string[];
selectedId:number;
selectedName:string;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(
        private _fileManagerService: FileManagerService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });
            
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

    deleteDoc(): void {

        
        console.log("enii fel delete");
         this.ch= this.selected.url;
       console.log(this.ch);

       this.sh= this.ch.split("/");
       this.selectedId=Number(this.sh[4]);

        //console.log(name);
       // console.log(this.selected);
        //console.log()
       this._fileManagerService.deleteDocument(this.selectedId);
    }


    downloadFile():void{

        console.log("enii fel download");
        this.ch= this.selected.url;
      console.log(this.ch);

      this.sh= this.ch.split("/");
      this.selectedId=Number(this.sh[4]);
      this.selectedName=(this.selected.name);
      console.log(this.selectedName);

       //console.log(name);
      // console.log(this.selected);
       //console.log()
      this._fileManagerService.downloadFile(this.selectedId,this.selectedName);

    }
}
