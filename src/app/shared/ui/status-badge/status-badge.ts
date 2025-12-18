import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
    | 'active' | 'offline' | 'leave'
    | 'success' | 'warning' | 'error' | 'info' | 'neutral'
    | 'sufficient' | 'low' | 'critical'
    | 'completed' | 'pending' | 'processing' | 'cancelled';

export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'ui-status-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './status-badge.html',
    styleUrl: './status-badge.scss',
    encapsulation: ViewEncapsulation.None,
})
export class StatusBadgeComponent {
    @Input() variant: BadgeVariant = 'neutral';
    @Input() size: BadgeSize = 'md';
    @Input() showDot = false;
    @Input() icon?: string;

    get badgeClasses(): string {
        const classes = ['status-badge', `status-badge--${this.variant}`];
        if (this.size !== 'md') classes.push(`status-badge--${this.size}`);
        return classes.join(' ');
    }
}
