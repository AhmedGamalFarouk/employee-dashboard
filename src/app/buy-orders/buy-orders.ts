import { Component } from '@angular/core';
import { ModalComponent, ButtonComponent, DataTableComponent, FilterConfig } from '../shared/ui';

@Component({
  selector: 'app-buy-orders',
  imports: [ModalComponent, ButtonComponent, DataTableComponent],
  templateUrl: './buy-orders.html',
  styleUrl: './buy-orders.scss',
})
export class BuyOrders {
  showModal = false;
  searchValue = '';
  filterValues: Record<string, string> = {};

  // Filter configuration for the items table
  itemFilters: FilterConfig[] = [
    { key: 'pg', placeholder: 'PG' },
    { key: 'color', placeholder: 'Color' },
    { key: 'size', placeholder: 'Size' },
    { key: 'shade', placeholder: 'Shade' },
  ];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSearchChange(value: string) {
    this.searchValue = value;
    // Implement search logic
  }

  onFilterChange(filters: Record<string, string>) {
    this.filterValues = filters;
    // Implement filter logic
  }
}
