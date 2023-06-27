import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './Services/data.service';

import { FlexLayoutModule } from '@angular/flex-layout'; 
import { FilterService } from './Services/filter.service';
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
  providers: [DataService, FilterService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
