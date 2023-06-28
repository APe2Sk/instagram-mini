import { Component, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailsDialog } from '../../dialogs/photo-details-dialog/photo-details-dialog.component';
import { FilterService } from 'src/app/Services/filter.service';
import { Subscription, switchMap } from 'rxjs';
import { Location } from '@angular/common';
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
  receivedObject: PhotoPostInterface | undefined;
  private subscription!: Subscription;

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
      });

    this.subscription = this.dataService.getNewPost().subscribe((object) => {

      const index = this.userPosts.findIndex(obj => obj.id === object.id);

      if (index !== -1) {
        this.userPosts[index] = object;
      } else {
        this.userPosts.unshift(object);
      }

      // console.log(object);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getData(): void {
    this.isLoading = true;

    this.dataService.getPostsByTitle(this.searchValue, this.startLoadData, this.limitLoadData).subscribe((response: PhotoPostInterface[]) => {
      this.userPosts = [...this.userPosts, ...response];
      this.startLoadData += this.limitLoadData;

      this.isLoading = false;
    });
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  findPhotoById(id: number): PhotoPostInterface | undefined {
    const index = this.userPosts.findIndex(photo => photo.id === id);

    if (index !== -1) {
      return this.userPosts[index];
    }
    return undefined;
  }

  openDialog(cardId: number) {
    const dialogRef = this.dialog.open(PhotoDetailsDialog, { data: { newCardsArr: this.findPhotoById(cardId) } });
    console.log(cardId);
    this.location.replaceState(`photos/${cardId}`)

    dialogRef.afterClosed().subscribe((result: DialogActionResult) => {
      this.handleDialogResult(result);
      this.location.replaceState(`photos`);
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

  onScroll(e: any) {
    console.log(e.target.offsetHeight,
      e.target.scrollHeight,
      e.target.scrollTop,
      e.target.offsetHeight);
    if (e.target.scrollHeight <= e.target.scrollTop + e.target.offsetHeight) {
      this.getData();
      console.log("scroll");
    } else {
    }
  }

}