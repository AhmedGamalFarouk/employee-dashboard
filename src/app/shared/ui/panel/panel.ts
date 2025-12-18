import { Component, Input, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PanelIconVariant = 'default' | 'success' | 'warning' | 'danger';

@Component({
    selector: 'ui-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './panel.html',
    styleUrl: './panel.scss',
    encapsulation: ViewEncapsulation.None,
})
export class PanelComponent {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() icon?: string;
    @Input() iconVariant: PanelIconVariant = 'default';
    @Input() showFooter = false;

    get iconClasses(): string {
        const classes = ['panel-icon'];
        if (this.iconVariant !== 'default') classes.push(`panel-icon--${this.iconVariant}`);
        return classes.join(' ');
    }
}
