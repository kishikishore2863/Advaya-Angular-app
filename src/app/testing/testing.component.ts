import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
// import {
//   Component,
//   ElementRef,
//   HostListener,
//   Renderer2,
//   Inject,
//   PLATFORM_ID,
// } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testing',
  standalone: true,
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
})
export class TestingComponent {
  private elems: HTMLElement[] = [];
  private once: boolean = false;
  private offsetTop: number = 0;
  private offsetBot: number = 50;
  private winHeight: number = window.innerHeight;
  private ticking: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.inView({
      selector: '.view-poll',
      once: false,
      offsetTop: 0,
      offsetBot: 50,
    });
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
