import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatProgressSpinnerModule, MatIconModule, MatMenuModule, MatButtonModule],

})

export class DialogComponent {
  
  userPost!: PhotoPostInterface;
  isLoadingImage: boolean = true;
  imgUrl: string = '';


  constructor(private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: {
    photoId: number
  }) {}

  ngOnInit(): void {
    this.getData();
  } 

  getData(): void {
    this.dataService.getUserPostsById(this.data.photoId).subscribe((response: PhotoPostInterface) => {
      this.userPost = response;
      console.log("in dialog", this.userPost.id);
      this.imgUrl = this.userPost.url;
      this.isLoadingImage = false;
    }, (error: any) => {
      console.error('Error fetching image URL:', error);
      this.isLoadingImage = false;
    });
  }
  
}
