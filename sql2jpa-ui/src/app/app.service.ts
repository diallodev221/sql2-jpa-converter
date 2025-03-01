import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type GenerateResponse = {
  entityCode: string;
  tableName: string;
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http: HttpClient = inject(HttpClient);

  // fetch code generated by api
  generatedJpaEntityCode(sql: string): Observable<GenerateResponse[]> {
    return this.http
      .post<GenerateResponse[]>('http://localhost:8080/api/convert', { sql })
      ;
  }
}
