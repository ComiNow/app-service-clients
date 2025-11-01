import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { OrdersService } from '../../services/orders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterLink, FormsModule],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  cartService = inject(CartService);
  orderService = inject(OrdersService);

  isLoading = false;
  includeService = signal(false);

  get items() {
    return this.cartService.cartItems();
  }

  get totalItems() {
    return this.cartService.totalItems();
  }

  get subtotalWithTax() {
    return this.cartService.totalAmount();
  }

  get subtotalWithoutTax() {
    const totalAmount = this.subtotalWithTax;
    return totalAmount / 1.08;
  }

  get consumptionTax() {
    return this.subtotalWithoutTax * 0.08;
  }

  get serviceCharge() {
    return this.includeService() ? this.subtotalWithTax * 0.10 : 0;
  }

  get excludedSale() {
    return this.includeService() ? this.serviceCharge : 0;
  }

  get totalAmount() {
    return this.subtotalWithTax + this.serviceCharge;
  }

  onServiceToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.includeService.set(checkbox.checked);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  createOrder() {
    this.isLoading = true;
    const orderRequest = this.cartService.getOrderCartItems();
    orderRequest.serviceCharge = this.includeService();
    this.orderService.createNewOrder(orderRequest).subscribe({
      next: (response) => {
        const paymentUrl = response.paymentPreference.init_point;
        if (paymentUrl) {
          this.redirectToPayment(paymentUrl);
        }
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private redirectToPayment(paymentUrl: string): void {
    window.location.href = paymentUrl;
  }
}
