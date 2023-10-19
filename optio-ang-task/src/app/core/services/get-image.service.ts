import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor(private http: HttpClient) { }

  getBlob(id: string, action: string) {
    return this.http.get(`https://development.api.optio.ai/api/v2/blob/${id}?action=${action}`, { responseType: 'blob' })
  }
}
