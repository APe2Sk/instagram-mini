import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSubject = new Subject<string>();

  getSearch(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  searchTitle(searchKey: string): void {
    this.searchSubject.next(searchKey);
  }

}
