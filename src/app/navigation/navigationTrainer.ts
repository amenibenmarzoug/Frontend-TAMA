import { FuseNavigation } from '@fuse/types';

export const navigationTrainer: FuseNavigation[] = [


    {
        id: 'calendar',
        title: 'Calendrier',
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
    },


    {
        id: 'profile',
        title: 'Profil',
        type: 'item',
        icon: 'person',
        url: '/pages/profile'
    },


    {
        id: 'MyClasses',
        title: 'Mes Classes',
        type: 'item',
        icon: 'school',
        url: '/apps/classetrainer'
    },


    {
        id: 'attendance',
        title: 'Gestion des présences',
        type: 'item',
        icon: 'how_to_reg',
        url: '/apps/attendance'
    },






];
