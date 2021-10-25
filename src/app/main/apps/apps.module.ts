
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpClientModule } from '@angular/common/http';




const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path        : 'dashboards/project',
        loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
    },
    {
        path        : 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path        : 'mail-ngrx',
        loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path        : 'e-commerce',
        loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    },
    {
        path        : 'academy',
        loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    },
  
    {
        path        : 'disponibility-trainer',
        loadChildren: () => import('./disponibility-trainer/disponibility-trainer.module').then(m => m.DisponibilityTrainerModule)
    },
    {
        path        : 'course-trainer',
        loadChildren: () => import('./course-trainer/course-trainer.module').then(m => m.CourseTrainerModule)
    },
    {
        path        : 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    },
    {
        path        : 'file-manager',
        loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    },
    {
        path        : 'trainer',
        loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule)
    },
    {
        path        : 'institution',
        loadChildren: () => import('./institution/institution.module').then(m => m.InstitutionModule)
    },
    {
        path        : 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
    },
    {
        path        : 'disponibility-trainer',
        loadChildren: () => import('./disponibility-trainer/disponibility-trainer.module').then(m => m.DisponibilityTrainerModule)
    },
    {
        path        : 'my-disponibility',
        loadChildren: () => import('./my-disponibility/my-disponibility.module').then(m => m.MyDisponibilityModule)
    },
    {
        path        : 'course-trainer',
        loadChildren: () => import('./course-trainer/course-trainer.module').then(m => m.CourseTrainerModule)
    },
    {
        path        : 'participants',
        loadChildren: () => import('./participants/participants.module').then(m => m.ParticipantsModule)
    },
    {
        path        : 'entreprises',
        loadChildren: () => import('./entreprises/entreprises.module').then(m => m.EntreprisesModule)
    },
    
    {path        : 'my-participants',
     loadChildren: () => import('./my-participants/my-participants.module').then(m => m.MyParticipantsModule
        )
    },
   
    {
        path        : 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
    },
    {
        path        : 'pg/:id',
        loadChildren: () => import('./groups/group-participants/group-participants.module').then(m => m.GroupParticipantModule)
    } , 
    {
        path        : 'cursus',
        loadChildren: () => import('./cursus/cursus.module').then(m => m.CursusModule)
    },
    {
        path        : 'cursus-participants',
        loadChildren: () => import('./cursus-participants/cursus-participants.module').then(m => m.CursusParticipantsModule)
    },
    {
        path        : 'classrooms-manager',
        loadChildren: () => import('./classrooms-manager/classrooms-manager.module').then(m => m.ClassroomsManagerModule)
    },
    {
        path        : 'classroom',
        loadChildren: () => import('./classrooms/classrooms.module').then(m => m.ClassroomsModule)
    },
    {
        path        : 'ressource/:id',
        loadChildren: () => import('./classrooms/ressources/ressources.module').then(m => m.RessourcesModule)
    },


    {
        path        : 'classetrainer',
        loadChildren: () => import('./classetrainer/classetrainer.module').then(m => m.ClassetrainerModule)
    },


    {
        path        : 'attendance',
        loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule)
    },




   /* {
        path        : 'cursus-participants',
        loadChildren: () => import('./cursus/cursus-participants/cursus-participants.module').then(m => m.CursusParticipantsModule)
    },*/
    // 
    // {
    //     path        : './participants/participants.component',
    //     component: ParticipantsComponent
    // }
];


@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule       
    ],
   
   

   
})
export class AppsModule
{
}
