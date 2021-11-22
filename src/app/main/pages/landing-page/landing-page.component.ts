import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private _fuseConfigService: FuseConfigService,
    private sc: ViewportScroller
  ) {
    // Configure the layout
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


  }

  ngOnInit(): void {
    var elmnt = document.getElementById("mainNav");
    elmnt.style.backgroundColor ="rgba(0, 0, 0, 0.4)";
   
  }

  goToPrograms(){
    this.router.navigate(['pages/home2/programs']);
  }

  /*  onScroll(event){
     var elmnt = document.getElementById("mainNav");
     console.log(event)
     console.log("change color");
     console.log(elmnt.style.backgroundColor);
    
     elmnt.style.backgroundColor="#0dcaf0"
   } */

  scroll(el) {
    var elmnt = document.getElementById(el);
    elmnt.scrollIntoView();

  }
}
