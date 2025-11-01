import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { BestSellingProductsComponent } from "../../components/best-selling-products/best-selling-products.component";
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { AppConfigService } from '../../../services/app-config.service';

@Component({
  selector: 'app-home-page',
  imports: [CategoryCardComponent, ProductCardComponent, CarouselComponent, BestSellingProductsComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  ordersService = inject(OrdersService);
  cartService = inject(CartService);
  appConfigService = inject(AppConfigService);

  searchText = signal('');
  showSections = computed(() => !this.searchText());

  get brandName(): string {
    return this.appConfigService.brand;
  }

  constructor(private route: ActivatedRoute) { }

  categoriesResource = rxResource({
    loader: () => this.categoriesService.getCategories(),
  });

  productsResource = rxResource({
    loader: () => this.productsService.getProducts(),
  });

  topSellingProductsResource = rxResource({
    loader: () => this.productsService.getTopSellingProducts(),
  });

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnInit() {
    console.log('HomePageComponent initialized');
    this.route.queryParams.subscribe(params => {
      const paidStatus = params['status'];
      if(paidStatus === 'approved') {
        this.clearCart();
      }
    });
  }

  filteredProducts = computed(() => {
    const allProducts = this.productsResource.value()?.data || [];
    const currentSearchText = this.searchText().toLowerCase();

    if (!currentSearchText) {
      return allProducts;
    }

    return allProducts.filter(product =>
      product.name.toLowerCase().includes(currentSearchText)
    );
  });

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchText.set(inputElement.value);
  }
}
