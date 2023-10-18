import { Component, OnInit } from '@angular/core';
import { BannersApiService } from '../core/services/banners-api.service';
import { Banner } from '../core/interfaces/get-banners.interceptor';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BannersListComponent implements OnInit {

  banners: Banner[] = [];
  columnsToDisplay = ['name', 'active', 'zoneId', 'labels', 'startDate', 'endDate', 'img'];

  constructor(private bannerApiService: BannersApiService) { }

  ngOnInit() {
    this.bannerApiService.getBanners(20, 0).subscribe(res => {
      console.log(res);
      this.banners = res.data.entities;
    });
  }

}
