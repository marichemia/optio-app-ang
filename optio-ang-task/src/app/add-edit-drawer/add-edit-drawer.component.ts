import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReferenceApiService } from '../core/services/reference-api.service';
import { BlobResponse } from '../core/interfaces/blob-response.interface';
import { keyframes } from '@angular/animations';
import { SaveBanner, editedData } from '../core/interfaces/banner-save.interface';
import { BannersApiService } from '../core/services/banners-api.service';

@Component({
  selector: 'app-add-edit-drawer',
  templateUrl: './add-edit-drawer.component.html',
  styleUrls: ['./add-edit-drawer.component.scss']
})
export class AddEditDrawerComponent implements OnInit {

  form!: FormGroup;
  fileName: string | undefined = undefined;
  labelsArr: any;
  zonesArr: any;
  channelsArr: any;
  languagesArr: any;
  counter: number = 1;
  file: string | undefined;

  constructor(private _httpClient: HttpClient,
    private fb: FormBuilder,
    private refApiService: ReferenceApiService, private bannersService: BannersApiService) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      channelId: ['', [Validators.required]],
      language: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      priority: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
      startDate: ['', Validators.required],
      endDate: '',
      active: ['true', [Validators.required]],
      labels: [''],
    });

    //get reference data

    this.refApiService.getData('1900').subscribe(res => {
      this.labelsArr = res.data.entities;
    });

    this.refApiService.getData('1700').subscribe(res => {
      this.zonesArr = res.data.entities;
    });

    this.refApiService.getData('1600').subscribe(res => {
      this.channelsArr = res.data.entities;
    });

    this.refApiService.getData('2900').subscribe(res => {
      this.languagesArr = res.data.entities;
    });
  }



  onFileSelected(e: any) {
    const img: File = e.target.files[0];

    if (img) {
      this.fileName = img.name;

      const formData = new FormData();
      formData.set('blob', img);

      return this._httpClient.post<BlobResponse>('https://development.api.optio.ai/api/v2/blob/upload', formData).subscribe(res => {
        console.log(res)
        this.file = res.data.id;
      });
    } else {

      return;

    }
  }

  onSubmit() {
    if (this.file) {
      //transform user input for POST request 

      const editedData: editedData = {
        channelId: this.form.controls['channelId'].value.id,
        zoneId: this.form.controls['zoneId'].value.id,
        fileId: this.file,
        startDate: this.form.controls['startDate'].value.toISOString(),
        language: this.form.controls['language'].value.key,
      }

      //apply changes

      const data: SaveBanner = { ...this.form.value, ...editedData };

      if (data.endDate) {
        editedData.endDate = this.form.controls['endDate'].value.toISOString();
      } else {
        delete data.endDate;
      }

      if (!data.labels) {
        delete data.labels;
      }

      //POST

      this._httpClient.post('https://development.api.optio.ai/api/v2/banners/save', data).subscribe(res => console.log(res))

      //refresh

      this.bannersService.getBanners();

    } else {
      console.log('error, no file uploaded')
    }

  }

}
