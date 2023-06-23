import { Component, Input, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FilterService } from 'src/app/Services/filter.service';
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})


export class MainContentComponent implements OnInit {


  userPosts: PhotoPostInterface[] = [];
  isHovered: boolean = false;
  inputValue: string = '';
  

  constructor(private dataService: DataService, public dialog: MatDialog, private filterService: FilterService) {
    
  }

  ngOnInit(): void {
    this.getData();

    this.filterService.getSearch().pipe(
      switchMap((searchTitle) => {
        return this.dataService.getPostsByTitle(searchTitle);
    })).subscribe((userPhotos) => {
      this.userPosts = userPhotos;
    })

  }  

  getData(): void {
    this.dataService.getUserPosts().subscribe((response: PhotoPostInterface[]) => {
    this.userPosts = response.slice(0, 15);
  });
  }


  getDataFromSearch(title: string) {
    this.dataService.getPostsByTitle(title).subscribe((response) => {
      this.userPosts = response;
    })
  }

  // onClickElement(cardId: number): void {
  //   console.log("Clciked element", cardId);
  // }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  openDialog(cardId: number) {
    this.dialog.open(DialogComponent, {data: cardId});
    console.log("in main:", cardId);
  }


  //new
  // applyFilter(filterText: string) {
  //   if (filterText) {
  //     this.filteredItems = this.userPosts.filter(userPost =>
  //       userPost.title.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   } else {
  //     this.filteredItems = this.userPosts.slice(); // Reset to all items
  //   }
  }

