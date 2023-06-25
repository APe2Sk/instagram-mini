import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlbumInterface } from 'src/app/Interfaces/album-interface';
import { AlbumService } from 'src/app/Services/album.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  selectedImage: string | ArrayBuffer | null = null;
  title: string = '';
  albums: AlbumInterface[] = [];

  constructor(private dialogRef: MatDialogRef<AddComponent>, private albumService: AlbumService) {}

  // onImageSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedImage = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe((albums) => {
      this.albums = albums;
    })
  }

  submitForm(): void {
    // Handle form submission, including the selectedImage and description values
    // e.g., send them to a server, update the model, etc.
    console.log('Selected Image:', this.selectedImage);
    console.log('Title:', this.title);
  }

  dragOver: boolean = false;

  onDrop(event: any): void {
    event.preventDefault();
    this.dragOver = false;

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageSrc = e.target.result;
          // Handle the image source as needed (e.g., display the image, upload to a server, etc.)
          console.log('Image source:', imageSrc);
          this.selectedImage = imageSrc;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    this.dragOver = false;
  }



}
