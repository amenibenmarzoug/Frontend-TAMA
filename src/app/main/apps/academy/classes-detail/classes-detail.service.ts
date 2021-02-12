

import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Module } from '../programDetails/tabs/module/module.model';
import { FuseUtils } from '@fuse/utils';
import { ThemeDetail } from '../programDetails/tabs/themeDetail/theme-detail.model';
import { Program } from '../program.model';
import { Thematique } from '../programDetails/tabs/thematique/thematique.model';
import{ThematiqueInst} from '../program-inst-detail/tabs/thematique-inst/thematiqueInst.model';
import{ModuleInst} from '../program-inst-detail/tabs/module-inst/moduleInst.model';
import{ThemeDetailInst} from '../program-inst-detail/tabs/theme-detail-inst/themeDetailsInst.model';
import { ProgramInst } from '../programInst.model';
const AUTH_API = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})

export class ClassesDetailService {
 theme:any;
module:any;
modules: Module[];
themes: Thematique[];
programInst:any;
themeInstId: any;
moduleId:any;
moduleInstId:any;
modulesInst:ModuleInst[];
themeDetailsInst: ThemeDetailInst[];
moduleInst:Module;
themeInst: ThematiqueInst;
themeClasse:ThematiqueInst;
themeDetailInst: ThemeDetailInst; 
themeDetails: ThemeDetail[];
onFilterChangedModuleInst: Subject<any>;
onThemeDetailInstChanged: BehaviorSubject<any>;
onFilterChangedThemeDetailInst: Subject<any>;
onCategoriesChanged: BehaviorSubject<any>;
onThemeInstChanged: BehaviorSubject<any>;
onProgramInstChanged: BehaviorSubject<any>;
onSearchTextChangedModuleInst: Subject<any>;
onSelectedThemeDetailChanged: BehaviorSubject<any>;
onSearchTextChangedThemeDetail: Subject<any>;
onmoduleInstChanged: BehaviorSubject<any>;
onSelectedModulesChanged: BehaviorSubject<any>;
onModuleChanged: BehaviorSubject<any>;
onThemeChanged: BehaviorSubject<any>;

searchTextModule: string;
searchTextThemeDetail: string;
themesInst: ThematiqueInst[];
programsInst: ProgramInst[];
programInstId: any;
filterByModule: any;
filterByThemeDetail: any;
courseSessionsSpec: any[] = [];
selectedModules: string[] = [];
selectedThemeDetail: string[]=[];
courseSessions: any;

onFilterChangedT: BehaviorSubject<any>;

lastprogramInst:any;
lastThemeInst:any;

modulesOfTheme : Module[];
moduleClasse: ModuleInst;
program:any;
themesOfProgram : Thematique[];
/**
 * Constructor
 *
 * @param {HttpClient} _httpClient
 */
constructor(
    private _httpClient: HttpClient
) {
    // Set the defaults
    
    this.onThemeInstChanged = new BehaviorSubject({});
    this.onThemeDetailInstChanged = new BehaviorSubject([]);
    this.onSelectedThemeDetailChanged = new BehaviorSubject([]);
    this.onFilterChangedModuleInst = new Subject();
    this.onSearchTextChangedModuleInst = new Subject();
    this.onSearchTextChangedThemeDetail = new Subject();
    this.onCategoriesChanged = new BehaviorSubject({});
    this.onProgramInstChanged= new BehaviorSubject({});
    this.onFilterChangedThemeDetailInst= new BehaviorSubject({});
    this.onmoduleInstChanged = new BehaviorSubject([]);
    this.onSelectedModulesChanged = new BehaviorSubject([]);
   this.onModuleChanged = new BehaviorSubject([]);
   this.onThemeChanged= new BehaviorSubject([]);

}

/**
 * Resolver
 *
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 * @returns {Observable<any> | Promise<any> | any}
 */
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise((resolve, reject) => {
        Promise.all([
          // this.getThemeInst(),
           this.getProgramInst(),
           this.getModules(),
          this.getModulesInst(),
          this.getThemeDetail0(),
          this.getThemes()
           
           
        ]).then(
            ([files]) => {
                this.onSearchTextChangedThemeDetail.subscribe(searchText => {
                    this.searchTextThemeDetail = searchText;
                    this.getThemeDetail();
                });

                this.onFilterChangedThemeDetailInst.subscribe(filter => {
                    this.filterByThemeDetail = filter;
                    this.getThemeDetail();
                });
                this.onSearchTextChangedModuleInst.subscribe(searchText => {
                    this.searchTextModule = searchText;
                    this.getModulesInst();
                });

                this.onFilterChangedModuleInst.subscribe(filter => {
                    this.filterByModule = filter;
                    this.getModulesInst();
                });

                resolve();

            },
            reject
        );
    });
}

