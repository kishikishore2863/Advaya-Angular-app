import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink,
    NgbCarouselModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [NgbCarouselConfig],
})
export class HeaderComponent {
  slides: any[] = new Array(4).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  ngOnInit(): void {
    // this.toggleSidebar(false);
    this.hideSidebar();
  }

  constructor(config: NgbCarouselConfig, private route: Router) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  // toggleSidebar(visible: boolean): void {
  //   const sidebar: HTMLElement | null = document.querySelector('.sidebar');
  //   console.log(visible);
  //   if (sidebar) {
  //     sidebar.style.display = visible ? 'none' : 'flex';
  //     // sidebar.style.visibility = visible ? 'visible' : 'hidden';
  //   }
  // }

  hideSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    const menu: HTMLElement | null = document.querySelector('.menu-bar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
    if (menu) {
      menu.style.display = 'flex';
    }
  }
  showSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    const menu: HTMLElement | null = document.querySelector('.menu-bar');
    if (sidebar) {
      sidebar.style.display = 'flex';
    }
    if (menu) {
      menu.style.display = 'none';
    }
  }

  redirectToHome() {
    this.route.navigate(['/']);
    this.hideSidebar();
  }
  contact() {
    this.route.navigate(['/contactus']);
    this.hideSidebar();
  }
  products() {
    this.route.navigate(['/products']);
    this.hideSidebar();
  }

  know() {
    this.route.navigate(['/know-us']);
    this.hideSidebar();
  }
}
