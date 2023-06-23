import { Component, Input, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FilterService } from 'src/app/Services/filter.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule],
  
})


export class MainContentComponent implements OnInit {

  urlUserPosts: string = 'https://jsonplaceholder.typicode.com/photos';

  userPosts: PhotoPostInterface[] = [];
  isHovered: boolean = false;
  //new
  // filteredItems: PhotoPostInterface[] = this.userPosts.slice();
  inputValue: string = '';
  

  constructor(private dataService: DataService, public dialog: MatDialog, private filterService: FilterService) {
    
  }

  ngOnInit(): void {
    this.getData();
  }  

  getData(): void {
    this.dataService.getUserPosts(this.urlUserPosts).subscribe((response: PhotoPostInterface[]) => {
    this.userPosts = response.slice(0, 15);
  });
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

