import { FuseNavigation } from '@fuse/types';

export const navigationAdmin: FuseNavigation[] = [

   /* {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'NAV.DASHBOARDS',
        type: 'collapsable',
        icon: 'dashboard',
        children: [
            {
                id: 'analytics',
                title: 'Analytics',
                type: 'item',
                url: '/apps/dashboards/analytics'
            },
            {
                id: 'project',
                title: 'Project',
                type: 'item',
                url: '/apps/dashboards/project'
            }
        ]
    },*/
    {
        id: 'calendar',
        title: 'Calendrier',
        translate: 'NAV.CALENDAR',
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
    },

    {
        id: 'academy',
        title: 'Académie',
        translate: 'NAV.ACADEMY',
        type: 'collapsable',
        icon: 'school',
        //url      : '/apps/academy',
        children: [{
            id: 'trainings',
            title: 'Formations',
            //type : 'item',
            //url  : '/apps/academy/trainings',
            type: 'collapsable',
            children: [
                {
                    id: 'addCourseSession',
                    title: 'Ajout Séance',
                    type: 'item',
                    url: '/apps/academy/addCourseSession',
                },
                {
                    id: 'showCourse',
                    title: 'Formations',
                    type: 'item',
                    url: '/apps/academy/trainings',
                }
            ]

        },
        {
            id: 'cursus',
            title: 'Cursus',
            // type : 'item',
            type: 'collapsable',
            // url  : '/apps/academy/cursus',
            //exactMatch: true
            children: [
                {
                    id: 'add',
                    title: 'Ajout Cursus',
                    type: 'item',
                    url: '/apps/academy/add',

                },
                {
                    id: 'show',
                    title: 'Cursus',
                    type: 'item',
                    url: '/apps/academy/cursus',

                }
            ]

        }
        ]

    },




    {
        id: 'trainers',
        title: 'Formateurs',
        translate: 'NAV.TRAINERS',
        type: 'item',
        icon: 'account_box',
        url: '/apps/trainer'
    },
    {
        id: 'disponibility-trainer',
        title: 'Disponibilités des formateurs',

        type: 'item',
        icon: 'account_box',
        url: '/apps/disponibility-trainer'
    },


    {
        id: 'course-trainer',
        title: 'Formateurs et Formations',

        type: 'item',
        icon: 'account_box',
        url: '/apps/course-trainer'
    },
    {
        id: 'participants',
        title: 'Participants',
       
        type: 'item',
        icon: 'account_box',
        url: '/apps/participants'
    },

    {
        id: 'Entreprises',
        title: 'Entreprises',
        translate: 'NAV.ENTREPRISES',
        type: 'item',
        icon: 'account_box',
        url: '/apps/entreprises'

    },
    {
        id: 'institution',
        title: 'Institutions',
        translate: 'NAV.TRAINERS',
        type: 'item',
        icon: 'account_balance',
        url: '/apps/institution'
    },

    {
        id: 'groups',
        title: 'Groupes',
        translate: 'NAV.GROUPS',
        type: 'item',
        icon: 'account_box',
        url: '/apps/groups'
    },

  /*  {
        id       : 'file-manager',
        title    : 'Mes documents',
        translate: 'NAV.FILE_MANAGER',
        type     : 'item',
        icon     : 'folder',
        url      : '/apps/file-manager'
    },


    {
        id: 'profile',
        title: 'Profil',
        type: 'item',
        icon: 'person',
        url: '/pages/profile'
    },*/




]
