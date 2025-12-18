import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../shared/ui/data-table/data-table';

interface WarehouseItem {
    id: number;
    itemName: string;
    unit: string;
    color: string;
    length: number;
    width: number;
    content: string;
    type: string;
    surface: string;
    height: number;
    weight: number;
    globalCode: string;
    brand: string;
    reorderLevel: number;
    notes: string;
    requiredQty: number;
    requiredUnit: string;
    availableQty: number;
    availableUnit: string;
    selected: boolean;
}

@Component({
    selector: 'app-warehouse',
    imports: [FormsModule, DataTableComponent],
    templateUrl: './warehouse.html',
    styleUrl: './warehouse.scss',
})
export class Warehouse {
    items: WarehouseItem[] = [
        { id: 1, itemName: 'Iron Angle', unit: 'meter', color: 'Gray', length: 6, width: 50, content: 'Steel', type: 'L-Shape', surface: 'Galvanized', height: 50, weight: 5.2, globalCode: 'IA-6050-001', brand: 'SteelCo', reorderLevel: 10, notes: 'High-quality structural steel', requiredQty: 5, requiredUnit: 'meter', availableQty: 3, availableUnit: 'meter', selected: false },
        { id: 2, itemName: 'Copper Wire', unit: 'meter', color: 'Copper', length: 100, width: 2.5, content: 'Pure Copper', type: 'Electrical', surface: 'Bare', height: 2.5, weight: 0.3, globalCode: 'CW-100-002', brand: 'WireTech', reorderLevel: 50, notes: 'For electrical installations', requiredQty: 12, requiredUnit: 'meter', availableQty: 10, availableUnit: 'meter', selected: false },
        { id: 3, itemName: 'Steel Pipe', unit: 'piece', color: 'Black', length: 3, width: 50, content: 'Carbon Steel', type: 'Seamless', surface: 'Black Steel', height: 50, weight: 12.5, globalCode: 'SP-3050-003', brand: 'PipeMaster', reorderLevel: 15, notes: 'For plumbing and construction', requiredQty: 20, requiredUnit: 'piece', availableQty: 15, availableUnit: 'piece', selected: false },
        { id: 4, itemName: 'Aluminum Sheet', unit: 'kg', color: 'Silver', length: 2, width: 1, content: 'Aluminum Alloy', type: 'Flat', surface: 'Smooth', height: 0.5, weight: 1.8, globalCode: 'AS-2010-004', brand: 'AluTech', reorderLevel: 20, notes: 'Lightweight and corrosion resistant', requiredQty: 8, requiredUnit: 'kg', availableQty: 12, availableUnit: 'kg', selected: false },
        { id: 5, itemName: 'PVC Tube', unit: 'meter', color: 'White', length: 4, width: 32, content: 'PVC', type: 'Pressure Pipe', surface: 'Smooth', height: 32, weight: 0.8, globalCode: 'PVC-4032-005', brand: 'PlasticPro', reorderLevel: 25, notes: 'For water supply systems', requiredQty: 30, requiredUnit: 'meter', availableQty: 25, availableUnit: 'meter', selected: false },
    ];

    selectAll = false;
    showModal = false;
    showInfoModal = false;
    selectedItem: WarehouseItem | null = null;

    get selectedCount(): number {
        return this.items.filter(item => item.selected).length;
    }

    toggleAll() {
        this.selectAll = !this.selectAll;
        this.items.forEach(item => item.selected = this.selectAll);
    }

    toggleItem(item: WarehouseItem) {
        item.selected = !item.selected;
        this.selectAll = this.items.every(i => i.selected);
    }

    getStockStatus(item: WarehouseItem): string {
        const ratio = item.availableQty / item.requiredQty;
        if (ratio >= 1) return 'sufficient';
        if (ratio >= 0.5) return 'low';
        return 'critical';
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    openInfoModal(item: WarehouseItem, event: Event) {
        event.stopPropagation();
        this.selectedItem = { ...item };
        this.showInfoModal = true;
    }

    closeInfoModal() {
        this.showInfoModal = false;
        this.selectedItem = null;
    }

    saveItemInfo() {
        if (this.selectedItem) {
            const index = this.items.findIndex(i => i.id === this.selectedItem!.id);
            if (index !== -1) {
                this.items[index] = { ...this.selectedItem };
            }
        }
        this.closeInfoModal();
    }

    onOverlayClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.closeModal();
        }
    }

    onInfoOverlayClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.closeInfoModal();
        }
    }
}
