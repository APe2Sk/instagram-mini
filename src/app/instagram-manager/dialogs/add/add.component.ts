import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlbumInterface } from 'src/app/Interfaces/album-interface';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { AlbumService } from 'src/app/Services/album.service';
import { DataService } from 'src/app/Services/data.service';
import { PhotoAction } from '../../enums/photo-action-enum';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  selectedImage: string | ArrayBuffer | null = null;
  albums: AlbumInterface[] = [];
  isLoadingImage: boolean = false;
  postForEdit: PhotoPostInterface | undefined;
  mode: PhotoAction = PhotoAction.ADD;
  addEditForm!: FormGroup;



  constructor(private dialogRef: MatDialogRef<AddComponent>, private albumService: AlbumService, private _snackBar: MatSnackBar,
    private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: {
      photoToEdit: PhotoPostInterface
    }, private formBuilder: FormBuilder, private notificationService: NotificationService) {
    }


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
    this.albumService.getAllAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
    }, error: (err) => {
      this.notificationService.raiseError("Albums when loading albums");
      console.log(err);
    }});

    if(this.data !== null && this.data.photoToEdit !== null) {
      this.postForEdit = this.data.photoToEdit;
      console.log(this.postForEdit)

      this.selectedImage = this.postForEdit.url;
      this.mode = PhotoAction.EDIT;
    }
    this.createForm();

  }

  createForm() {
    this.addEditForm = this.formBuilder.group({
      title: [this.postForEdit?.title ?? '', Validators.required],
      albumId: [this.postForEdit?.albumId ?? '', Validators.required],
      photo: [this.postForEdit?.url ?? '', Validators.required]
    });
  }

  submitForm(): void {
    // Handle form submission, including the selectedImage and description values
    // e.g., send them to a server, update the model, etc.
    // console.log('Selected Image:', this.imageUrl);
    // console.log('Title:', this.title);
    // console.log('Album:', this.selectedImage);
    this.isLoadingImage = true;


    const objectToSend = { 
      albumId: this.photoAlbumId, 
      title: this.photoTitle, 
      url: this.photo, 
      thumbnailUrl: this.photo };


    if(this.mode == PhotoAction.EDIT) {
      this.dataService.editPost(objectToSend, this.postForEdit!.id).subscribe({
        next: (photo) => {          
          this.sendObject(photo);
          this.dialogRef.close(photo);
        },
        error: (err) => {
          this.notificationService.raiseError(`The photo with id ${this.postForEdit?.id} was not found`);
          console.log(err.message);
          this.isLoadingImage = false;
        }
      });

      // (result) => {
      //   this.sendObject(result);
      //   this.dialogRef.close(result);
      //   console.log("in edit", result.id);
      // }
    } else if (this.mode == PhotoAction.ADD) {
      this.dataService.addPost(objectToSend).subscribe(result => {
        this.sendObject(result);
        this.dialogRef.close();
      });
    }
  }

  sendObject(objectToSend: PhotoPostInterface) {
    this.dataService.setNewPost(objectToSend);
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

          //ova go dodadov
          this.readFile(file);

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

  clearImage(): void {
    this.selectedImage = null;
    this.addEditForm.get("photo")?.setValue(this.selectedImage);
    console.log('clear');
  }



  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.readFile(file);
    }
  }

  readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      console.log("in read file", this.selectedImage);
      this.addEditForm.get("photo")?.setValue(this.selectedImage);
    };
    reader.readAsDataURL(file);
  }

  onCancel() {
    this.isLoadingImage = true;
    this.dialogRef.close();
  }


  
  
  get photoTitle(): string  {
    return this.addEditForm.get('title')!.value
  }

  get photoAlbumId(): number  {
    return this.addEditForm.get('albumId')!.value
  }

  get photo(): string  {
    return this.addEditForm.get('photo')!.value
  }
  

}
