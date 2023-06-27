import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private searchSubject = new Subject<string>();

  getSearchSubject(): Subject<string> {
    return this.searchSubject;
  }

  getSearch(): Observable<string> {
    return this.searchSubject.asObservable();
  }
  
  
  searchTitle(searchKey: string): void {
    this.searchSubject.next(searchKey);
  }

}
