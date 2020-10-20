import { FuseNavigation } from '@fuse/types';

export const navigationParticipant: FuseNavigation[] = [


    {
        id       : 'calendar',
        title    : 'Calendrier',
        translate: 'NAV.CALENDAR',
        type     : 'item',
        icon     : 'today',
        url      : '/apps/calendar'
    },


    {
        id   : 'profile',
        title: 'Profil',
        type : 'item',
        icon : 'person',
        url  : '/pages/profile'
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
                    id: 'showCourse',
                    title: 'Formations',
                    type: 'item',
                    url: '/apps/academy/trainings',
                }
            ]

        },
        {
            id: 'cursus-participants',
            title: 'Mes Cursus',
            translate: 'NAV.CURSUS',
            type: 'item',
            url: '/apps/cursus-participants/courses',

        },
        ]

    },

   



];