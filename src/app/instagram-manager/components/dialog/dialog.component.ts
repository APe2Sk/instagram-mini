import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AlbumService } from 'src/app/Services/album.service';
import { AlbumExtendedInterface } from 'src/app/Interfaces/album-extended-interface';
import { UserInterface } from 'src/app/Interfaces/user-interface';
import { concatMap, map } from 'rxjs';
import { EditComponent } from '../edit/edit.component';
import { PhotoAction } from '../../enums/photo-action-enum';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  userPost!: PhotoPostInterface;
  isLoadingImage: boolean = true;
  imgUrl: string = '';
  userAlbum!: AlbumExtendedInterface;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService, private albumService: AlbumService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {
    photoId: number
  }) {}

  ngOnInit(): void {
    this.getData();
  } 

  getData(): void {
    this.dataService.getUserPostsById(this.data.photoId)
      .pipe(concatMap((response) => {
        this.userPost = response;
        // console.log("in dialog", this.userPost.id);
        this.imgUrl = this.userPost.url;
        return this.albumService.getAlbumById(response.albumId)
      })).subscribe((album) => {
        this.userAlbum = album;
        this.isLoadingImage = false;
      });
  }

  openAddDialog() {
    this.dialog.open(EditComponent);
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
      if(result) {
        this.deleteData();

      }
    })
  }


  // getData(): void {
  //   this.dataService.getUserPostsById(this.data.photoId).subscribe((response: PhotoPostInterface) => {
  //     this.userPost = response;
  //     console.log("in dialog", this.userPost.id);
  //     this.imgUrl = this.userPost.url;
  //     this.isLoadingImage = false;
  //   }, (error: any) => {
  //     console.error('Error fetching image URL:', error);
  //     this.isLoadingImage = false;
  //   });
  // }
  
}
