import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Banner, GetBannersRes } from '../interfaces/get-banners.interface';

@Injectable({
  providedIn: 'root'
})
export class BannersApiService {

  private bannersSubject = new BehaviorSubject<Banner[]>([]);
  private totalBanners = new BehaviorSubject<number>(0);
  private findBanner = new Subject<Banner>;

  constructor(private http: HttpClient) { }

  getBannersObservable(pageSize?: number, pageIndex?: number): Observable<Banner[]> {
    if (pageSize && pageIndex) {
      this.getBanners(pageSize, pageIndex);
    }
    return this.bannersSubject.asObservable();
  }

  getBanners(pageSize?: number, pageIndex?: number, sortByStr?: string, sortDirectionStr?: string) {

    let data = {
      includes: ["name", "channelId", "id", "active", "zoneId", "startDate", "endDate", "labels", "fileId"],
      pageIndex: pageIndex,
      pageSize: pageSize
    }


    const sortData = {
      sortBy: `${sortByStr === 'name' || sortByStr === 'url' ? `${sortByStr}.raw` : sortByStr}`,
      sortDirection: sortDirectionStr
    }

    if (sortByStr && sortDirectionStr) {
      data = { ...data, ...sortData }
    }

    this.http.post<any>('https://development.api.optio.ai/api/v2/banners/find', data).subscribe(res => {
      this.bannersSubject.next(res.data.entities);
      this.totalBanners.next(res.data.total);

    });
  }

  totalBannersObservable(): Observable<number> {
    return this.totalBanners.asObservable();
  }

  getBanner(bannerId: string) {
    this.http.post<any>('https://development.api.optio.ai/api/v2/banners/find-one', { id: bannerId }).subscribe(res => this.findBanner.next(res.data));
  }

  getBannerObservable(): Observable<Banner> {
    return this.findBanner.asObservable();
  }

  removeBanner(bannerId: string): Observable<any> {
    return this.http.post('https://development.api.optio.ai/api/v2/banners/remove', { id: bannerId });
  }


}
