import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InstagramAppComponent } from './instagram-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DialogComponent } from './components/dialog/dialog.component';


import { FlexLayoutModule } from '@angular/flex-layout'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: InstagramAppComponent,
    children: [
      {path: '', component: MainContentComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    InstagramAppComponent,
    ToolbarComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),  
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule, 
    MatButtonModule,
    MainContentComponent,
    DialogComponent,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class InstagramManagerModule { }