/* getThemes(): Promise<any>
{
  
   
     return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/themes')
            .subscribe((response: any) => {
              
                this.onThemeChanged.next(response);
                this.themes=response;
                resolve(response);
            }, reject);
        }
    );
}*/
getModules(): Promise<any>
{
  
   
     return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/module')
            .subscribe((response: any) => {
              
                this.onModuleChanged.next(response);
                this.modules=response;
                console.log("moduleees fel prog inst detail service");
                console.log(this.modules);
                resolve(response);
            }, reject);
        }
    );
}




getProgramInst(): Promise<any>
{
  
   
     return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/programsInst')
            .subscribe((response: any) => {
                this.onProgramInstChanged.next(response);
                this.programsInst=response;
                resolve(response);
            }, reject);
        }
    );
}

/**
 * Get courses
 *
 * @returns {Promise<any>}
 */
getThemeInst(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API +'themesInst')
            .subscribe((response: any) => {
                this.themesInst = response;
                this.onThemeInstChanged.next(response);
                resolve(response);
            }, reject);
    });
}

getThemesInstPerProgram(): Promise<any> {

    let id = new HttpParams().set('id', this.programInstId);
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'program/themesInst', { params: id })
            .subscribe((response: any) => {
                this.themesInst = response;
                this.themesInst = this.themesInst.map(theme => {
                    return new ThematiqueInst(theme);
                });
                this.onThemeInstChanged.next(this.themesInst);
                resolve(this.themesInst);

            }, reject);
    });


}

/**
* Update contact
*
* @param contact
* @returns {Promise<any>}
*/
addThemeInst(themeInst,theme): Promise<any> {
    return new Promise((resolve, reject) => {
        themeInst.theme = theme;
        let id = new HttpParams().set('id', this.programInstId);
        this._httpClient.post(AUTH_API + 'themeProgramInst', themeInst, { params: id })
            .subscribe(response => {
                this.getThemesInstPerProgram();
                resolve(response);
            });
    });
}
updateThemeInst(theme,program): Promise<any> {
    console.log("programmmmm");
    console.log(program);
    theme.program = program;
    console.log("themeee fel service");
    console.log(theme);
    return new Promise((resolve, reject) => {
        this._httpClient.put(AUTH_API +'themeInst', theme)
            .subscribe(response => {
                this.lastprogramInst=response;//added by donia
                resolve(response);
            });
    });
}

addClass(programInst,program): Observable<any>{
    this.program=program;
    programInst.program = program;
    this.getThemes();


   return this._httpClient.post(AUTH_API +'programsInst', programInst);
   
   
}

getThemes(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API +'themes')
            .subscribe((response: any) => {
                this.themes = response;
                this.onThemeChanged.next(response);
                resolve(response);

                this.themesOfProgram = [];
                if (this.themes != null) {

                   
                        this.themes.forEach(theme => {
                            console.log(theme.program);
                            console.log("prog fel service");
                            console.log(this.program);
                            if ( theme.program.id == this.program.id){
                                console.log("cond vérifié");
                                this.themesOfProgram.push(theme);

                            }
                            else{
                                console.log(theme.program.id == this.program.id );
                            }
                            

                        });
                       console.log("ThemesofProg");
                       console.log(this.themesOfProgram); 

                }

            }, reject);
    });
}





