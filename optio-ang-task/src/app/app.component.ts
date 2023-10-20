import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { SharedService } from './shared/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sharedService: SharedService) { }

  onCreate() {
    this.sharedService.changeBanner(false);
  }

}