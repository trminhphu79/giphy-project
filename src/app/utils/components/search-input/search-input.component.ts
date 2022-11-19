import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchInputComponent,
      multi: true,
    }
  ]
})
export class SearchInputComponent implements ControlValueAccessor {


  @Input('value') _value = '';
  @Input('type') type = 'text'
  @Input() disabled: boolean = false;
  @Input() label: string = 'label';
  @Input() placeholder: string = 'Search...';

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: string) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  valueChanges(event: any) {
    let _value = event?.target.value;
    this.value = _value;
  }

  clear(){
    this.value = '';
  };

  markOnTouched() {
    this.onTouched()
  }
}
