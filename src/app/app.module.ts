import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PhotoService } from './Services/photo.service';

import { FlexLayoutModule } from '@angular/flex-layout'; 
import { SearchService } from './Services/search.service';
import { NotificationService } from './Services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {path: 'photos', loadChildren: () => import('./instagram-manager/instagram-manager.module').then(m => m.InstagramManagerModule)},
  {path: '**', redirectTo: 'photos'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule
  ],
  providers: [PhotoService, SearchService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
