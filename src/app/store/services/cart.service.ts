import { Injectable, computed, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { OrderServiceRequest, PaidMethodType } from '../interfaces/order.interface';
import { SessionService } from './session.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<CartItem[]>([]);

  public cartItems = computed(() => this._cartItems());
  private sessionService = inject(SessionService);
  private businessId = this.sessionService.businessId;

  public totalItems = computed(() => {
    return this._cartItems().reduce((total, item) => total + item.quantity, 0);
  });
  public totalAmount = computed(() => {
    return this._cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this._cartItems();
    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity,
      };
      this._cartItems.set(updatedCart);
    } else {
      this._cartItems.set([...currentCart, { product, quantity }]);
    }

    this.saveCartToStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this._cartItems();
    const updatedCart = currentCart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this._cartItems.set(updatedCart);
    this.saveCartToStorage();
  }

  removeFromCart(productId: number): void {
    const currentCart = this._cartItems();
    const updatedCart = currentCart.filter(
      (item) => item.product.id !== productId
    );
    this._cartItems.set(updatedCart);
    this.saveCartToStorage();
  }

  clearCart(): void {
    this._cartItems.set([]);
    localStorage.removeItem('cart');
  }

  getOrderCartItems(): OrderServiceRequest {
    return {
      table: Number(sessionStorage.getItem('tableNumber')),
      paidMethodType: PaidMethodType.ONLINE,
      items: this._cartItems().map((item) => ({
        productId: item.product.id,
        price: item.product.price,
        quantity: item.quantity,
      })),
      businessId: this.businessId()!,
    };
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this._cartItems()));
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          this._cartItems.set(parsedCart);
        }
      } catch (error) {
        console.error('Error al procesar el carrito desde localStorage', error);
      }
    }
  }
}
