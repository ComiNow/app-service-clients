import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'order-position-dialog',
  templateUrl: 'order-position.component.html',
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPositionDialog {
  readonly dialogRef = inject(MatDialogRef<OrderPositionDialog>);
  turnNumber = signal(0);
  loading = signal(true);

  ordersService = inject(OrdersService);

  private intervalId: any;
  private firstFetch = true;

  fetchTurnNumber() {
    if (this.firstFetch) {
      this.loading.set(true);
    }
    this.ordersService.getOrderPositionByTableId().subscribe({
      next: (response) => {
        console.log('Order position fetched:', response);
        this.turnNumber.set(response.orderPosition);
        this.loading.set(false);
        this.firstFetch = false;
      },
      error: (error) => {
        console.error('Error fetching order position:', error);
        this.turnNumber.set(0);
      }
    });
  }

  ngOnInit() {
    this.fetchTurnNumber();
    this.intervalId = setInterval(() => {
      this.fetchTurnNumber();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  closeModal() {
    this.dialogRef.close();
  }
}
