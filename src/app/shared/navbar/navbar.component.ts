import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../store/services/cart.service';

import { MatDialog } from '@angular/material/dialog';
import { OrderPositionDialog } from '../../store/components/order-position/order-position.component';
import { OrdersService } from '../../store/services/orders.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  cartService = inject(CartService);
  ordersService = inject(OrdersService);
  appConfigService = inject(AppConfigService);
  existsOrder = signal(false);
  private intervalId: any;

  get cartItemCount() {
    return this.cartService.totalItems();
  }

  get logo() {
    return this.appConfigService.logo;
  }

  fetchTableOrder() {
    this.ordersService.getOrderByTableId().subscribe({
      next: (response) => {
        this.existsOrder.set(response !== null);
        console.log('Order exists:', this.existsOrder());
      },
      error: (error) => {
        console.error('Error fetching order position:', error);
      }
    });
  }

  ngOnInit() {
    this.fetchTableOrder();
    this.intervalId = setInterval(() => {
      this.fetchTableOrder();
    }, 5000);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(OrderPositionDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
