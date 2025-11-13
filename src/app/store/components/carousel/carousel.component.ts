import { AfterViewInit, Component, ElementRef, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CommonModule } from '@angular/common';
import { AppConfigService } from '../../../services/app-config.service';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styles: `
    :host {
      display: block;
      margin-top: 15px;
    }
    .swiper {
      width: 90%;
      height: auto;
      min-height: 300px;
    }
    .swiper-slide {
      width: 100%;
      height: auto;
      min-height: 300px;
    }
    .swiper-slide picture {
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      color: white;
    }
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `,
})
export class CarouselComponent implements AfterViewInit {
  private appConfigService = inject(AppConfigService);
  private cdr = inject(ChangeDetectorRef);
  @ViewChild('swiperDiv', { static: false }) swiperDiv!: ElementRef<HTMLElement>;

  private swiper?: Swiper;
  imagesLoaded = 0;
  isCarouselReady = false;

  get carouselImages(): string[] {
    const images = this.appConfigService.imageCarousel;
    return images.length > 0 ? images : [
      'assets/1-desktop.png',
      'assets/2-desktop.png',
      'assets/3-desktop.png',
      'assets/4-desktop.png'
    ];
  }

  get totalImages(): number {
    return this.carouselImages.length;
  }

  ngAfterViewInit(): void {
    this.preloadImages();
  }

  private preloadImages(): void {
    const imagePromises = this.carouselImages.map(src => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.imagesLoaded++;
          this.cdr.detectChanges();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Error loading image: ${src}`);
          this.imagesLoaded++;
          this.cdr.detectChanges();
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      this.initSwiper();
    });
  }

  private initSwiper(): void {
    const element = this.swiperDiv?.nativeElement;
    if (!element) return;

    setTimeout(() => {
      this.swiper = new Swiper(element, {
        direction: 'horizontal',
        loop: this.carouselImages.length > 1,
        modules: [Navigation, Autoplay, Pagination, Scrollbar],

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        autoplay: this.carouselImages.length > 1 ? {
          delay: 3000,
          disableOnInteraction: false
        } : false,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      });

      this.isCarouselReady = true;
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnDestroy(): void {
    this.swiper?.destroy();
  }
}
