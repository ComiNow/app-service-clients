import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from '../../../services/app-config.service';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styles: [
    `:host { display: block; margin-top: 15px; }
     .carousel-wrapper { min-height: 320px; }
     .carousel-item { position: absolute; inset: 0; height: 100%; }
     .carousel-item img { object-fit: cover; border-radius: 10px; width:100%; height:100%; }
    `,
  ],
})
export class CarouselComponent implements OnInit, OnDestroy {
  private appConfigService = inject(AppConfigService);

  activeIndex = 0;
  autoplayInterval = 3000;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  isHovering = false;

  private get hasMultipleImages(): boolean {
    return this.carouselImages.length > 1;
  }

  private restartAutoplayIfAllowed(): void {
    if (!this.isHovering && this.hasMultipleImages) {
      this.startAutoplay();
    }
  }

  get carouselImages(): string[] {
    const images = this.appConfigService.imageCarousel;
    return images.length > 0
      ? images
      : [
        'assets/1-desktop.png',
        'assets/2-desktop.png',
        'assets/3-desktop.png',
        'assets/4-desktop.png',
      ];
  }

  ngOnInit(): void {
    if (this.hasMultipleImages) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.carouselImages.length;
    this.restartAutoplayIfAllowed();
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    this.restartAutoplayIfAllowed();
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.carouselImages.length) {
      this.activeIndex = index;
      this.restartAutoplayIfAllowed();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
    this.stopAutoplay();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    this.restartAutoplayIfAllowed();
  }
}
