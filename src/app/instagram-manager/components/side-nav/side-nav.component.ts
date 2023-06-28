import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchService } from 'src/app/Services/search.service';
import { Router } from '@angular/router';
import { AddEditPhotoDialog } from '../../dialogs/add-edit-photo-dialog/add-edit-photo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

const SMALL_WIDTH_BEARKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  searchControl: FormControl = new FormControl('');
  public isScreenSmall: boolean = false;
  @ViewChild('sideNav') sideNav!: MatDrawer;

  constructor(private searchService: SearchService, private router: Router, public dialog: MatDialog, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BEARKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      })

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value);
      this.searchService.searchTitle(value);
    });
  }

  onHomeClick() {
    this.router.navigate(['']);
    
    this.closeSidenav();
  }

  createNewPhoto() {
    this.dialog.open(AddEditPhotoDialog);
    
    this.closeSidenav();
  }
  
  closeSidenav() {
    if(this.isScreenSmall) {
      this.sideNav.close();
    }
  }
  
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.sideNav.opened = true;
    }
  }
}
