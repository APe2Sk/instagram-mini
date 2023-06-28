import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AlbumService } from 'src/app/Services/album.service';
import { AlbumExtendedInterface } from 'src/app/Interfaces/album-extended-interface';
import { UserInterface } from 'src/app/Interfaces/user-interface';
import { concatMap, filter, map } from 'rxjs';
import { PhotoAction } from '../../enums/photo-action-enum';
import { DeleteComponent } from '../delete/delete.component';
import { AddComponent } from '../add/add.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './photo-details-dialog.component.html',
  styleUrls: ['./photo-details-dialog.component.css']
})

export class PhotoDetailsDialog {
  userPost!: PhotoPostInterface;
  isLoadingImage: boolean = true;
  imgUrl: string = '';
  userAlbum!: AlbumExtendedInterface;

  constructor(private dialogRef: MatDialogRef<PhotoDetailsDialog>, private dataService: DataService, private albumService: AlbumService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {
    newCardsArr: PhotoPostInterface
  }) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userPost = this.data.newCardsArr;
    console.log("in method", this.userPost);
    this.albumService.getAlbumById(this.userPost.albumId).subscribe((album) => {
      this.userAlbum = album;
      this.isLoadingImage = false;
    });
  }

  openAddDialog() {
    this.dialog.open(AddComponent);
  }

  openEditDialog() {
    console.log(this.userPost);
    const dialogRef = this.dialog.open(AddComponent, { data: { photoToEdit: this.userPost } });
    dialogRef.afterClosed().pipe(
      filter((value) => value !== undefined),
      concatMap((editedPhoto) => {
        this.userPost = editedPhoto;
        console.log(this.userPost);
        return this.albumService.getAlbumById(this.userPost.albumId);
      })).subscribe((album) => {
        this.userAlbum = album;
      });
  }


  deleteData() {
    this.isLoadingImage = true;
    this.dataService.deletePost(this.userPost.id).subscribe(() => {
      this.dialogRef.close({ action: PhotoAction.DELETE, actionedPhoto: this.userPost });
    })
  }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeleteComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteData();

      }
    })
  }



}