addModuleInst2(themeInst,module): Promise<any> {
    this.moduleClasse=new ModuleInst(module);
    this.moduleClasse.module=module;
    this.moduleClasse.moduleInstanceName=module.moduleName;
    this.moduleClasse.nbDaysModuleInstance=module.nbDaysModule;
    this.moduleClasse.themeInstance=themeInst;

console.log(themeInst);
    console.log("moduleee Classe ");
    console.log(this.moduleClasse.themeInstance);
    
    return new Promise((resolve, reject) => {
       
        this._httpClient.post(AUTH_API +'moduleInstance', this.moduleClasse)
            .subscribe(response => {
                this.getModulesInst();
                resolve(response);
            });
    });
}

/*AutoAddThemeInst(theme,program):Observable<any>{
    
    console.log("programmmmm");
    console.log(program);
    this.themeClasse=new ThematiqueInst(theme);
    this.themeClasse.programInstance = program;
    this.themeClasse.theme=theme;
    this.themeClasse.themeInstName=theme.themeName;
    this.themeClasse.nbDaysthemeInst=theme.nbDaysTheme;
   // console.log("themeee fel service");
    //console.log(this.themeClasse);

   return this._httpClient.post(AUTH_API +'themeInst', this.themeClasse);
   
   
}*/



/**
* Delete cursus
*
* @param id
*/
deleteThemeInst(theme): Promise<any> {
    return new Promise((resolve, reject) => {
        const courseIndex = this.themesInst.indexOf(theme.id);
        this.themesInst.splice(courseIndex, 1);
        this.onThemeInstChanged.next(this.themesInst);
        this._httpClient.delete(AUTH_API + `theme/${theme.id}`)
            .subscribe(response => {
                this.getThemeInst();
                resolve(response);
            });
    });
}


/* ***********************module**********************/

/**
 * Get Modules
 *
 * @returns {Promise<any>}
 */
getModulesInst(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API +'moduleInstance')
            .subscribe((response: any) => {

                this.modulesInst = response;
                this.themeInstId = this.filterByModule;

                if (this.themeInstId != null) {
                    if (this.filterByModule === 'Modules') {
                    }
                   else {

                        this.modulesInst = this.modulesInst.filter(_module => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (_module.themeInstance.id == this.themeInstId) {
                                return true;
                            }
                            return false;
                        });
                    }
                }
                else {
                    this.modulesInst = response;
                }
                if (this.searchTextModule && this.searchTextModule !== '') {
                    this.modulesInst = FuseUtils.filterArrayByString(this.modulesInst, this.searchTextModule);
                }

                this.modulesInst = this.modulesInst.map(module => {
                    return new ModuleInst(module);
                });

                this.onmoduleInstChanged.next(this.modulesInst);
                resolve(this.modulesInst);
            }, reject);
    }
    );
}
/**
* Toggle selected modules by id
*
* @param id
*/
toggleSelectedModule(id): void {

    // First, check if we already have that module as selected...
    if (this.selectedModules.length > 0) {


        const index = this.selectedModules.indexOf(id);

        if (index !== -1) {
            this.selectedModules.splice(index, 1);

            // Trigger the next event
            this.onSelectedModulesChanged.next(this.selectedModules);

            // Return
            return;
        }
    }


    // If we don't have it, push as selected
    this.selectedModules.push(id);


    console.log(this.selectedModules.length);


    // Trigger the next event
    this.onSelectedModulesChanged.next(this.selectedModules);

}
/**
* Toggle select all
*/
toggleSelectAll(): void {
    if (this.selectedModules.length > 0) {
        this.deselectModules();
    }
    else {
        this.selectModules();
    }
}

/**
 * Select contacts
 *
 * @param filterParameter
 * @param filterValue
 */
selectModules(filterParameter?, filterValue?): void {
    this.selectedModules = [];

    // If there is no filter, select all contacts
    if (filterParameter === undefined || filterValue === undefined) {
        this.selectedModules = [];
        this.modulesInst.map(module => {
            this.selectedModules.push((module.id).toString());

        });
    }

    // Trigger the next event
    this.onSelectedModulesChanged.next(this.selectedModules);
}
/**
 * Update contact
 *
 * @param contact
 * @returns {Promise<any>}
 */
