import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    projects: any[];
    selectedProject: any;

    participants : any ; 
    selectedParticipant: any ;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    widgetAttendance : any = {} ; 

    dateNow = Date.now();
    private _unsubscribeAll: any;

     //stats
  presencesNumber: any;
  absencesNumber: any ; 
  justifiedAbsencesNumber : any ; 
    mainChart: { TW: { name: string; value: number; }[]; };
  

    /*
    'widget6'      : {
        'title'      : 'Task Distribution',
        'ranges'     : {
            'TW': 'This Week',
            'LW': 'Last Week',
            '2W': '2 Weeks Ago'
        },
        'mainChart'  : {
            'TW': [
                {
                    'name' : 'Frontend',
                    'value': 15
                },
                {
                    'name' : 'Backend',
                    'value': 20
                },
                {
                    'name' : 'API',
                    'value': 38
                },
                {
                    'name' : 'Issues',
                    'value': 27
                }
            ],
            'LW': [
                {
                    'name' : 'Frontend',
                    'value': 19
                },
                {
                    'name' : 'Backend',
                    'value': 16
                },
                {
                    'name' : 'API',
                    'value': 42
                },
                {
                    'name' : 'Issues',
                    'value': 23
                }
            ],
            '2W': [
                {
                    'name' : 'Frontend',
                    'value': 18
                },
                {
                    'name' : 'Backend',
                    'value': 17
                },
                {
                    'name' : 'API',
                    'value': 40
                },
                {
                    'name' : 'Issues',
                    'value': 25
                }
            ]
        },
        'footerLeft' : {
            'title': 'Tasks Added',
            'count': {
                '2W': 487,
                'LW': 526,
                'TW': 594
            }
        },
        'footerRight': {
            'title': 'Tasks Completed',
            'count': {
                '2W': 193,
                'LW': 260,
                'TW': 287
            }
        }
    }
    */

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService
    )
    {
        /**
         * Widget 5
         */
         this._unsubscribeAll = new Subject();
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };
        this.widgetAttendance = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#F5431D', '#EA5736', '#3697EA', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        this._projectDashboardService.onPresenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.presencesNumber = number;
    });
    
    this._projectDashboardService.onAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.absencesNumber = number;
    });

    this._projectDashboardService.onJustifiedAbsenceNumberChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(number => {
      this.justifiedAbsencesNumber = number;
    });

        this._projectDashboardService.onParticipantsChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(participants => {
              this.participants = participants;

          });
          this._projectDashboardService.onFilterByParticipantChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(participant => {
      this.selectedParticipant = participant;
      console.log("this.selected parii")
      console.log(this.selectedParticipant)

    });
    this.mainChart  = {
        'TW': [
            {
                'name' : 'PRESENT',
                'value': 15
            },
            {
                'name' : 'ABSENT',
                'value': 20
            },
            {
                'name' : 'ABBSENT JUSTIFIE',
                'value': 38
            }
        ]
    }

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
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

    selectParticipant(participant): void {
        console.log("selecting Participant")
        this.selectedParticipant = participant;
        console.log(participant)
        this._projectDashboardService.onFilterByParticipantChanged.next(participant);
        this._projectDashboardService.getPresences(this.selectedParticipant.id)
    .then(number => {
      this.presencesNumber = number;
    });
    this._projectDashboardService.getAbsences(this.selectedParticipant.id)
    .then(number => {
      this.absencesNumber = number;
    });
    this._projectDashboardService.getJustifiedAbsences(this.selectedParticipant.id)
    .then(number => {
      this.justifiedAbsencesNumber = number;
    });

        this.mainChart  = {
            'TW': [
                {
                    'name' : 'PRESENT',
                    'value': this.presencesNumber
                },
                {
                    'name' : 'ABSENT',
                    'value': this.absencesNumber
                },
                {
                    'name' : 'ABBSENT JUSTIFIE',
                    'value':  this.justifiedAbsencesNumber
                }
            ]
        }
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

