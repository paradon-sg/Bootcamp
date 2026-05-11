import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/v1';

  public categories(params: object): Observable<PaginatedResponse<Category[]>> {
    return this.http.get<PaginatedResponse<Category[]>>(`${this.apiUrl}/categories`, {
      params: { ...params },
    });
  }

  public category(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  public create(data: object): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, data);
  }

  public update(id: number, data: object): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, data);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(`${this.apiUrl}/categories/${id}`);
  }
}
