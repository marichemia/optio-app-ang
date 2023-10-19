import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannersApiService } from '../core/services/banners-api.service';
import { Banner } from '../core/interfaces/get-banners.interceptor';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { GetImageService } from '../core/services/get-image.service';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss'],
})
export class BannersListComponent implements OnInit, OnDestroy {

  banners: Banner[] = [];
  columnsToDisplay = ['name', 'active', 'zoneId', 'labels', 'startDate', 'endDate'];
  bannersSubscription: Subscription | undefined;
  pageIndex = 0;
  pageSize = 20;
  totalBanners: number | undefined;
  totalSubscription: Subscription | undefined;
  imageSrc?: string;

  constructor(private bannerApiService: BannersApiService, private getImageService: GetImageService) { }

  ngOnInit() {
    this.bannerApiService.getBanners(20, 0);


    this.bannersSubscription = this.bannerApiService.getBannersObservable().subscribe(banners => {

      banners.forEach(banner => {
        console.log(banner)
        this.getImageService.getBlob(banner.fileId!, 'inline').subscribe(res => {
          const url = window.URL.createObjectURL(res);
          banner.imageUrl = url;
          console.log(banner.imageUrl)
        });
      });

      this.banners = banners;
    });

    this.totalSubscription = this.bannerApiService.totalBannersObservable().subscribe(total => {
      this.totalBanners = total

    });


  }

  loadPage() {
    this.bannerApiService.getBanners(this.pageSize, this.pageIndex);
  }

  onPageChange(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadPage();
  }

  getImage(id: string, action: string) {
    this.getImageService.getBlob(id, action).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      return url
    })
  }

  ngOnDestroy() {
    if (this.bannersSubscription) {
      this.bannersSubscription.unsubscribe;
    }

    if (this.totalSubscription) {
      this.totalSubscription.unsubscribe;
    }
  }

}
