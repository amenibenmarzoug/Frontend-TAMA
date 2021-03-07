import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProgramInst } from 'app/main/apps/academy/programInst.model';
import { Program } from './program.model';
import { Thematique } from './programDetails/tabs/thematique/thematique.model';
import { ModuleInst } from '../academy/program-inst-detail/tabs/module-inst/moduleInst.model';
import { Module } from './programDetails/tabs/module/module.model';
import { FuseUtils } from '@fuse/utils';


const AUTH_API = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    onCategoriesChanged: BehaviorSubject<any>;
    onProgramsInstChanged: BehaviorSubject<any>;
    onProgramChanged: BehaviorSubject<any>;
    programsInst: ProgramInst[];
    id: number;
    programInst: any;
    programInstId: any;
    program: any;
    programs: Program[];
    lastprogramInst: any;
    themes: Thematique[];
    onThemeChanged: BehaviorSubject<any>;
    programId: any;

    themesOfProgram: Thematique[];
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
        return new Promise((resolve, reject) => {

            Promise.all([
                // this.getCategories(),
                this.getProgramsInst(),
                this.getPrograms(),
                // this.getThemes(),

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
        // console.log("id chnw hedha " + id);
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'program/themes', { params: id })
                .subscribe((response: any) => {
                    this.themes = response;
                    this.themes = this.themes.map(theme => {
                        return new Thematique(theme);
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




    addClass(programInst, program): Promise<any> {
        this.program = program;
        programInst.program = program;
        this.getThemes();

        return new Promise((resolve, reject) => {
            this._httpClient.post(AUTH_API + 'programsInst2', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);



                });
        });

    }



    getThemes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'themes')
                .subscribe((response: any) => {
                    this.themes = response;
                    this.onThemeChanged.next(response);
                    resolve(response);

                    this.themesOfProgram = [];
                    if (this.themes != null) {


                        this.themes.forEach(theme => {
                            // console.log(theme.program);
                            // console.log("prog fel service");
                            // console.log(this.program);
                            if (theme.program.id == this.program.id) {
                                // console.log("cond vérifié");
                                this.themesOfProgram.push(theme);

                            }
                            else {
                                console.log(theme.program.id == this.program.id);
                            }


                        });
                        // console.log("ThemesofProg");
                        // console.log(this.themesOfProgram);

                    }

                }, reject);
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
            this._httpClient.get(AUTH_API + 'moduleInstance')
                .subscribe((response: any) => {

                    this.modulesInst = response;
                    this.onmoduleInstChanged.next(this.modulesInst);
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
            this._httpClient.delete(AUTH_API + `programsInst/${program.id}`)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }





    updateProgramInst(programInst, program): Promise<any> {

        return new Promise((resolve, reject) => {
            programInst.program = program;
            this._httpClient.put(AUTH_API + 'programsInst', programInst)
                .subscribe(response => {
                    this.getProgramsInst();
                    resolve(response);
                });
        });
    }

    getPrograms(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8080/api/programs')
                .subscribe((response: any) => {
                    this.onProgramChanged.next(response);
                    this.programs = response;
                    resolve(response);
                }, reject);
        }
        );
    }


}
