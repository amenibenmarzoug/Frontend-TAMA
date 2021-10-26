import { FuseNavigation } from '@fuse/types';

export const navigationParticipant: FuseNavigation[] = [


    {
        id       : 'calendar',
        title    : 'Calendrier',
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
        id: 'attendance-participant',
        title: 'Liste de présences',
        type: 'item',
        icon: 'how_to_reg',
        url: '/apps/attendance-participant'
    },


  /*   {
        id: 'academy',
        title: 'Académie',
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
            type: 'item',
            url: '/apps/cursus-participants/courses',

        },
        ]

    }, */

   



];