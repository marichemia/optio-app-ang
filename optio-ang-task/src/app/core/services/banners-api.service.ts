import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner, GetBannersRes } from '../interfaces/get-banners.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BannersApiService {

  constructor(private http: HttpClient) { }

  getBanners(pageSize: number, pageIndex: number): Observable<any> {

    const data = {
      includes: ["name", "channelId", "id", "active", "zoneId", "startDate", "endDate", "labels"],
      pageIndex: pageIndex,
      pageSize: pageSize
    }

    return this.http.post('https://development.api.optio.ai/api/v2/banners/find', data);
  }
}
