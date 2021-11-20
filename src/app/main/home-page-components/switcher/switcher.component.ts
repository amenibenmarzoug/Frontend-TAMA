import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})

/**
 * Switcher component
 */
export class SwitcherComponent implements OnInit {

  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  windowScroll() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById("back-to-top").style.display = "inline";
    } else {
      document.getElementById("back-to-top").style.display = "none";
    }
  }
  /**
   * Onclick color change
   * @param theme theme color
   */
  setTheme(theme) {
    document
      .getElementById('color-opt')
      .setAttribute('href', 'assets/css/colors/' + theme + '.css');
  }

  toggleSwitcher() {
    this.isVisible = !this.isVisible;
  }

}
