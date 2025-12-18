import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';

@Component({
    selector: 'ui-form-field',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './form-field.html',
    styleUrl: './form-field.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldComponent),
            multi: true,
        },
    ],
})
export class FormFieldComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() type: InputType = 'text';
    @Input() size: InputSize = 'md';
    @Input() required = false;
    @Input() disabled = false;
    @Input() error = '';
    @Input() hint = '';
    @Input() id = `field-${Math.random().toString(36).substring(2, 9)}`;

    value = '';
    onChange: (value: string) => void = () => { };
    onTouched: () => void = () => { };

    get inputClasses(): string {
        const classes = ['form-input'];
        if (this.size !== 'md') classes.push(`form-input--${this.size}`);
        if (this.error) classes.push('form-input--error');
        return classes.join(' ');
    }

    writeValue(value: string): void {
        this.value = value || '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }
}
