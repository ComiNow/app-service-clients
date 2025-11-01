import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Category } from "../interfaces/product.interface";
import { SessionService } from "./session.service";

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private sessionService = inject(SessionService);
  private businessId = this.sessionService.businessId;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}/categories?businessId=${this.businessId()}`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/categories/${id}?businessId=${this.businessId()}`)
  }
}
