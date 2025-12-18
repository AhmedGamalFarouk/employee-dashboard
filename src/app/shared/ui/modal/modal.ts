import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge';

@Component({
    selector: 'ui-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.html',
    styleUrl: './modal.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() icon?: string;
    @Input() size: ModalSize = 'medium';
    @Input() closeOnOverlay = true;

    @Output() closed = new EventEmitter<void>();

    get containerClasses(): string {
        const classes = ['modal-container'];
        if (this.size !== 'medium') classes.push(`modal-container--${this.size}`);
        return classes.join(' ');
    }

    onOverlayClick(event: MouseEvent): void {
        if (this.closeOnOverlay && (event.target as HTMLElement).classList.contains('modal-overlay')) {
            this.close();
        }
    }

    close(): void {
        this.closed.emit();
    }
}
