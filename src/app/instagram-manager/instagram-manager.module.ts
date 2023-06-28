import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InstagramAppComponent } from './instagram-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PhotoDetailsDialog } from './dialogs/photo-details-dialog/photo-details-dialog.component';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { AddEditPhotoDialog } from './dialogs/add-edit-photo-dialog/add-edit-photo-dialog.component';
import { DeletePhotoDialog } from './dialogs/delete-photo-dialog/delete-photo-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '', component: InstagramAppComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: ':id', component: PhotoDetailsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    InstagramAppComponent,
    ToolbarComponent,
    SideNavComponent,
    MainContentComponent,
    PhotoDetailsComponent,
    PhotoDetailsDialog,
    AddEditPhotoDialog,
    DeletePhotoDialog,
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
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ScrollingModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class InstagramManagerModule { }
