import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlbumExtendedInterface } from '../Interfaces/album-extended-interface';
import { Observable } from 'rxjs';
import { AlbumInterface } from '../Interfaces/album-interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private url: string = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) { }

  getAlbumById(id: number): Observable<AlbumExtendedInterface> {
    const params = new HttpParams()
    .set('_expand', "user");

    return this.http.get<AlbumExtendedInterface>(`${this.url}/${id}`, {params});
  }

  getAllAlbums(): Observable<AlbumInterface[]> {
    return this.http.get<AlbumInterface[]>(`${this.url}`);
  }
}
