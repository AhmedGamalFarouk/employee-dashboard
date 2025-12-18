import { Component, Input, Output, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
    sortable?: boolean;
}

export interface FilterConfig {
    key: string;
    placeholder: string;
    type?: 'text' | 'select';
    options?: { value: string; label: string }[];
}

@Component({
    selector: 'ui-data-table',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './data-table.html',
    styleUrl: './data-table.scss',
    encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent {
    // Panel configuration
    @Input() title = '';
    @Input() subtitle = '';
    @Input() icon = '';

    // Search configuration
    @Input() showSearch = true;
    @Input() searchPlaceholder = 'Search...';
    @Input() searchValue = '';
    @Output() searchChange = new EventEmitter<string>();

    // Filter configuration
    @Input() filters: FilterConfig[] = [];
    @Input() filterValues: Record<string, string> = {};
    @Output() filterChange = new EventEmitter<Record<string, string>>();

    // Pagination configuration
    @Input() showPagination = true;
    @Input() currentPage = 1;
    @Input() totalItems = 0;
    @Input() pageSize = 10;
    @Output() pageChange = new EventEmitter<number>();

    // Content projection templates
    @ContentChild('headerActions') headerActionsTemplate?: TemplateRef<any>;
    @ContentChild('tableContent') tableContentTemplate?: TemplateRef<any>;
    @ContentChild('footerActions') footerActionsTemplate?: TemplateRef<any>;

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    get startItem(): number {
        return (this.currentPage - 1) * this.pageSize + 1;
    }

    get endItem(): number {
        return Math.min(this.currentPage * this.pageSize, this.totalItems);
    }

    onSearchInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchValue = value;
        this.searchChange.emit(value);
    }

    onFilterInput(key: string, event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.filterValues = { ...this.filterValues, [key]: value };
        this.filterChange.emit(this.filterValues);
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.pageChange.emit(page);
        }
    }

    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }
}
