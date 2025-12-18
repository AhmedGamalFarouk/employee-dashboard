import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
@Component({
  selector: 'app-j-table',
  imports: [CommonModule],
  templateUrl: './j-table.html',
  styleUrl: './j-table.scss',
})
export class JTable {
  // @Input({ required: true }) data: any[] = [];
  // @Input({ required: true }) columns: any[] = [];
  // @Input() actions: any[] = [];
  // @Input() rowAction: () => void = () => { };

  // getKeys(obj: Object) {
  //   return obj ? Object.keys(obj) : [];
  // }
  // executeAction(action: any, item: any, e: Event) {
  //   e.stopPropagation();
  //   action.action(item);
  // }
}
