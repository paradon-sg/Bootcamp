import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Publisher } from '../interfaces/publisher';

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/v1';

  public publishers(params: object): Observable<PaginatedResponse<Publisher[]>> {
    return this.http.get<PaginatedResponse<Publisher[]>>(`${this.apiUrl}/publishers`, {
      params: { ...params },
    });
  }

  public publisher(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.apiUrl}/publishers/${id}`);
  }

  public create(data: object): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.apiUrl}/publishers`, data);
  }

  public update(id: number, data: object): Observable<Publisher> {
    return this.http.put<Publisher>(`${this.apiUrl}/publishers/${id}`, data);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(`${this.apiUrl}/publishers/${id}`);
  }
}
