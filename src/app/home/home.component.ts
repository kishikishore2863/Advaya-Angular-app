import { ViewChild } from '@angular/core';

// import { Chart } from 'chart.js';

import { ImportsModule } from '../import';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
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
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselControlComponent,
    NgbCarouselModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    ImportsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ProductService],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] | undefined;
  sliderImage:any;

  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentStartIndex: number = 0;
  pagePosition: string = '0px';
  cardsPerPage: number = 0;
  cardWidth: string = '';
  overflowWidth: string = ''; // New property
  containerBoxWidth: number = 0;
  containerBox: ElementRef | undefined;

  @ViewChild('container', { static: true, read: ElementRef })
  container!: ElementRef;

  @HostListener('window:resize')
  windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      this.adjustCurrentIndexAfterResize();
    }
  }

  // initializeSlider() {
  //   const availableWidth = this.container.nativeElement.offsetWidth - 80; // Subtract left and right arrow widths
  //   const totalMargins = (this.cardsPerPage - 1) * 10; // Only inner margins
  //   const cardBaseWidth = (availableWidth - totalMargins) / this.cardsPerPage;
  //   this.cardWidth = `${cardBaseWidth}px`;
  //   this.containerBoxWidth = this.container.nativeElement.offsetWidth;

  //   // Calculate overflow width
  //   const totalCardWidth = cardBaseWidth + 10; // Add right margin
  //   this.overflowWidth = `${this.totalCards * totalCardWidth}px`;
  // }

  initializeSlider() {
    const availableWidth = this.container.nativeElement.offsetWidth - 80; // Subtract left and right arrow widths
    const totalMargins = (this.cardsPerPage - 1) * 10; // Only inner margins
    const cardBaseWidth = (availableWidth - totalMargins) / this.cardsPerPage;
    this.cardWidth = `${cardBaseWidth}px`;
    this.containerBoxWidth = this.container.nativeElement.offsetWidth;

    // Calculate overflow width based on the number of visible cards
    const totalCardWidth = cardBaseWidth + 10; // Add right margin
    const visibleCardsWidth = this.cardsPerPage * totalCardWidth;
    const remainingCardsWidth =
      (this.totalCards - this.cardsPerPage) * totalCardWidth;
    this.overflowWidth = `${visibleCardsWidth + remainingCardsWidth}px`;
  }

  getCardsPerPage() {
    const containerWidth = this.container.nativeElement.offsetWidth - 80; // Subtract left and right arrow widths
    return Math.max(1, Math.floor(containerWidth / 400)); // 400px card + 10px margin
  }

  slideLeft() {
    if (this.currentStartIndex < this.totalCards - this.cardsPerPage) {
      this.currentStartIndex++;
      this.populatePagePosition();
    }
  }

  slideRight() {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--;
      this.populatePagePosition();
    }
  }

  populatePagePosition() {
    const cardBaseWidth = parseFloat(this.cardWidth.replace('px', ''));
    const cardWidthWithMargin = cardBaseWidth + 10;
    const newPosition = -this.currentStartIndex * cardWidthWithMargin;
    this.pagePosition = `${newPosition}px`;
  }

  adjustCurrentIndexAfterResize() {
    const maxStartIndex = this.totalCards - this.cardsPerPage;
    if (this.currentStartIndex > maxStartIndex) {
      this.currentStartIndex = Math.max(0, maxStartIndex);
      this.populatePagePosition();
    }
  }

  image: any[] = [
    '../../assets/img/unnamed.jpg',
    '../../assets/img/unnamed (1).jpg',
    '../../assets/img/unnamed (2).jpg',
    '../../assets/img/unnamed (3).jpg',
    '../../assets/img/unnamed (4).jpg',
    '../../assets/img/unnamed.jpg',
    '../../assets/img/unnamed (1).jpg',
    '../../assets/img/unnamed (2).jpg',
    '../../assets/img/unnamed (3).jpg',
  ];

  testimonials: any[] = [
    {
      id: 1,
      name: 'Jim Sheppard',
      company: 'Visionary Marketing Co.',
      quote:
        'Their HTML5 mobile-first approach revolutionized our tablet publishing.',
      imageUrl: '../../assets/img/IMG_5304.jpeg',
    },
    {
      id: 2,
      name: 'Alice Johnson',
      company: 'Tech Innovators',
      quote: 'The gamification elements boosted user engagement significantly.',
      imageUrl: '../../assets/88dee779-c6b2-4d1e-a876-c2510de23280.jpeg',
    },
    {
      id: 3,
      name: 'Carlos Rivera',
      company: 'Data Insights',
      quote:
        'Their semantic web strategy added real value to our market research.',
      imageUrl: '../../assets/img/IMG_5304.jpeg',
    },
    {
      id: 4,
      name: 'Jim Sheppard',
      company: 'Visionary Marketing Co.',
      quote:
        'Their HTML5 mobile-first approach revolutionized our tablet publishing.',
      imageUrl: '../../assets/88dee779-c6b2-4d1e-a876-c2510de23280.jpeg',
    },
  ];

  currentTestimonial: any;
  currentIndex: number = 0;

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.currentTestimonial = this.testimonials[this.currentIndex];
  }

  slides: any[] = new Array(4).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });
  private elems: HTMLElement[] = [];
  private once: boolean = false;
  private offsetTop: number = 0;
  private offsetBot: number = 50;
  private winHeight: number = window.innerHeight;
  private ticking: boolean = false;

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
    this.slides[3] = {
      src: '../../assets/Sample_Banner(1920x760).png',
    };
    this.toggleSidebar(false);
    this.hideSidebar();
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    this.currentTestimonial = this.testimonials[0];
    setInterval(() => this.nextTestimonial(), 5000);
    this.productService. getSliderCards().then((products) => {
      this.sliderImage= products;

    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  showNavigationArrows = false;
  showNavigationIndicators = true;
  dark=true;
  // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  // images = this.slides.map((n) => n.src);
  // images = this.slides;
  images = [
    '../../assets/banner1.jpg',
    '../../assets/img2.webp',
    '../../assets/img3.jpeg',
    '../../assets/Sample_Banner(1920x760).png',

  ];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    config: NgbCarouselConfig,
    private route: Router,
    private productService: ProductService
  ) {
    this.inView({
      selector: '.view-poll',
      once: false,
      offsetTop: 0,
      offsetBot: 50,
    });
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  toggleSidebar(visible: boolean): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    console.log(visible);
    if (sidebar) {
      sidebar.style.display = visible ? 'none' : 'flex';
      // sidebar.style.visibility = visible ? 'visible' : 'hidden';
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

  ngAfterViewInit() {
    const observedElements =
      this.elementRef.nativeElement.querySelectorAll('.view-poll');
    this.elems = Array.from(observedElements);
    this.update();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.winHeight = window.innerHeight;
    this.requestTick();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.requestTick();
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove() {
    this.requestTick();
  }

  private inView(opt: {
    selector: string;
    once?: boolean;
    offsetTop?: number;
    offsetBot?: number;
  }) {
    if (!opt.selector) {
      console.log('Valid selector required for inView');
      return;
    }

    this.once = opt.once === undefined ? true : opt.once;
    this.offsetTop = opt.offsetTop === undefined ? 0 : opt.offsetTop;
    this.offsetBot = opt.offsetBot === undefined ? 0 : opt.offsetBot;
  }

  private update() {
    let count = this.elems.length;

    while (count--) {
      const elem = this.elems[count];
      const rect = elem.getBoundingClientRect();

      if (
        rect.bottom >= this.offsetTop &&
        rect.top <= this.winHeight - this.offsetBot
      ) {
        this.renderer.addClass(elem, 'in-view');

        if (this.once) {
          this.elems.splice(count, 1);
        }
      } else {
        this.renderer.removeClass(elem, 'in-view');
      }
    }

    this.ticking = false;
  }

  private requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.update());
      this.ticking = true;
    }
  }
  calculateArrowPosition(index: any): string {
    const totalProfiles = this.testimonials.length;
    const containerWidth = this.container.nativeElement.offsetWidth;
    const profileWidth = 80; // Adjust this value based on the actual profile width
    const spacing = 20; // Adjust this value based on the desired spacing between profiles

    const totalWidth =
      profileWidth * totalProfiles + spacing * (totalProfiles - 1);
    const leftOffset = (containerWidth - totalWidth) / 2;

    let position = leftOffset;
    for (let i = 0; i < index; i++) {
      position += profileWidth + spacing;
    }

    return `${position}px`;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info'; // Default return value
    }
  }
}
