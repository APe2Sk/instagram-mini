import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './Services/data.service';

import { FlexLayoutModule } from '@angular/flex-layout'; 
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterService } from './Services/filter.service';
import { PhotoDetailsComponent } from './instagram-manager/components/photo-detais/photo-details.component';


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
  ],
  providers: [DataService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
