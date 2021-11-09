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
        id: 'allSessionsTrainer',
        title: 'Liste de séances',
        type: 'item',
        icon: 'school',
        url: '/apps/academy/allSessionsTrainer'
    },

    {
        id: 'attendance',
        title: 'Gestion des présences',
        type: 'collapsable',
        icon: 'how_to_reg',
        children: [
            
            {
                id: 'markAttendance',
                title: 'Marquer les présences',
                type: 'item',
                icon: 'playlist_add_check',
                url: '/apps/mark-attendance'
            },
            
    
        {
            id: 'attendanceList',
            title: 'Liste des absences',
            type: 'item',
            icon: 'list_alt',
            url: '/apps/attendance-trainer',
        }
        ]


    },

    


    






];
