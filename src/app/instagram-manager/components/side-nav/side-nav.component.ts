import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FilterService } from 'src/app/Services/filter.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  // //new
  searchControl: FormControl = new FormControl('');


  constructor(private filterService: FilterService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
      this.filterService.searchTitle(value);    
    });
  }

  onHomeClick() {
    this.router.navigate(['']);
  }

  createNewPost() {
    this.dialog.open(AddComponent);
  }
}
