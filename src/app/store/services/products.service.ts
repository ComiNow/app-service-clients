import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Product, ProductsResponse } from "../interfaces/product.interface";
import { SessionService } from "./session.service";

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private sessionService = inject(SessionService);
  private businessId = this.sessionService.businessId;

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${baseUrl}/products?businessId=${this.businessId()}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${id}?businessId=${this.businessId()}`)
  }

  getTopSellingProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${baseUrl}/products/top-selling?businessId=${this.businessId()}`);
  }
}
