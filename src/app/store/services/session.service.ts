import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private _businessId = signal<string | null>(sessionStorage.getItem('businessId'));
  private _tableId = signal<string | null>(sessionStorage.getItem('tableId'));

  businessId = computed(() => this._businessId());
  tableId = computed(() => this._tableId());

  setTableAndBusinessId(tableId: string, businessId: string): void {
    sessionStorage.setItem('tableId', tableId);
    sessionStorage.setItem('businessId', businessId);
    this._tableId.set(tableId);
    this._businessId.set(businessId);
  }

  clearSession(): void {
    sessionStorage.removeItem('tableId');
    sessionStorage.removeItem('businessId');
    sessionStorage.removeItem('tableNumber');
    this._tableId.set(null);
    this._businessId.set(null);
  }
}
