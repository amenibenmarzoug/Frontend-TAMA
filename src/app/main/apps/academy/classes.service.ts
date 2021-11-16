import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProgramInst } from 'app/main/apps/academy/programInst.model';
import { Program } from 'app/shared/models/program.model';
import { Theme } from 'app/shared/models/theme.model';
import { ModuleInst } from '../academy/program-inst-detail/tabs/module-inst/moduleInst.model';
import { Module } from 'app/shared/models/module.model';
import { FuseUtils } from '@fuse/utils';
import {environment} from 'environments/environment';

const AUTH_API = environment.backend_url+ 'api/';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    onCategoriesChanged: BehaviorSubject<any>;
    onProgramsInstChanged: BehaviorSubject<any>;
    onEnterprisesChanged: BehaviorSubject<any>;

    onProgramChanged: BehaviorSubject<any>;
    programsInst: ProgramInst[];
    id: number;
    programInst: any;
    programInstId: any;
    program: any;
    programs: Program[];
    enterprises:any[];

    lastprogramInst: any;
    themes: Theme[];

    onThemeChanged: BehaviorSubject<any>;
    programId: any;

    themesOfProgram: Theme[];
    modulesInst: ModuleInst[];
    onmoduleInstChanged: BehaviorSubject<any>;
    moduleClasse: ModuleInst;
    modules: Module[];
    onSelectedModulesChanged: BehaviorSubject<any>;
    selectedModules: string[] = [];
    onmoduleChanged: BehaviorSubject<any>;
    modulesOfTheme: Module[];
    filterByModule: any;
    themeInstId: any;
    searchTextModule: string;

    onFilterChangedModuleInst: Subject<any>;

    onSearchTextChangedModuleInst: Subject<any>;





    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onProgramsInstChanged = new BehaviorSubject({});
        this.onEnterprisesChanged = new BehaviorSubject({});
        this.onProgramChanged = new BehaviorSubject({});
        this.onThemeChanged = new BehaviorSubject({});
        this.onmoduleInstChanged = new BehaviorSubject([]);
        this.onSelectedModulesChanged = new BehaviorSubject([]);
        this.onmoduleChanged = new BehaviorSubject([]);
        this.onFilterChangedModuleInst = new Subject();
        this.onSearchTextChangedModuleInst = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                // this.getCategories(),
                this.getProgramsInst(),
                this.getPrograms(),
                this.getEnterprises(),

                this.getModulesInst(),
                this.getModules1(),

            ]).then(
                () => {

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




    getThemesPerProgram(): Promise<any> {

        let id = new HttpParams().set('id', this.programId);
      
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'program/themes', { params: id })
                .subscribe((response: any) => {
                    this.themes = response;
                    this.themes = this.themes.map(theme => {
                        return new Theme(theme);
                    });
                    this.onThemeChanged.next(this.themes);
                    resolve(this.themes);

                }, reject);
        });


    }




    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getProgramsInst(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programsInst')
                .subscribe((response: any) => {
                    this.programsInst = response;
                    
                    this.onProgramsInstChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    addProgramInst(programInst, program): Promise<any> {
        return new Promise((resolve, reject) => {
            programInst.program = program;
            this._httpClient.post(AUTH_API + 'programsInst', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);



                });
        });
    }

    getEnterprises(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'entreprises')
                .subscribe((response: any) => {
                    this.enterprises = response;
                    this.enterprises = this.enterprises.filter(enterprise => {
                        // return this.user.frequentContacts.includes(_contact.id);
                        if (enterprise.provider == true) {
                            return true;
                        }
                        return false;
                    });
                    this.onEnterprisesChanged.next(this.enterprises);
                    resolve(this.enterprises);
                }, reject);
        }
        );
    }



    addClass(programInst, program): Promise<any> {
        this.program = program;
        programInst.program = program;
       

        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'programsInst2', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);



                });
        });

    }



    


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




    addModuleInst(themeInst, module): Promise<any> {
        this.moduleClasse = new ModuleInst(module);
        this.moduleClasse.module = module;
        this.moduleClasse.moduleInstanceName = module.moduleName;
        this.moduleClasse.nbDaysModuleInstance = module.nbDaysModule;
        this.moduleClasse.themeInstance = themeInst;

        // console.log(themeInst);
        // console.log("moduleee Classe ");
        // console.log(this.moduleClasse.themeInstance);

        return new Promise((resolve, reject) => {

            this._httpClient.post(AUTH_API + 'moduleInstance', this.moduleClasse)
                .subscribe(response => {
                    this.getModulesInst();
                    resolve(response);
                });
        });
    }




    getModules1(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'module')
                .subscribe((response: any) => {

                    this.modules = response;

                    this.onmoduleChanged.next(response);

                    resolve(response);

                }, reject);
        }
        );

    }





    getModules(val1): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'module')
                .subscribe((response: any) => {

                    this.modules = response;

                    this.onmoduleChanged.next(response);

                    resolve(response);

                    this.modulesOfTheme = [];
                    if (this.modules != null) {


                        this.modules.forEach(theme => {
                            //  console.log(theme.program);
                            // console.log("prog fel service");
                            // console.log(this.program);
                            if (theme.theme.id == val1.id) {
                                this.modulesOfTheme.push(theme);

                            }
                            else {
                                // console.log(theme.program.id == this.program.id );
                            }


                        });
                    }


                }, reject);
        }
        );
    }


  




    getModulesInst(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API +'moduleInstance')
                .subscribe((response: any) => {

                    this.modulesInst = [];
                    this.themeInstId = this.filterByModule;

                    if (this.themeInstId != null) {
                        this.modulesInst = response;
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
     * Delete cursus
     *
     * @param id
     */
    deleteProgramInst(program): Promise<any> {
        return new Promise((resolve, reject) => {
            const courseIndex = this.programsInst.indexOf(program.id);
            this.programsInst.splice(courseIndex, 1);
            this.onProgramsInstChanged.next(this.programsInst);
            this._httpClient.delete(AUTH_API + 'programsInst/'+program.id)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                },reject);
        });
    }


    confirmProgramInst(programInst): Promise<any> {

        return new Promise((resolve, reject) => {
        
          //  console.log(programInst);
            this._httpClient.put(AUTH_API + 'programsInst/confirm', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }

    cancelProgramInst(programInst): Promise<any> {

        return new Promise((resolve, reject) => {
        
          //  console.log(programInst);
            this._httpClient.put(AUTH_API + 'programsInst/cancel', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }



    updateProgramInst(programInst): Promise<any> {

        return new Promise((resolve, reject) => {
            console.log("program on the update");
            console.log(programInst);
          //  console.log(programInst);
            this._httpClient.put(AUTH_API + 'programsInst', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }

    updateClass(programInst): Promise<any> {

        return new Promise((resolve, reject) => {
        
           console.log("CLASS SERVICE");
           console.log(programInst);
            this._httpClient.put(AUTH_API + 'programsInst', programInst)
                .subscribe(response => {
                    console.log(response);
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }

    getPrograms(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/programs')
                .subscribe((response: any) => {
                    this.onProgramChanged.next(response);
                    this.programs = response;
                    resolve(response);
                }, reject);
        }
        );
    }


}
