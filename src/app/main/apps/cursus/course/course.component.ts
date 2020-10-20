import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { CursusCourseService } from 'app/main/apps/cursus/course.service';
import { CursusCoursessService } from '../courses/coursess.service';

@Component({
    selector: 'cursus-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CursusCourseComponent implements OnInit, OnDestroy, AfterViewInit {
    animationDirection: 'left' | 'right' | 'none';
    course: any;
    cursusId: any;
    cursusName:string;
    courseStepContent: any;
    currentStep: number;
    trainings: any[] = [];
    trainingsFilteredByCursusId: any[] = [];
    trainingsPerCursus: any;


    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CursusCourseService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _academyCourseService: CursusCourseService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private serviceCursusId : CursusCoursessService ,
    ) {  
        
        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      //  this.trainingsPerCursus = this._academyCourseService.trainingsPerCursus;
     //  console.log( this.trainingsPerCursus)
       // console.log(this.trainings.length)
        // Subscribe to courses
        this._academyCourseService.onCourseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(course => {
                this.course = course;
            });

        this.trainings = this._academyCourseService.trainings;

        this.cursusId = this._academyCourseService.cursusId;
        this.cursusName = this._academyCourseService.cursusName;


        this.trainings.forEach(training => {
            if ((training.cursus != null) && (training.cursus.id == this.cursusId))
                this.trainingsFilteredByCursusId.push(training);

        });
        console.log(this.trainingsFilteredByCursusId);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.elementRef.nativeElement.id === 'course-step-content';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step): void {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
        console.log(this.course.totalSteps)
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        console.log(this.course.totalSteps)
        if (this.currentStep === this.course.totalSteps - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }

   /* getSpecificTrainings() {
        this.trainings = this._academyCourseService.trainings;

        this.cursusId = this._academyCourseService.cursusId;


        this.trainings.forEach(training => {
            if ((training.cursus != null) && (training.cursus.id == this.cursusId))
                this.trainingsFilteredByCursusId.push(training);

        });
        console.log(this.trainingsFilteredByCursusId);


    }*/

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
