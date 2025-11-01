import { AfterViewInit, Component, ElementRef, viewChild, inject } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
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
    }
    .swiper-slide {
      width: 100%;
      height: auto;
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
  `,
})
export class CarouselComponent implements AfterViewInit {
  private appConfigService = inject(AppConfigService);
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  get carouselImages(): string[] {
    const images = this.appConfigService.imageCarousel;
    return images.length > 0 ? images : [
      'assets/1-desktop.png',
      'assets/2-desktop.png',
      'assets/3-desktop.png',
      'assets/4-desktop.png'
    ];
  }

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Autoplay],

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },

      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
  }
}
