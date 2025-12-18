import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'flat' | 'elevated' | 'interactive';

@Component({
    selector: 'ui-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card.html',
    styleUrl: './card.scss',
})
export class CardComponent {
    @Input() variant: CardVariant = 'default';
    @Input() padding = true;

    get cardClasses(): string {
        const classes = ['card'];
        if (this.variant !== 'default') classes.push(`card--${this.variant}`);
        if (!this.padding) classes.push('card--no-padding');
        return classes.join(' ');
    }
}
