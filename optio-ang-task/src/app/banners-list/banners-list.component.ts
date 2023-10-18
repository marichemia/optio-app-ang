import { Component, OnInit } from '@angular/core';
import { BannersApiService } from '../core/services/banners-api.service';
import { Banner } from '../core/interfaces/get-banners.interceptor';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss'],

})
export class BannersListComponent implements OnInit {

  banners: Banner[] = [];
  columnsToDisplay = ['name', 'active', 'zoneId', 'labels', 'startDate', 'endDate', 'img'];
  bannersSubscription: Subscription | undefined;
  pageIndex = 0;
  pageSize = 20;
  totalBanners: number | undefined;
  totalSubscription: Subscription | undefined;

  constructor(private bannerApiService: BannersApiService) { }

  ngOnInit() {
    this.bannerApiService.getBanners(20, 0);


    this.bannersSubscription = this.bannerApiService.getBannersObservable().subscribe(banners => {
      this.banners = banners;
    });

    this.totalSubscription = this.bannerApiService.totalBannersObservable().subscribe(total => {
      this.totalBanners = total

    });


  }

  loadPage() {
    console.log(this.totalBanners + 'inside loadPage')
    this.bannerApiService.getBanners(this.pageSize, this.pageIndex);
    /*
      this.bannerApiService.getBannersObservable(this.pageSize, this.pageIndex).subscribe(res => {
        this.banners = res;
      })
  
      this.bannerApiService.totalBannersObservable().subscribe(res => this.totalBanners = res);
    */
  }

  onPageChange(e: PageEvent) {
    console.log(this.totalBanners + 'insidePageCahange')
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadPage();
  }

}
