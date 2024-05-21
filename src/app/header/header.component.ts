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
export class HeaderComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../assets/img1.jpeg',
    };
    this.slides[1] = {
      src: '../../assets/img2.webp',
    };
    this.slides[2] = {
      src: '../../assets/img3.jpeg',
    };
  }

  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  // images = this.slides.map((n) => n.src);
  // images = this.slides;
  images = [
    '../../assets/img1.jpeg',
    '../../assets/img2.webp',
    '../../assets/img3.jpeg',
  ];

  constructor(config: NgbCarouselConfig, private route: Router) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  toggleSidebar(visible: boolean): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = visible ? 'flex' : 'none';
      sidebar.style.visibility = visible ? 'visible' : 'hidden';
    }
  }

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
}
