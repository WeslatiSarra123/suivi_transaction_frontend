import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenericService<T, ID> {
  constructor(protected http: HttpClient, protected baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}`);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    console.log(entity)
    return this.http.post<T>(this.baseUrl, entity);
  }

  update(id: ID, entity: T): Observable<T> {
    console.log(entity)
    return this.http.patch<T>(`${this.baseUrl}/${id}`, entity);
  }

  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
