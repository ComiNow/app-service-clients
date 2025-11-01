import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppConfig } from '../interfaces/app-config.interface';
import { AppConfigService } from '../services/app-config.service';

function loadGoogleFont(fontFamily: string): void {
  if (fontFamily === 'Roboto' || document.getElementById(`font-${fontFamily}`)) {
    return;
  }

  const link = document.createElement('link');
  link.id = `font-${fontFamily}`;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export function initializeApp() {
  const http = inject(HttpClient);
  const appConfigService = inject(AppConfigService);

  const urlParams = new URLSearchParams(window.location.search);
  const businessIdFromUrl = urlParams.get('businessId');
  const businessIdFromStorage = sessionStorage.getItem('businessId');

  const businessId = businessIdFromUrl || businessIdFromStorage;

  if (!businessId) {
    console.error('No businessId found in URL or session storage');
    throw new Error('BusinessId is required');
  }

  if (businessIdFromUrl) {
    sessionStorage.setItem('businessId', businessIdFromUrl);
  }

  return firstValueFrom(
    http.get<AppConfig>(`${environment.baseUrl}/customization/${businessId}`)
  ).then(config => {
    const themeName = config.theme?.name || 'cupcake';
    document.documentElement.setAttribute('data-theme', themeName);

    const fontFamily = config.font || 'Roboto';
    const fontSize = config.fontSize || 16;

    document.documentElement.style.setProperty('--app-font-family', fontFamily);
    document.documentElement.style.setProperty('--app-font-size', `${fontSize}px`);
    document.body.style.fontFamily = `${fontFamily}, "Helvetica Neue", sans-serif`;
    document.body.style.fontSize = `${fontSize}px`;

    loadGoogleFont(fontFamily);

    appConfigService.setConfig(config);

    return config;
  }).catch(error => {
    console.error('Error loading configuration:', error);
    document.documentElement.setAttribute('data-theme', 'cupcake');
    document.body.style.fontFamily = 'Roboto, "Helvetica Neue", sans-serif';
    document.body.style.fontSize = '16px';
    throw error;
  });
}
