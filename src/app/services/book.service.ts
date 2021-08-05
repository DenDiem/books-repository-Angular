import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Book } from '../shared/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private readonly bookDataUrl = 'http://fakerestapi.azurewebsites.net/api/v1/Books'

  constructor(private http: HttpClient) { }

  public getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookDataUrl);
  }

  public updateBook (book: Book): Observable<any> {
    const url = `${this.bookDataUrl}/${book.id}`;
    return this.http.put<Book>(url, book, this.httpOptions);
  }

  public addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.bookDataUrl, book, this.httpOptions);
  }
}
