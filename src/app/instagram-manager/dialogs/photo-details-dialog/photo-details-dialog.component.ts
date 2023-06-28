import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { PhotoService } from 'src/app/Services/photo.service';
import { AlbumService } from 'src/app/Services/album.service';
import { AlbumExtendedInterface } from 'src/app/Interfaces/album-extended-interface';
import { concatMap, filter, map } from 'rxjs';
import { PhotoAction } from '../../enums/photo-action-enum';
import { DeletePhotoDialog } from '../delete-photo-dialog/delete-photo-dialog.component';
import { AddEditPhotoDialog } from '../add-edit-photo-dialog/add-edit-photo-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './photo-details-dialog.component.html',
  styleUrls: ['./photo-details-dialog.component.css']
})

export class PhotoDetailsDialog {
  userPhotoPost!: PhotoPostInterface;
  isLoadingImage: boolean = true;
  userAlbum!: AlbumExtendedInterface;

  constructor(private dialogRef: MatDialogRef<PhotoDetailsDialog>, private photoService: PhotoService, private albumService: AlbumService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {
    newCardsArr: PhotoPostInterface
  }) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userPhotoPost = this.data.newCardsArr;
    console.log("in method", this.userPhotoPost);
    this.albumService.getAlbumById(this.userPhotoPost.albumId).subscribe((album) => {
      this.userAlbum = album;
      this.isLoadingImage = false;
    });
  }

  openAddDialog() {
    this.dialog.open(AddEditPhotoDialog);
  }

  openEditDialog() {
    console.log(this.userPhotoPost);
    const dialogRef = this.dialog.open(AddEditPhotoDialog, { data: { photoToEdit: this.userPhotoPost } });
    dialogRef.afterClosed().pipe(
      filter((value) => value !== undefined),
      concatMap((editedPhoto) => {
        this.userPhotoPost = editedPhoto;
        console.log(this.userPhotoPost);
        return this.albumService.getAlbumById(this.userPhotoPost.albumId);
      })).subscribe((album) => {
        this.userAlbum = album;
      });
  }

  deleteData() {
    this.isLoadingImage = true;
    this.photoService.deletePhoto(this.userPhotoPost.id).subscribe(() => {
      this.dialogRef.close({ action: PhotoAction.DELETE, actionedPhoto: this.userPhotoPost });
    })
  }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeletePhotoDialog);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteData();
      }
    })
  }
}
