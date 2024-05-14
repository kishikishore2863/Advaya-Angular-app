import { Component, ElementRef, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
})
export class TestingComponent {
  // constructor() {}

  // ngOnInit(): void {
  //   this.inView({
  //     selector: '.view-poll',
  //     once: false,
  //     offsetTop: 0,
  //     offsetBot: 50,
  //   });
  // }

  // inView(opt: {
  //   selector: string;
  //   once?: boolean;
  //   offsetTop?: number;
  //   offsetBot?: number;
  // }): void {
  //   if (!opt.selector) {
  //     console.log('Valid selector required for inView');
  //     return;
  //   }
  //   const elems = Array.from(
  //     document.querySelectorAll(opt.selector)
  //   ) as HTMLElement[];
  //   const once = opt.once ?? true;
  //   const offsetTop = opt.offsetTop ?? 0;
  //   const offsetBot = opt.offsetBot ?? 0;
  //   let count = elems.length;
  //   let winHeight = 0;
  //   let ticking = false;

  //   const update = (): void => {
  //     let i = count;
  //     while (i--) {
  //       const elem = elems[i];
  //       const rect = elem.getBoundingClientRect();
  //       if (rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot) {
  //         elem.classList.add('in-view');
  //         if (once) {
  //           count--;
  //           elems.splice(i, 1);
  //         }
  //       } else {
  //         elem.classList.remove('in-view');
  //       }
  //     }
  //     ticking = false;
  //   };

  //   const onResize = (): void => {
  //     winHeight = window.innerHeight;
  //     requestTick();
  //   };

  //   const onScroll = (): void => {
  //     requestTick();
  //   };

  //   const requestTick = (): void => {
  //     if (!ticking) {
  //       requestAnimationFrame(update);
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener('resize', onResize, false);
  //   document.addEventListener('scroll', onScroll, false);
  //   document.addEventListener('touchmove', onScroll, false);

  //   onResize();
  // }
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.inView({
      selector: '.view-poll',
      once: false,
      offsetTop: 0,
      offsetBot: 50,
    });
  }

  inView(opt: {
    selector: string;
    once?: boolean;
    offsetTop?: number;
    offsetBot?: number;
  }): void {
    if (!opt.selector) {
      console.log('Valid selector required for inView');
      return;
    }
    const elems = Array.from(
      this.elementRef.nativeElement.querySelectorAll(opt.selector)
    ) as HTMLElement[];
    const once = opt.once ?? true;
    const offsetTop = opt.offsetTop ?? 0;
    const offsetBot = opt.offsetBot ?? 0;
    let count = elems.length;
    let winHeight = 0;
    let ticking = false;

    const update = (): void => {
      let i = count;
      while (i--) {
        const elem = elems[i];
        const rect = elem.getBoundingClientRect();
        if (rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot) {
          this.renderer.addClass(elem, 'in-view');
          if (once) {
            count--;
            elems.splice(i, 1);
          }
        } else {
          this.renderer.removeClass(elem, 'in-view');
        }
      }
      ticking = false;
    };

    const onResize = (): void => {
      winHeight = window.innerHeight;
      requestTick();
    };

    const onScroll = (): void => {
      requestTick();
    };

    const requestTick = (): void => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('resize', onResize, false);
    window.addEventListener('scroll', onScroll, false);
    window.addEventListener('touchmove', onScroll, false);

    onResize();
  }
}
