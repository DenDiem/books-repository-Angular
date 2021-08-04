import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../shared/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly bookDataUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Books'

  constructor(private http: HttpClient) { }

  public getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookDataUrl);
  }
}
