import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://127.0.0.1:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }


  getBooks(theCategoryId: number): Observable<Book[]>
  {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`

    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }





}

interface GetResponseBooks{
  _embedded:{
    books: Book[];
  }
}