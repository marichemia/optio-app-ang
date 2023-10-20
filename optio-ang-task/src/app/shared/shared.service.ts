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
  private drawerCommandSource = new Subject<string>();
  drawerCommand = this.drawerCommandSource.asObservable();
  private resetFormSource = new Subject<boolean>;
  resetForm = this.resetFormSource.asObservable();

  constructor() { }

  changeBanner(isEditMode: boolean, banner?: any) {
    this.bannerSource.next(banner);
    this.isEditModeSource.next(isEditMode);
  }

  openDrawer() {
    this.drawerCommandSource.next('open');
  }

  closeDrawer() {
    this.drawerCommandSource.next('close');
  }

  toggleDrawer() {
    this.drawerCommandSource.next('toggle');
  }

  setResetForm(bool: boolean) {
    this.resetFormSource.next(bool);
  }
}
