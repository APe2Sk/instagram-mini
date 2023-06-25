import { ChangeDetectionStrategy, Component, Directive, HostListener, Input, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FilterService } from 'src/app/Services/filter.service';
import { Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DialogActionResult } from 'src/app/Interfaces/dialog-action-result';
import { PhotoAction } from '../../enums/photo-action-enum';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  userPosts: PhotoPostInterface[] = [];
  isHovered: boolean = false;
  searchValue: string = '';
  startLoadData: number = 0;
  limitLoadData: number = 30;
  isLoading: boolean = false;


  constructor(private dataService: DataService, public dialog: MatDialog, private filterService: FilterService,
    private location: Location) {

  }

  ngOnInit(): void {
    this.getData();

    this.filterService.getSearch().pipe(
      switchMap((searchTitle) => {
        this.startLoadData = 0;
        this.searchValue = searchTitle;
        return this.dataService.getPostsByTitle(searchTitle, this.startLoadData, this.limitLoadData);
      })).subscribe((userPhotos) => {
        this.userPosts = userPhotos;
      })

  }

  getData(): void {
    this.isLoading = true;

    this.dataService.getPostsByTitle(this.searchValue, this.startLoadData, this.limitLoadData).subscribe((response: PhotoPostInterface[]) => {
      this.userPosts = [...this.userPosts, ...response];
      this.startLoadData += this.limitLoadData;

      this.isLoading = false;
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
    const dialogRef = this.dialog.open(DialogComponent, { data: { photoId: cardId } });
    this.location.replaceState(`photos/${cardId}`)

    dialogRef.afterClosed().subscribe((result: DialogActionResult) => {
      this.handleDialogResult(result);
      this.location.replaceState(`photos`)
    });
  }

  handleDialogResult(result: DialogActionResult) {
    if (result && result.action == PhotoAction.EDIT) {
      const index = this.userPosts.findIndex(obj => obj.id === result.actionedPhoto.id);
  
      if (index !== -1) {
        this.userPosts[index] = result.actionedPhoto;
  }
    }
    else if (result && result.action == PhotoAction.DELETE) {
      this.userPosts = this.userPosts.filter(photo => photo.id !== result.actionedPhoto.id);
    }
  }

  onScroll(e: any){
    console.log(e.target.offsetHeight , 
                e.target.scrollHeight , 
                e.target.scrollTop,
                e.target.offsetHeight);
    if(e.target.scrollHeight <= e.target.scrollTop+e.target.offsetHeight) {
      this.getData();
      console.log("scroll");
    } else {
    }
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

