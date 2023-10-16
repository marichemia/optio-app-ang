import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReferenceApiService {

  constructor(private _httpClient: HttpClient) { }

  getData(id: string): Observable<any> {

    const data = { typeId: `${id}` };

    return this._httpClient.post('https://development.api.optio.ai/api/v2/reference-data/find', data);

  }
}
