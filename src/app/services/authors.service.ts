import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/v1';

  public authors(params: object): Observable<PaginatedResponse<Author[]>> {
    return this.http.get<PaginatedResponse<Author[]>>(`${this.apiUrl}/authors`, {
      params: { ...params },
    });
  }

  public author(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }

  public create(data: object): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors`, data);
  }

  public update(id: number, data: object): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/authors/${id}`, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/authors/${id}`);
  }
}
