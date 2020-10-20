import { FuseNavigation } from '@fuse/types';

export const navigationTrainer: FuseNavigation[] = [


    {
        id: 'calendar',
        title: 'Calendrier',
        translate: 'NAV.CALENDAR',
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
    },

    {
        id: 'my-disponibility',
        title: 'Mes disponibilités',

        type: 'item',
        icon: 'account_box',
        url: '/apps/my-disponibility'
    },


    {
        id: 'profile',
        title: 'Profil',
        type: 'item',
        icon: 'person',
        url: '/pages/profile'
    },






];
