import { Component, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { PhotoService } from 'src/app/Services/photo.service';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailsDialog } from '../../dialogs/photo-details-dialog/photo-details-dialog.component';
import { SearchService } from 'src/app/Services/search.service';
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

  userPhotos: PhotoPostInterface[] = [];
  isHovered: boolean = false;
  searchValue: string = '';
  startLoadData: number = 0;
  limitLoadData: number = 30;
  isLoading: boolean = false;

  constructor(private photoService: PhotoService, public dialog: MatDialog, private searchService: SearchService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getData();

    this.searchService.getSearch().pipe(
      switchMap((searchTitle) => {
        this.startLoadData = 0;
        this.searchValue = searchTitle;
        return this.photoService.getPhotosByTitle(searchTitle, this.startLoadData, this.limitLoadData);
      })).subscribe((userPhotos) => {
        this.userPhotos = userPhotos;
        this.startLoadData += this.limitLoadData;
      });

    this.photoService.getNewPhoto().subscribe((object) => {
      const index = this.userPhotos.findIndex(obj => obj.id === object.id);

      if (index !== -1) {
        this.userPhotos[index] = object;
      } else {
        this.userPhotos.unshift(object);
      }
    });
  }

  getData(): void {
    this.isLoading = true;

    this.photoService.getPhotosByTitle(this.searchValue, this.startLoadData, this.limitLoadData).subscribe((response: PhotoPostInterface[]) => {
      this.userPhotos = [...this.userPhotos, ...response];
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
    const index = this.userPhotos.findIndex(photo => photo.id === id);

    if (index !== -1) {
      return this.userPhotos[index];
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
      const index = this.userPhotos.findIndex(obj => obj.id === result.actionedPhoto.id);

      if (index !== -1) {
        this.userPhotos[index] = result.actionedPhoto;
      }
    }
    else if (result && result.action == PhotoAction.DELETE) {
      this.userPhotos = this.userPhotos.filter(photo => photo.id !== result.actionedPhoto.id);
    }
  }

  onScroll(e: any) {
    if (e.target.scrollHeight <= e.target.scrollTop + e.target.offsetHeight) {
      this.getData();
      console.log("scroll");
    } else {
    }
  }

}