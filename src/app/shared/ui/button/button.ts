import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'ui-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.html',
    styleUrl: './button.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
    @Input() variant: ButtonVariant = 'primary';
    @Input() size: ButtonSize = 'md';
    @Input() disabled = false;
    @Input() icon?: string;
    @Input() iconOnly = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';

    get buttonClasses(): string {
        const classes = ['btn', `btn--${this.variant}`];
        if (this.size !== 'md') classes.push(`btn--${this.size}`);
        if (this.iconOnly) classes.push('btn--icon');
        return classes.join(' ');
    }
}
