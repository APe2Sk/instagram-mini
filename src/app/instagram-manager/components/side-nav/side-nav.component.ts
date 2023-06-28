import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FilterService } from 'src/app/Services/filter.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AddComponent } from '../../dialogs/add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { state } from '@angular/animations';

const SMALL_WIDTH_BEARKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  // //new
  searchControl: FormControl = new FormControl('');
  public isScreenSmall: boolean = false;


  constructor(private filterService: FilterService, private router: Router, public dialog: MatDialog, public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BEARKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      })

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
