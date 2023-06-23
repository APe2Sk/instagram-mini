import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FilterService } from 'src/app/Services/filter.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  // //new
  searchControl: FormControl = new FormControl('');


  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
      this.filterService.searchTitle(value);    
    });
  }
}
