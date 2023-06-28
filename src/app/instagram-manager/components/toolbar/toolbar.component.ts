import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { FilterService } from 'src/app/Services/filter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  searchControl: FormControl = new FormControl('');


  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private router: Router, private filterService: FilterService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
      this.filterService.searchTitle(value);    
    });
  }

  onHomeClick() {
    this.router.navigate(['']);
  }

}
