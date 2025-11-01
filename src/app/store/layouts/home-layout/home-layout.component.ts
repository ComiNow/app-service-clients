import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { OrdersService } from '../../services/orders.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './home-layout.component.html',
})
export class HomeLayoutComponent implements OnInit {
  tableNumber: string | null = null;
  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  private sessionService = inject(SessionService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tableId = params['tableId'];
      const businessId = params['businessId'];
      if (tableId) {
        this.sessionService.setTableAndBusinessId(tableId, businessId);
        this.ordersService.getTableById().subscribe({
          next: (response) => {
            if (response.number) {
              this.tableNumber = response.number.toString();
              sessionStorage.setItem('tableNumber', response.number.toString());
            }
          },
          error: (error) => {
            console.error('Error fetching table by ID:', error);
            sessionStorage.removeItem('tableId');
            this.tableNumber = null;
          }
        });
      } else {
        this.tableNumber = sessionStorage.getItem('tableNumber');
      }
    });
  }
}
