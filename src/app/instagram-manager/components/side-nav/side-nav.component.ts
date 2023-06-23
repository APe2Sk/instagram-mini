import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FilterService } from 'src/app/Services/filter.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  // //new
  inputValue: string='';


  constructor(private filterService: FilterService) {}

  onInputValueChange() {
    this.filterService.setInputValue(this.inputValue);
  }
  
}
