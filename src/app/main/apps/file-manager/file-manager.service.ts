
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import{ Document} from 'app/main/apps/file-manager/file.model';
import { HttpRequest, HttpEvent } from '@angular/common/http';
//import { Training } from '../academy/trainings/training.model';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class FileManagerService implements Resolve<any> 
{
  onFilesChanged: BehaviorSubject<any>;
  onFileSelected: BehaviorSubject<any>;

  documents: Document[];


 
  id: number;
  user: any;
  onUserDataChanged: BehaviorSubject<any>;

  onCoursesChanged: BehaviorSubject<any>;
  contacts: Document[];

  //course:Training;



  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
      private _httpClient: HttpClient
  )
  {
      // Set the defaults
      this.onFilesChanged = new BehaviorSubject({});
      this.onFileSelected = new BehaviorSubject({});

      this.onCoursesChanged= new BehaviorSubject([]);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise<void>((resolve, reject) => {

          Promise.all([
              this.getFiles(),
              this.getCourses()
          ]).then(
              ([files]) => {
                  resolve();
              },
              reject
          );
      });
  }

 

  getFiles(): Observable<any> {
    return this._httpClient.get(AUTH_API + `files`);
  }

  /*getFiles(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'files')
                    .subscribe((response: any) => {

                        this.documents = response;

                       /* if ( this.filterBy === 'starred' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.starred.includes(_contact.id);
                            });
                        }

                        if ( this.filterBy === 'frequent' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.frequentContacts.includes(_contact.id);
                            });
                        }*/

                        
                       /* this.documents = this.documents.map(document => {
                            return new Document(document);
                        });

                        this.onFilesChanged.next(this.documents);
                        resolve(this.documents);
                    }, reject);
            }
        );
    }*/




    getCourses(): Promise<any> {
        /* console.log(this._httpClient.get<any[]>(AUTH_API + 'courseSession'));
         return this._httpClient.get<any[]>(AUTH_API + 'courseSession')
         .pipe(catchError(this.processHTTPMsgService.handleError));*/

        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'course')
                .subscribe((response: any) => {
                    console.log("response course");
                    console.log(response);
                    this.onCoursesChanged.next(response);
                    this.contacts = response;
                   /* if ( this.filterBy === 'starred' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return this.user.starred.includes(_contact.id);
                            });
                        }*/


                    resolve(response);
                }, reject);
        }
        );
    }
  /**
   * Get user data
   *
   * @returns {Promise<any>}
   */
  getUserData(): Promise<any>
  {
      return new Promise((resolve, reject) => {
              this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                  .subscribe((response: any) => {
                      this.user = response;
                      this.onUserDataChanged.next(this.user);
                      resolve(this.user);
                  }, reject);
          }
      );
  }

  upload(file,course): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

  

    formData.append('file', file);
   
   

    formData.append('course', course);
    formData.forEach((value,key) => {
        console.log(key+" "+value)
  });
    const req = new HttpRequest('POST', AUTH_API + `upload`, formData,{
      reportProgress: true,
      responseType: 'json'
    });
    return this._httpClient.request(req);
  }


 /* deleteDocument(id): void
      
    {  //console.log("function entryy") ; 
        //console.log(course.id)  ;
        console.log(id);
     this._httpClient.delete( AUTH_API + `files/${id}`)
            .subscribe(response => {
               this.getFiles();
               console.log("deleete 2") ; 
              
            });
 
    }*/
    deleteDocument(id):Promise<any>
    {   console.log(id)  ;
        
     
       return new Promise((resolve, reject) => {
        const contactIndex = this.contacts.indexOf(id);
        this.contacts.splice(contactIndex, 1);
            this.onFilesChanged.next(this.contacts);
        this._httpClient.delete(AUTH_API + `file/${id}`)
            .subscribe(response => {
               // this.getContacts();
               console.log(response);
                resolve(response);
            });
    }); 
    }



    /*downloadFile(id): Observable<any> {
        return this._httpClient.get(AUTH_API + `file/${id}`);
      }*/



      downloadFile(id,filename: string = null): void{


        console.log(filename);
        const baseUrl = environment.backend_url+ 'api';
      //  const token = 'my JWT';
        const headers = new HttpHeaders().set('authorization','Bearer ');
        this._httpClient.get(baseUrl + '/files/${id}',{headers, responseType: 'blob' as 'json'}).subscribe(
            (response: any) =>{
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                if (filename)
                    downloadLink.setAttribute('download', filename);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }
        )
    }
    





  
 

 
  /**
   * Delete contact
   *
   * @param id
   */
  /*deleteDocument(id):Promise<any>
  {   console.log(id)  ;
      
   
     return new Promise((resolve, reject) => {
      const contactIndex = this.documents.indexOf(id);
      this.documents.splice(contactIndex, 1);
          this.onFilesChanged.next(this.documents);
      this._httpClient.delete(AUTH_API + `document/${id}`)
          .subscribe(response => {
             // this.getContacts();
              resolve(response);
          });
  }); 
  }*/



   
/*upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', AUTH_API + `upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}*/

  
}