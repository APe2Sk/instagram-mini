import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlbumInterface } from 'src/app/Interfaces/album-interface';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { AlbumService } from 'src/app/Services/album.service';
import { PhotoService } from 'src/app/Services/photo.service';
import { PhotoAction } from '../../enums/photo-action-enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-edit-photo-dialog.component.html',
  styleUrls: ['./add-edit-photo-dialog.component.css'],
})

export class AddEditPhotoDialog implements OnInit {

  selectedImage: string | ArrayBuffer | null = null;
  albums: AlbumInterface[] = [];
  isLoadingImage: boolean = false;
  photoForEdit: PhotoPostInterface | undefined;
  mode: PhotoAction = PhotoAction.ADD;
  addEditForm!: FormGroup;


  constructor(private dialogRef: MatDialogRef<AddEditPhotoDialog>, private albumService: AlbumService, private _snackBar: MatSnackBar,
    private photoService: PhotoService, @Inject(MAT_DIALOG_DATA) public data: {
      photoToEdit: PhotoPostInterface
    }, 
    private formBuilder: FormBuilder, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
      }, error: (err) => {
        this.notificationService.raiseError("Error when loading albums");
        console.log(err);
      }
    });

    if (this.data !== null && this.data.photoToEdit !== null) {
      this.photoForEdit = this.data.photoToEdit;
      console.log(this.photoForEdit);

      this.selectedImage = this.photoForEdit.url;
      this.mode = PhotoAction.EDIT;
    }
    this.createForm();
  }

  createForm() {
    this.addEditForm = this.formBuilder.group({
      title: [this.photoForEdit?.title ?? '', Validators.required],
      albumId: [this.photoForEdit?.albumId ?? '', Validators.required],
      photo: [this.photoForEdit?.url ?? '', Validators.required]
    });
  }

  get photoTitle(): string {
    return this.addEditForm.get('title')!.value
  }

  get photoAlbumId(): number {
    return this.addEditForm.get('albumId')!.value
  }

  get photo(): string {
    return this.addEditForm.get('photo')!.value
  }

  submitForm(): void {
    this.isLoadingImage = true;

    const objectToSend = {
      albumId: this.photoAlbumId,
      title: this.photoTitle,
      url: this.photo,
      thumbnailUrl: this.photo
    };

    if (this.mode == PhotoAction.EDIT) {
      this.photoService.editPhoto(objectToSend, this.photoForEdit!.id).subscribe({
        next: (photo) => {
          this.sendObject(photo);
          this.dialogRef.close(photo);
        },
        error: (err) => {
          this.notificationService.raiseError(`The photo with id ${this.photoForEdit?.id} was not found`);
          console.log(err.message);
          this.isLoadingImage = false;
        }
      });

    } else if (this.mode == PhotoAction.ADD) {
      this.photoService.addPhoto(objectToSend).subscribe(result => {
        this.sendObject(result);
        this.dialogRef.close();
      });
    }
  }

  sendObject(objectToSend: PhotoPostInterface) {
    this.photoService.setNewPhoto(objectToSend);
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
          console.log('Image source:', imageSrc);
          this.selectedImage = imageSrc;

          //ova go dodadov posledno
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


}
