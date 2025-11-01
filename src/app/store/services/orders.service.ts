import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { OrderPositionResponse, OrderServiceRequest, OrderServiceResponse, PaidOrderRespnse, TableResponse } from "../interfaces/order.interface";
import { SessionService } from "./session.service";

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private sessionService = inject(SessionService);
  private businessId = this.sessionService.businessId;
  private tableId = this.sessionService.tableId;

  createNewOrder(request: OrderServiceRequest): Observable<OrderServiceResponse> {
    return this.http.post<OrderServiceResponse>(`${baseUrl}/orders`, request);
  }

  getTableById(): Observable<TableResponse> {
    return this.http.get<TableResponse>(`${baseUrl}/tables/${this.businessId()}/${this.tableId()}`);
  }

  getOrderPositionByTableId(): Observable<OrderPositionResponse> {
    return this.http.get<OrderPositionResponse>(`${baseUrl}/orders/${this.businessId()}/order-position-by-table/${this.tableId()}`);
  }

  getOrderByTableId(): Observable<PaidOrderRespnse> {
    return this.http.get<PaidOrderRespnse>(`${baseUrl}/orders/${this.businessId()}/paid-order-by-table/${this.tableId()}`);
  }

}
