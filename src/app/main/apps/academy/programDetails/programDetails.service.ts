import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {Thematique} from 'app/main/apps/academy/programDetails/tabs/thematique/thematique.model'
const AUTH_API = 'http://localhost:8080/api/';

@Injectable()
export class ProgramDetailsService implements Resolve<any>
{
    timeline: any;
    about: any;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;
    onThemeChanged: BehaviorSubject<any>;
    onThemeChangedP: BehaviorSubject<any>;
    themes: Thematique[] ; 
    cursusId: any;
    programId:any;
    filterBy: any;
    courseSessionsSpec: any[] = [];
    courseSessions: any;
   

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
        this.onThemeChanged = new BehaviorSubject({});
        this.onThemeChangedP = new BehaviorSubject({});

      

       
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
                this.getTimeline(),
                this.getAbout(),
                this.getPhotosVideos(),
                this.getThemes(),
                //this.getThemesPerProgram(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }
    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getThemes(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API+'themes')
                .subscribe((response: any) => {
                    this.themes = response;
                    this.onThemeChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
    getThemesPerProgram(): Promise<any>
    {

        const id = new HttpParams().set('id', this.programId);
        return new Promise((resolve, reject)=>{
            this._httpClient.get(AUTH_API + '/program/themes', {params:id})
            .subscribe((response:any)=>{
                this.themes = response;
                this.themes = this.themes.map(theme =>{
                    return new Thematique(theme);
                });
               this.onThemeChanged.next(this.themes);
                resolve(this.themes);
 
            },reject);
        });


    }

    updateTheme(theme): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(AUTH_API + 'theme'  , theme )
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
    deleteTheme(theme):Promise<any>
      
    { 
       return new Promise((resolve, reject) => {
        const courseIndex = this.themes.indexOf(theme.id);
        this.themes.splice(courseIndex, 1);
        this.onThemeChanged.next(this.themes);
        this._httpClient.delete(AUTH_API +`theme/${theme.id}`)
            .subscribe(response => {
               this.getThemes();
                resolve(response);
            });
    }); 
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-about')
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

}
