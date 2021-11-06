import { FuseNavigation } from '@fuse/types';

export const navigationEntreprise: FuseNavigation[] = [

    {
        id: 'calendar',
        title: 'Calendrier',
  
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
    },
/*     {

        id: 'cursus',
        title: 'Cursus',
  
        type: 'item',
        icon: 'school',
        url: '/apps/cursus/courses',

    }, */


    {
        id: 'profile',
        title: 'Profil',
        type: 'item',
        icon: 'person',
        url: '/pages/profile'
    },
    {
        id: 'Mes-Participants',
        title: 'Mes Participants',
        type: 'item',
        icon: 'account_box',
        url: '/apps/my-participants'

    },
    {
        id: 'attendance',
        title: 'Liste des présences',
        type: 'item',
        icon: 'how_to_reg',
        url: '/apps/attendance-company',
    }




];
