import { Component, Input, OnInit } from '@angular/core';
import { PhotoPostInterface } from 'src/app/Interfaces/photo-posts-interface';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FilterService } from 'src/app/Services/filter.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'photo-details',
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

    photoId: number | undefined;
    photo: PhotoPostInterface | undefined;

    constructor(private dataService: DataService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        const photoParam = this.route.snapshot.paramMap.get('id');
        console.log(photoParam);
        if (photoParam === null) {
            
        }
        else {
            this.photoId = +photoParam!;
            console.log(this.photoId);
            this.dataService.getUserPostsById(this.photoId).subscribe((photoRes) => {
                this.photo = photoRes;
                console.log(this.photo);
            });
        }
    }


}

