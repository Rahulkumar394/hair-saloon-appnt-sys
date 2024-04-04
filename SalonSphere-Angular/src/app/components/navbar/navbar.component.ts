import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor() {}

  toggle() {
    let nav = document.querySelector('.overlay-menu') as HTMLElement;

    if (nav.style.transform != 'translateX(0%)') {
      nav.style.transform = 'translateX(0%)';
      nav.style.transition = 'transform 0.2s ease-out';
      nav.style.zIndex = '1';
    } else {
      nav.style.transform = 'translateX(-100%)';
      nav.style.transition = 'transform 0.2s ease-out';
    }

    let toggleIcon = document.querySelector('.menuIcon') as HTMLElement;
    if (toggleIcon.className != 'menuIcon toggle') {
      toggleIcon.className += ' toggle';
    } else {
      toggleIcon.className = 'menuIcon';
    }
  }
}
