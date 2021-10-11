import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Module } from './tabs/module/module.model';
import { FuseUtils } from '@fuse/utils';
import { ThemeDetail } from './tabs/themeDetail/theme-detail.model';
import { Program } from '../program.model';
import { Thematique } from './tabs/thematique/thematique.model';
import {environment} from 'environments/environment';
const AUTH_API = environment.backend_url+ 'api/';

@Injectable()
export class ProgramDetailsService implements Resolve<any>
{

    program: any;
    themeId: any;
    moduleId: any;
    modules: Module[];
    themeDetails: ThemeDetail[];
   
    module: Module;
    theme: Thematique;
    themeDetail: ThemeDetail;
    onFilterChangedModule: Subject<any>;
    onThemeDetailChanged: BehaviorSubject<any>;
    onFilterChangedThemeDetail: Subject<any>;
    onCategoriesChanged: BehaviorSubject<any>;
    onThemeChanged: BehaviorSubject<any>;
    onProgramChanged: BehaviorSubject<any>;
    onSearchTextChangedModule: Subject<any>;
    onSelectedThemeDetailChanged: BehaviorSubject<any>;
    onSearchTextChangedThemeDetail: Subject<any>;
    onmoduleChanged: BehaviorSubject<any>;
    onSelectedModulesChanged: BehaviorSubject<any>;
    searchTextModule: string;
    searchTextThemeDetail: string;
    themes: Thematique[];
    programs: Program[];
    cursusId: any;
    programId: any;
    filterByModule: any;
    filterByThemeDetail: any;
    courseSessionsSpec: any[] = [];
    selectedModules: string[] = [];
    selectedThemeDetail: string[] = [];
    courseSessions: any;

    onFilterChangedT: BehaviorSubject<any>;

    actualDaysNumberAffected = 0;
    oldDaysAffectedNumber = 0;

    actualDaysAffectedPerModule = 0;
    actualDaysAffectedPerThemeDetail = 0;



    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults

