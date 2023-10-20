import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Banner } from '../core/interfaces/get-banners.interceptor';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private bannerSource = new Subject<Banner>;
  currentBanner = this.bannerSource.asObservable();
  private isEditModeSource = new Subject<boolean>;
  isEditMode = this.isEditModeSource.asObservable();

  constructor() { }

  changeBanner(isEditMode: boolean, banner?: any) {
    this.bannerSource.next(banner);
    this.isEditModeSource.next(isEditMode);
  }

  editMode(status: boolean) {

  }
}
