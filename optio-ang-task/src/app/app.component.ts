import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { SharedService } from './shared/shared.service';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  subscription!: Subscription;
  @ViewChild('drawer') drawer!: MatDrawer;
  @Output() resetFormEvent = new EventEmitter<void>();

  constructor(private sharedService: SharedService) { }

  onClick() {
    this.sharedService.changeBanner(false);
    this.resetFormEvent.emit();
    this.sharedService.setResetForm(true);
  }

  ngOnInit(): void {
    this.subscription = this.sharedService.drawerCommand.subscribe(
      res => {
        if (res === 'toggle') {
          this.drawer.toggle();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}