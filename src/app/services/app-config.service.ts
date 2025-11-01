import { Injectable, signal } from '@angular/core';
import { AppConfig } from '../interfaces/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config = signal<AppConfig | null>(null);

  config = this._config.asReadonly();

  setConfig(config: AppConfig): void {
    this._config.set(config);
  }

  get logo(): string {
    return this._config()?.logo || 'assets/LogoNameBlack.png';
  }

  get brand(): string {
    return this._config()?.brand || 'Default Brand';
  }

  get theme(): string {
    return this._config()?.theme?.name || 'cupcake';
  }

  get font(): string {
    return this._config()?.font || 'Roboto';
  }

  get fontSize(): number {
    return this._config()?.fontSize || 16;
  }

  get imageCarousel(): string[] {
    return this._config()?.imageCarousel || [];
  }
}
