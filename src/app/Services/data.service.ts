import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoPostInterface } from '../Interfaces/photo-posts-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getUserPosts(): Observable<PhotoPostInterface[]> {
    return this.http.get<PhotoPostInterface[]>(this.url);
  }

  getRangeUserPosts(start: number, limit: number): Observable<PhotoPostInterface[]> {
    const params = new HttpParams()
      .set('_start', start)
      .set('_limit', limit);

    return this.http.get<PhotoPostInterface[]>(this.url, { params });
  }

  getPostsByTitle(title: string, start: number, limit: number): Observable<PhotoPostInterface[]> {
    const params = new HttpParams()
      .set('title_like', title)
      .set('_start', start)
      .set('_limit', limit);

    return this.http.get<PhotoPostInterface[]>(this.url, { params });
  }


  getUserPostsById(id: number): Observable<PhotoPostInterface> {

    return this.http.get<PhotoPostInterface>(`${this.url}/${id}`);
  }

  deletePost(id: number): Observable<void>{
    // console.log("deleted item with ID:", id);
    return this.http.delete<void>(`${this.url}/${id}`);
  }


  // nov kod


  // getData(startIndex: number, count: number, apiUrl: string) {
  //   const url = `${apiUrl}?startIndex=${startIndex}&count=${count}`;
  //   return this.http.get(url);
  // }

}
