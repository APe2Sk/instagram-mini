import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoPostInterface } from '../Interfaces/photo-posts-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<PhotoPostInterface> {

    return this.http.get<PhotoPostInterface>(`${this.url}/${id}`);
  }
}
