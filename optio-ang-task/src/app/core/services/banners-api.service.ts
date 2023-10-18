import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Banner, GetBannersRes } from '../interfaces/get-banners.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BannersApiService {

  private bannersSubject = new BehaviorSubject<Banner[]>([]);
  private totalBanners = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getBannersObservable(pageSize?: number, pageIndex?: number): Observable<Banner[]> {
    if (pageSize && pageIndex) {
      this.getBanners(pageSize, pageIndex);
    }
    return this.bannersSubject.asObservable();
  }

  getBanners(pageSize?: number, pageIndex?: number) {

    const data = {
      includes: ["name", "channelId", "id", "active", "zoneId", "startDate", "endDate", "labels"],
      pageIndex: pageIndex,
      pageSize: pageSize
    }

    this.http.post<any>('https://development.api.optio.ai/api/v2/banners/find', data).subscribe(res => {
      this.bannersSubject.next(res.data.entities);
      this.totalBanners.next(res.data.total);

    });
  }

  totalBannersObservable(): Observable<number> {
    return this.totalBanners.asObservable();
  }
}
