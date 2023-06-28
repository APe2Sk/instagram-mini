import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  searchControl: FormControl = new FormControl('');


  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
      this.searchService.searchTitle(value);
    });
  }

  onHomeClick() {
    this.router.navigate(['']);
  }

}
