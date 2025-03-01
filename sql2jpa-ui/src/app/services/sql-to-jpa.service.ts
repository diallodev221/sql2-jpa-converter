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
export class SqlToJpaService {
  private readonly http = inject(HttpClient);

  convertSqlToJpa(sql: string, options: any): Observable<GenerateResponse[]> {
    return this.generatedJpaEntityCode(sql);
  }

  generatedJpaEntityCode(sql: string): Observable<GenerateResponse[]> {
    return this.http.post<GenerateResponse[]>(
      'http://localhost:8080/api/convert',
      { sql }
    );
  }
}
