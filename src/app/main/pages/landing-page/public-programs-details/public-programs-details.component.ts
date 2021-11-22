import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { FuseConfigService } from '@fuse/services/config.service';
import { LandingPageService } from './../landing-page.service';
import { PublicProgramsDetailsService } from './public-programs-details.service';

@Component({
  selector: 'app-public-programs-details',
  templateUrl: './public-programs-details.component.html',
  styleUrls: ['./public-programs-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PublicProgramsDetailsComponent implements OnInit {

  animationDirection: 'left' | 'right' | 'none';
  course: any;
  courseStepContent: any;
  currentStep: number;

  @ViewChildren(FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseConfigService: FuseConfigService,
    private _academyCoursesService: PublicProgramsDetailsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: FuseSidebarService
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
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
    // Subscribe to courses
    this._academyCoursesService.onCourseChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(course => {
        this.course = course;
      });
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
  }

  /**
   * Go to next step
   */
  gotoNextStep(): void {
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

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