        this.onThemeChanged = new BehaviorSubject({});
        this.onThemeDetailChanged = new BehaviorSubject([]);
        this.onSelectedThemeDetailChanged = new BehaviorSubject([]);
        this.onFilterChangedModule = new Subject();
        this.onSearchTextChangedModule = new Subject();
        this.onSearchTextChangedThemeDetail = new Subject();
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onThemeChanged = new BehaviorSubject({});
        this.onProgramChanged = new BehaviorSubject({});
        this.onFilterChangedThemeDetail = new BehaviorSubject({});
        this.onmoduleChanged = new BehaviorSubject([]);
        this.onSelectedModulesChanged = new BehaviorSubject([]);





    }

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
                this.getThemes(),
                this.getPrograms(),

                this.getModules(),
                this.getThemeDetail(),

            ]).then(
                ([files]) => {
                    this.onSearchTextChangedThemeDetail.subscribe(searchText => {
                        this.searchTextThemeDetail = searchText;
                        this.getThemeDetail();
                    });

                    this.onFilterChangedThemeDetail.subscribe(filter => {
                        this.filterByThemeDetail = filter;
                        this.getThemeDetail();
                    });
                    this.onSearchTextChangedModule.subscribe(searchText => {
                        this.searchTextModule = searchText;
                        this.getModules();
                    });

                    this.onFilterChangedModule.subscribe(filter => {
                        this.filterByModule = filter;
                        this.getModules();
                    });




                    resolve();

                },
                reject
            );
        });
    }

    getPrograms(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.backend_url+ 'api/programs')
                .subscribe((response: any) => {
                    this.onProgramChanged.next(response);
                    this.programs = response;
                    console.log(this.programs);
                    resolve(response);
                }, reject);
        }
        );
    }
    getProgramById(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'programs/' + id)
                .subscribe((response: any) => {
                    this.program = response;
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
    getThemes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'themes')
                .subscribe((response: any) => {
                    this.themes = response;
                    this.onThemeChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    getThemesPerProgram(): Promise<any> {

        let id = new HttpParams().set('id', this.programId);
        console.log("id chnw hedha " + id);
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
    getProgramDaysAffected(): Promise<any> {

        let id = new HttpParams().set('id', this.programId);
        this.actualDaysNumberAffected = 0;
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'program/themes', { params: id })
                .subscribe((response: any) => {
                    this.themes = response;

                    this.themes = this.themes.map(theme => {
                        this.actualDaysNumberAffected = this.actualDaysNumberAffected + theme.nbDaysTheme;
                        return new Thematique(theme);
                    });
                    console.log("days affected in service l aady" + this.actualDaysNumberAffected);
                    resolve(this.actualDaysNumberAffected);

                }, reject);
        });
    }
    /**
    * Update contact
    *
    * @param contact
    * @returns {Promise<any>}
    */
    addTheme(theme): Promise<any> {
        this.actualDaysNumberAffected = this.actualDaysNumberAffected + Number(theme.nbDaysTheme);
        return new Promise((resolve, reject) => {
            let id = new HttpParams().set('id', this.programId);
            this._httpClient.post(AUTH_API + 'themeProgram', theme, { params: id })
                .subscribe(response => {

                    this.getThemesPerProgram();
                    resolve(response);
                });
        });
    }
    updateTheme(theme, program): Promise<any> {
        this.actualDaysNumberAffected = this.actualDaysNumberAffected - this.oldDaysAffectedNumber
            + Number(theme.nbDaysTheme);

        theme.program = program;
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'theme', theme)
                .subscribe(response => {
                    //this.getThemes();
                    this.getThemesPerProgram();
                    resolve(response);
                });
        });
    }

    /**
   * Delete cursus
   *
   * @param id
   */
    deleteTheme(theme): Promise<any> {

        this.actualDaysNumberAffected = this.actualDaysNumberAffected - Number(theme.nbDaysTheme);


        return new Promise((resolve, reject) => {
            const courseIndex = this.themes.indexOf(theme.id);
            this.themes.splice(courseIndex, 1);
            this.onThemeChanged.next(this.themes);
            this._httpClient.delete(AUTH_API + `theme/${theme.id}`)
                .subscribe(response => {
                    this.getThemes();
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
    getModules(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'module')
                .subscribe((response: any) => {

                    this.modules = response;
                    this.themeId = this.filterByModule;

                    if (this.themeId != null) {
                        if (this.filterByModule === 'Modules') {
                        }
                        else {

                            this.modules = this.modules.filter(_module => {
                                // return this.user.frequentContacts.includes(_contact.id);
                                if (_module.theme.id == this.themeId) {
                                    return true;
                                }
                                return false;
                            });

                            
                        }
                    }
                    else {
                        this.modules = [];
                    }
                    if (this.searchTextModule && this.searchTextModule !== '') {
                        this.modules = FuseUtils.filterArrayByString(this.modules, this.searchTextModule);
                    }

                   /* this.modules = this.modules.map(module => {
                        return new Module(module);
                    });*/

                    this.onmoduleChanged.next(this.modules);
                    resolve(this.modules);
                }, reject);
        }
        );

    }

    getModuleDaysAffected(): Promise<any> {

        let id = new HttpParams().set('id', this.themeId);
        this.actualDaysAffectedPerModule = 0;
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'theme/modules', { params: id })
                .subscribe((response: any) => {
                    this.modules = response;
                    this.modules = this.modules.map(module => {
                        this.actualDaysAffectedPerModule = this.actualDaysAffectedPerModule + Number(module.nbDaysModule);
                        return new Module(module);
                    });
                    resolve(this.actualDaysAffectedPerModule);

                }, reject);
        });
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
            this.modules.map(module => {
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
    addModule(module, theme): Promise<any> {
        return new Promise((resolve, reject) => {
            module.theme = theme;
            this._httpClient.post(AUTH_API + 'module', module)
                .subscribe(response => {
                    this.getModules();
                    resolve(response);
                });
        });
    }

    updateModule(module, theme): Promise<any> {
        module.theme = theme;
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'module', module)
                .subscribe(response => {
                    this.getModules();
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
            const moduleIndex = this.modules.indexOf(id);
            this.modules.splice(moduleIndex, 1);
            this.onmoduleChanged.next(this.modules);
            this._httpClient.delete(AUTH_API + `module/${id}`)
                .subscribe(response => {
                    this.getModules();
                    resolve(response);
                });
        });
    }
    /**
    * Delete selected contacts
    */
    deleteSelectedModule(): void {
        for (const moduleId of this.selectedModules) {
            const module = this.modules.find(_module => {
                return (_module.id).toString() === moduleId;
            });
            const moduleIndex = this.modules.indexOf(module);
            this.modules.splice(moduleIndex, 1);
        }
        this.onmoduleChanged.next(this.modules);
        this.deselectModules();
    }
    /*********************ThemeDetails***********************/

    /**
     * Get Modules
     *
     * @returns {Promise<any>}
     */
    getThemeDetail(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'themeDetail')
                .subscribe((response: any) => {

                    this.themeDetails = response;
                    this.moduleId = this.filterByThemeDetail;

                    if (this.moduleId != null) {
                        if (this.filterByThemeDetail === 'ThemeDetail') {
                        }
                        else {

                            this.themeDetails = this.themeDetails.filter(_themeDetail => {
                                // return this.user.frequentContacts.includes(_contact.id);
                                if (_themeDetail.module.id == this.moduleId) {
                                    return true;
                                }
                                return false;
                            });
                        }
                    }
                    else {
                        this.themeDetails = response;
                    }
                    if (this.searchTextThemeDetail && this.searchTextThemeDetail !== '') {
                        this.themeDetails = FuseUtils.filterArrayByString(this.themeDetails, this.searchTextThemeDetail);
                    }

                    this.themeDetails = this.themeDetails.map(themeDetail => {
                        return new ThemeDetail(themeDetail);
                    });

                    this.onThemeDetailChanged.next(this.themeDetails);
                    resolve(this.themeDetails);
                }, reject);
        }
        );
    }

    getThemeDetailDaysAffected(): Promise<any> {

        let id = new HttpParams().set('id', this.moduleId);
        this.actualDaysAffectedPerThemeDetail = 0;
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'module/themesDetails', { params: id })
                .subscribe((response: any) => {
                    this.themeDetails = response;
                    this.themeDetails = this.themeDetails.map(themeDetail => {
                        this.actualDaysAffectedPerThemeDetail = this.actualDaysAffectedPerThemeDetail +
                            Number(themeDetail.nbDaysThemeDetail);
                        return new ThemeDetail(themeDetail);
                    });
                    resolve(this.actualDaysAffectedPerThemeDetail);

                }, reject);
        });
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
            this.themeDetails.map(themeDetail => {
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
            themeDetail.module = module;
           
            this._httpClient.post(AUTH_API + 'themeDetail', themeDetail)
                .subscribe(response => {
                    this.getThemeDetail();
                    resolve(response);
                });
        });
    }

    updateThemeDetail(themeDetail, module): Promise<any> {
        themeDetail.module = module;
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
            const themeDetailIndex = this.themeDetails.indexOf(id);
            this.themeDetails.splice(themeDetailIndex, 1);
            this.onThemeDetailChanged.next(this.themeDetails);
            this._httpClient.delete(AUTH_API + `themeDetail/${id}`)
                .subscribe(response => {
                    this.getThemeDetail();
                    resolve(response);
                });
        });
    }
    /**
    * Delete selected contacts
    */
    deleteSelectedThemeDetail(): void {
        for (const themeDetailId of this.selectedThemeDetail) {
            const themeDetail = this.themeDetails.find(_themeDetail => {
                return (_themeDetail.id).toString() === themeDetailId;
            });
            const themeDetailIndex = this.themeDetails.indexOf(themeDetail);
            this.themeDetails.splice(themeDetailIndex, 1);
        }
        this.onThemeDetailChanged.next(this.themeDetails);
        this.deselectThemeDetail();
    }



}
