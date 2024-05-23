import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
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
    FooterComponent,
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
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
    '../../assets/Sample_Banner(1920x760).png',
  ];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    config: NgbCarouselConfig,
    private route: Router
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
}
