import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/v1';

  public books(params: object): Observable<PaginatedResponse<Book[]>> {
    return this.http.get<PaginatedResponse<Book[]>>(`${this.apiUrl}/books`, { params: { ...params } });
  }

  public book(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  public create(data: object): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, data);
  }

  public update(id: number, data: object): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, data);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(`${this.apiUrl}/books/${id}`);
  }
}
