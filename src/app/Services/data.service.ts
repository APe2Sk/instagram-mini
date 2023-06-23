import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {}

  getUserPosts(url: string) : any {
    return this.http.get(url);
  }

  getUserPostsById(url: string, id: number) : any {
    return this.http.get(url+'/'+id);
  }


  // nov kod

  
  // getData(startIndex: number, count: number, apiUrl: string) {
  //   const url = `${apiUrl}?startIndex=${startIndex}&count=${count}`;
  //   return this.http.get(url);
  // }
  
}
