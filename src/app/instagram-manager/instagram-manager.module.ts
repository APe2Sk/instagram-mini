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
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


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
    MainContentComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),  
    ReactiveFormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule, 
    MatButtonModule,
    DialogComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class InstagramManagerModule { }
