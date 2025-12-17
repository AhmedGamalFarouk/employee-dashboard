import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-orders',
  imports: [],
  templateUrl: './buy-orders.html',
  styleUrl: './buy-orders.scss',
})
export class BuyOrders {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
