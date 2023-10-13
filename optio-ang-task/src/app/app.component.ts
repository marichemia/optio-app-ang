import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.getData().subscribe(data => {
      console.log(data)
    })



  }

  getData(): Observable<any> {

    const data = {
      typeId: "1900"
    }

    return this.http.post('https://development.api.optio.ai/api/v2/reference-data/find', data)
  }
}

/*
const url = 'https://development.api.optio.ai/api/v2/reference-data/find';
    const data = {
      key1: 'value1',
      key2: 'value2'
      // add more data as needed
    };

    return this.http.post(url, data);
*/
