import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoPostInterface } from '../Interfaces/photo-posts-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  private url: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getUserPosts() : Observable<PhotoPostInterface[]> {
    return this.http.get<PhotoPostInterface[]>(this.url);
  }

  getPostsByTitle(title: string) : Observable<PhotoPostInterface[]> {
    const params = new HttpParams()
      .set('title_like', title)
      .set('_limit', 10);
      
    return this.http.get<PhotoPostInterface[]>(this.url, { params });
  }

  getUserPostsById(id: number) : any {
    return this.http.get(`${this.url}/${id}`);
  }


  // nov kod

  
  // getData(startIndex: number, count: number, apiUrl: string) {
  //   const url = `${apiUrl}?startIndex=${startIndex}&count=${count}`;
  //   return this.http.get(url);
  // }
  
}
