import { Component, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { PhotoService } from 'src/app/Services/photo.service';
import { ActivatedRoute, } from '@angular/router';

@Component({
    selector: 'photo-details',
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})

export class PhotoDetailsComponent implements OnInit {

    photoId: number | undefined;
    photo: PhotoPostInterface | undefined;

    constructor(private photoService: PhotoService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        const photoParam = this.route.snapshot.paramMap.get('id');
        console.log(photoParam);
        if (photoParam === null) {
        }
        else {
            this.photoId = +photoParam!;
            console.log(this.photoId);
            this.photoService.getUserPhotosById(this.photoId).subscribe((photoRes) => {
                this.photo = photoRes;
                console.log(this.photo);
            });
        }
    }
}