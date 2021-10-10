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
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
    },

    {
        id: 'academy',
        title: 'Académie',
        type: 'collapsable',
        icon: 'school',
        //url      : '/apps/academy',
        children: [

            {
                id: 'academy',
                title: 'Programme',
                type: 'item',
                url: '/apps/academy/programs',
                
            },
             {
                id: 'programsD',
                 title: 'Programme Spécifique',
                 type: 'item',
                 url  : '/apps/academy/programsD',


             }, 
             {
                id: 'class',
                 title: 'Classes',
                 type: 'item',
                 url  : '/apps/academy/class',


             },
       
        {
            id: 'add',
            title: 'Ajout Séance',
            type: 'item',
            url: '/apps/academy/addSession',
        },
        
        {
            id: 'allSessions',
            title: 'Toutes les séances',
            type: 'item',
            url: '/apps/academy/allSessions',
        }
        ]

    },




    {
        id: 'trainers',
        title: 'Formateurs',
        type: 'item',
        icon: 'account_box',
        url: '/apps/trainer'
    },
 /*   {
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
    },*/
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
        type: 'item',
        icon: 'business',
        url: '/apps/entreprises'

    },
    {
        id: 'institution',
        title: 'Institutions',
        type: 'item',
        icon: 'account_balance',
        url: '/apps/institution'
    },
    {
        id: 'classrooms-manager',
        title: 'Salles',
        type: 'item',
        icon: 'school',
        url: '/apps/classrooms-manager'
    },

   
    // {
    //     id: 'groups',
    //     title: 'Groupes',
    //     type: 'item',
    //     icon: 'account_box',
    //     url: '/apps/groups'
    // },

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
