import { Component } from '@angular/core';
import { DataTableComponent } from '../shared/ui/data-table/data-table';

@Component({
  selector: 'app-dashboard',
  imports: [DataTableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  searchValue = '';

  onSearchChange(value: string) {
    this.searchValue = value;
    // Implement search logic
  }
}
