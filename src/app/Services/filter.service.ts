import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  inputValue: string ='';

  setInputValue(value: string) {
    this.inputValue = value;
    console.log(this.inputValue)
  }

  getInputValue() {
    return this.inputValue;
  }

}