addModuleInst(moduleInst, themeInst,module): Promise<any> {

    return new Promise((resolve, reject) => {
        moduleInst.themeInstance = themeInst;
        moduleInst.module = module;
     
        this._httpClient.post(AUTH_API +'moduleInstance', moduleInst)
            .subscribe(response => {
                this.getModulesInst();
                resolve(response);
            });
    });
}

updateModuleInst(moduleInst,themeInst,module): Promise<any> {
    moduleInst.themeInstance=themeInst;
    moduleInst.module = module;
    return new Promise((resolve, reject) => {
        this._httpClient.put(AUTH_API + 'module', module)
            .subscribe(response => {
                this.getModulesInst();
                resolve(response);
            });
    });
}


addModuleInst3(themeInst,module): Promise<any> {
    this.moduleClasse=new ModuleInst(module);
    this.moduleClasse.module=module;
    this.moduleClasse.moduleInstanceName=module.moduleName;
    this.moduleClasse.nbDaysModuleInstance=module.nbDaysModule;
    this.moduleClasse.themeInstance=themeInst;

console.log(themeInst);
    console.log("moduleee Classe ");
    console.log(this.moduleClasse.themeInstance);
    
    return new Promise((resolve, reject) => {
       
        this._httpClient.post(AUTH_API +'moduleInstance', this.moduleClasse)
            .subscribe(response => {
                this.getModulesInst();
                resolve(response);
            });
    });
}

/**
 * Deselect Modules
 */
deselectModules(): void {
    this.selectedModules = [];

    // Trigger the next event
    this.onSelectedModulesChanged.next(this.selectedModules);
}

/**
 * Delete contact
 *
 * @param id
 */
deleteModule(id): Promise<any> {
    return new Promise((resolve, reject) => {
        const moduleIndex = this.modulesInst.indexOf(id);
        this.modulesInst.splice(moduleIndex, 1);
        this.onmoduleInstChanged.next(this.modulesInst);
        this._httpClient.delete(`http://localhost:8080/api/module/${id}`)
            .subscribe(response => {
                resolve(response);
            });
    });
}
/**
* Delete selected contacts
*/
deleteSelectedModule(): void {
    for (const moduleId of this.selectedModules) {
        const module = this.modulesInst.find(_module => {
            return (_module.id).toString() === moduleId;
        });
        const moduleIndex = this.modulesInst.indexOf(module);
        this.modulesInst.splice(moduleIndex, 1);
    }
    this.onmoduleInstChanged.next(this.modulesInst);
    this.deselectModules();
}
/*********************ThemeDetails***********************/
getThemeDetail0(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API + 'themeDetail')
             .subscribe((response: any) => {
              
                this.onModuleChanged.next(response);
                this.themeDetails=response;
                resolve(response);
            }, reject);
    }
    );
}
/**
 * Get Modules
 *
 * @returns {Promise<any>}
 */
