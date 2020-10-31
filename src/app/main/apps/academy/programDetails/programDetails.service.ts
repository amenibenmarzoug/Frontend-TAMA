import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Thematique } from 'app/main/apps/academy/programDetails/tabs/thematique/thematique.model'
import { Module } from './tabs/module/module.model';
import { FuseUtils } from '@fuse/utils';
import { ThemeDetail } from './tabs/themeDetail/theme-detail.model';
import { Program } from '../program.model';
const AUTH_API = 'http://localhost:8080/api/';

@Injectable()
export class ProgramDetailsService implements Resolve<any>
{
    timeline: any;
    about: any;
    photosVideos: any;
    themeId: any;
    program:any;
    module:Module;
    theme: Thematique;
    themeDetail: ThemeDetail;
    onFilterChanged: Subject<any>;
    onCategoriesChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onThemeChanged: BehaviorSubject<any>;
    onmoduleChanged: BehaviorSubject<any>;
    onThemeDetailChanged: BehaviorSubject<any>;
    onSelectedModules: BehaviorSubject<any>;
    onSelectedModulesChanged: BehaviorSubject<any>;
    onSelectedThemeDetail: BehaviorSubject<any>;
    onSelectedThemeDetailChanged: BehaviorSubject<any>;
    onProgramChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    searchText: string;
    themes: Thematique[];
    modules: Module[];
    themeDetails: ThemeDetail[];
    programs: Program[];
    cursusId: any;
    moduleId:any;
    programId: any;
    filterBy: any;
    courseSessionsSpec: any[] = [];
    courseSessions: any;
    selectedModules: string[] = [];
    selectedThemeDetail: string[]=[];
    onFilterChangedT: BehaviorSubject<any>;


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
        this.onmoduleChanged = new BehaviorSubject({});
        this.onSelectedModules = new BehaviorSubject({});
        this.onSelectedModulesChanged = new BehaviorSubject({});
        this.onFilterChanged = new Subject();
        this.onSearchTextChanged = new Subject();
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onThemeChanged= new BehaviorSubject({});
        this.onThemeDetailChanged= new BehaviorSubject({});
        this.onSelectedThemeDetailChanged= new BehaviorSubject({});
        this.onProgramChanged= new BehaviorSubject({});
        this.onFilterChangedT= new BehaviorSubject({});

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
                this.getThemes(),
                this.getModules(),
                this.getThemeDetail(),
                //this.getThemes(),
                //this.getThemesPerProgram(),
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getModules();
                        this.getThemeDetail();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getModules();
                    });
                    this.onFilterChangedT.subscribe(filter => {
                        this.filterBy = filter;
                        this.getThemeDetail();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    getPrograms(): Promise<any>
    {
      
       
         return new Promise((resolve, reject) => {
                this._httpClient.get('http://localhost:8080/api/programs')
                .subscribe((response: any) => {
                    this.onProgramChanged.next(response);
                    this.programs=response;
                    resolve(response);
                }, reject);
            }
        );
    }
    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-categories')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
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
    /**
    * Update contact
    *
    * @param contact
    * @returns {Promise<any>}
    */
    addTheme(theme): Promise<any> {
        return new Promise((resolve, reject) => {
            let id = new HttpParams().set('id', this.programId);
            this._httpClient.post(AUTH_API + 'themeProgram', theme, { params: id })
                .subscribe(response => {
                    this.getThemesPerProgram();
                    resolve(response);
                });
        });
    }
    updateTheme(theme,program): Promise<any> {
        theme.program = program;
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'theme', theme)
                .subscribe(response => {
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
                    this.themeId = this.filterBy;

                    if (this.themeId != null) {
                        if (this.filterBy === 'Modules') {
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
                        this.modules = response;
                    }
                    if (this.searchText && this.searchText !== '') {
                        this.modules = FuseUtils.filterArrayByString(this.modules, this.searchText);
                    }

                    this.modules = this.modules.map(module => {
                        return new Module(module);
                    });

                    this.onmoduleChanged.next(this.modules);
                    resolve(this.modules);
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

    updateModule(module,theme): Promise<any> {
        module.theme=theme;
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
            const module = this.modules.find(_module => {
                return (_module.id).toString() === moduleId;
            });
            const moduleIndex = this.modules.indexOf(module);
            this.modules.splice(moduleIndex, 1);
        }
        this.onmoduleChanged.next(this.modules);
        this.deselectModules();
    }

    /* *********************************************/

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
                    this.moduleId = this.filterBy;

                    if (this.moduleId != null) {
                        if (this.filterBy === 'ThemeDetail') {
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
                    if (this.searchText && this.searchText !== '') {
                        this.themeDetails = FuseUtils.filterArrayByString(this.themeDetails, this.searchText);
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
            const themeDetailIndex = this.themeDetails.indexOf(id);
            this.themeDetails.splice(themeDetailIndex, 1);
            this.onThemeDetailChanged.next(this.themeDetails);
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
