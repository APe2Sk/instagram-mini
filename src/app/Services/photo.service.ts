import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoPostInterface } from '../Interfaces/photo-posts-interface';
import { Observable, Subject } from 'rxjs';
import { PhotoAddEdit } from '../Interfaces/photo-add-edit';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  private url: string = 'https://jsonplaceholder.typicode.com/photos';
  private addSubject = new Subject<PhotoPostInterface>();

  constructor(private http: HttpClient) { }

  getUserPhotos(): Observable<PhotoPostInterface[]> {
    return this.http.get<PhotoPostInterface[]>(this.url);
  }

  getInRangeUserPhotos(start: number, limit: number): Observable<PhotoPostInterface[]> {
    const params = new HttpParams()
      .set('_start', start)
      .set('_limit', limit);

    return this.http.get<PhotoPostInterface[]>(this.url, { params });
  }

  getPhotosByTitle(title: string, start: number, limit: number): Observable<PhotoPostInterface[]> {
    const params = new HttpParams()
      .set('title_like', title)
      .set('_start', start)
      .set('_limit', limit);

    return this.http.get<PhotoPostInterface[]>(this.url, { params });
  }

  getUserPhotosById(id: number): Observable<PhotoPostInterface> {

    return this.http.get<PhotoPostInterface>(`${this.url}/${id}`);
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  addPhoto(newPhoto: PhotoAddEdit): Observable<PhotoPostInterface> {
    return this.http.post<PhotoPostInterface>(this.url, newPhoto);
  }

  editPhoto(editedPhoto: PhotoAddEdit, id: number): Observable<PhotoPostInterface> {
    return this.http.put<PhotoPostInterface>(`${this.url}/${id}`, editedPhoto);
  }

  setNewPhoto(object: PhotoPostInterface) {
    this.addSubject.next(object);
  }

  getNewPhoto() {
    return this.addSubject.asObservable();
  }
}