getThemeDetail(): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(AUTH_API +'themeDetailInst')
            .subscribe((response: any) => {

                this.themeDetailsInst = response;
                this.moduleId = this.filterByThemeDetail;

                if (this.moduleId != null) {
                    if (this.filterByThemeDetail === 'ThemeDetail') {
                    }
                    else {

                        this.themeDetailsInst = this.themeDetailsInst.filter(_themeDetail => {
                            // return this.user.frequentContacts.includes(_contact.id);
                            if (_themeDetail.moduleInstance.id == this.moduleId) {
                                return true;
                            }
                            return false;
                        });
                    }
                }
                else {
                    this.themeDetailsInst = response;
                }
                if (this.searchTextThemeDetail && this.searchTextThemeDetail !== '') {
                    this.themeDetailsInst = FuseUtils.filterArrayByString(this.themeDetailsInst, this.searchTextThemeDetail);
                }

                this.themeDetailsInst = this.themeDetailsInst.map(themeDetail => {
                    return new ThemeDetailInst(themeDetail);
                });

                this.onThemeDetailInstChanged.next(this.themeDetailsInst);
                resolve(this.themeDetailsInst);
            }, reject);
    }
    );
}
/**
* Toggle selected modules by id
*
* @param id
*/
toggleSelectedThemeDetail(id): void {

    // First, check if we already have that module as selected...
    if (this.selectedThemeDetail.length > 0) {


        const index = this.selectedThemeDetail.indexOf(id);

        if (index !== -1) {
            this.selectedThemeDetail.splice(index, 1);

            // Trigger the next event
            this.onSelectedThemeDetailChanged.next(this.selectedThemeDetail);

            // Return
            return;
        }
    }


    // If we don't have it, push as selected
    this.selectedThemeDetail.push(id);


    console.log(this.selectedThemeDetail.length);


    // Trigger the next event
    this.onSelectedThemeDetailChanged.next(this.selectedThemeDetail);

}
/**
* Toggle select all
*/
toggleSelectAllThemeDetails(): void {
    if (this.selectedThemeDetail.length > 0) {
        this.deselectThemeDetail();
    }
    else {
        this.selectThemeDetail();
    }
}

/**
 * Select contacts
 *
 * @param filterParameter
 * @param filterValue
 */
selectThemeDetail(filterParameter?, filterValue?): void {
    this.selectedThemeDetail = [];

    // If there is no filter, select all contacts
    if (filterParameter === undefined || filterValue === undefined) {
        this.selectedThemeDetail = [];
        this.themeDetailsInst.map(themeDetail => {
            this.selectedThemeDetail.push((themeDetail.id).toString());

        });
    }

    // Trigger the next event
    this.onSelectedThemeDetailChanged.next(this.selectedThemeDetail);
}
/**
 * Update contact
 *
 * @param contact
 * @returns {Promise<any>}
 */
addThemeDetail(themeDetail, module): Promise<any> {
    return new Promise((resolve, reject) => {
        themeDetail.moduleInstance = module;
        console.log("themeDetail inst fel service");
        console.log(themeDetail);
        //themeDetailInst.themeDetail=themeDetail;
        this._httpClient.post(AUTH_API +'themeDetailInst', themeDetail)
            .subscribe(response => {
                this.getThemeDetail();
                resolve(response);
            });
    });
}

updateThemeDetail(themeDetail,module): Promise<any> {
    themeDetail.module=module;
    return new Promise((resolve, reject) => {
        this._httpClient.put(AUTH_API + 'themeDetail', themeDetail)
            .subscribe(response => {
                this.getThemeDetail();
                resolve(response);
            });
    });
}

/**
 * Deselect Modules
 */
deselectThemeDetail(): void {
    this.selectedThemeDetail = [];

    // Trigger the next event
    this.onSelectedThemeDetailChanged.next(this.selectedThemeDetail);
}

/**
 * Delete contact
 *
 * @param id
 */
deleteThemeDetail(id): Promise<any> {
    return new Promise((resolve, reject) => {
        const themeDetailIndex = this.themeDetailsInst.indexOf(id);
        this.themeDetailsInst.splice(themeDetailIndex, 1);
        this.onThemeDetailInstChanged.next(this.themeDetailsInst);
        this._httpClient.delete(`http://localhost:8080/api/themeDetail/${id}`)
            .subscribe(response => {
                resolve(response);
            });
    });
}
/**
* Delete selected contacts
*/
deleteSelectedThemeDetail(): void {
    for (const themeDetailId of this.selectedThemeDetail) {
        const themeDetail = this.themeDetailsInst.find(_themeDetail => {
            return (_themeDetail.id).toString() === themeDetailId;
        });
        const themeDetailIndex = this.themeDetailsInst.indexOf(themeDetail);
        this.themeDetailsInst.splice(themeDetailIndex, 1);
    }
    this.onThemeDetailInstChanged.next(this.themeDetailsInst);
    this.deselectThemeDetail();
}






}
